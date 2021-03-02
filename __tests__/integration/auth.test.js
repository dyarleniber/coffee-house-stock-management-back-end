import supertest from "supertest";
import app from "../../src/app";
import truncate from "../utils/truncate";
import factory from "../factories";

const request = supertest(app);

describe("Authentication", () => {
  beforeAll(async () => {
    await truncate();
    await factory.create("User");
  });

  it("should be able to login with valid credentials", async () => {
    const response = await request.post("/login").send({
      email: "user@example.com",
      password: "123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
  });

  it("should not be able to login with invalid credentials", async () => {
    const response = await request.post("/login").send({
      email: "wrong_user@example.com",
      password: "wrong_password",
    });

    expect(response.status).toBe(401);
  });
});
