import supertest from "supertest";
import app from "../../src/app";
import truncate from "../utils/truncate";
import factory from "../factories";
import { generateToken } from "../../src/utils/jwt";
import paginationConfig from "../../src/config/pagination";

const request = supertest(app);

describe("Products", () => {
  beforeAll(async () => {
    await truncate();
  });

  it("should be able to list paginated products", async () => {
    const user = await factory.create("User");
    const product = await factory.create("Product");

    const { id, name, roleId } = user;
    const authTokenPayload = { id, name, roleId };
    const authToken = generateToken(authTokenPayload);

    const response = await request
      .get("/products")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.length).toBe(1);
    expect(response.body.products[0].name).toBe(product.name);
    expect(response.body.products[0].description).toBe(product.description);
    expect(response.body.products[0].quantity).toBe(product.quantity);
    expect(response.body.products[0].price).toBe(product.price);
    expect(response.body.total).toBe(1);
    expect(response.body.totalPages).toBe(1);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(paginationConfig.defaultLimit);
  });
});
