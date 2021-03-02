import supertest from "supertest";
import app from "../../src/app";
import truncate from "../utils/truncate";
import factory from "../factories";
import { generateToken } from "../../src/utils/jwt";

const request = supertest(app);

describe("Categories", () => {
  beforeAll(async () => {
    await truncate();
  });

  it("should be able to list all categories", async () => {
    const user = await factory.create("User");
    const category = await factory.create("Category");

    const { id, name, roleId } = user;
    const authTokenPayload = { id, name, roleId };
    const authToken = generateToken(authTokenPayload);

    const response = await request
      .get("/categories")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(category.name);
    expect(response.body[0].maxQuantity).toBe(category.maxQuantity);
  });
});
