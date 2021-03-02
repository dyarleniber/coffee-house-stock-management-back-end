import { factory } from "factory-girl";
import { User, Role, Category, Image, Product } from "../src/models";
import { hash } from "../src/utils/hash";
import { MANAGER_ROLE } from "../src/constants/role";

factory.define("Role", Role, {
  id: MANAGER_ROLE,
  name: "Manager",
  description: "",
});

factory.define("User", User, {
  name: "User",
  email: "user@example.com",
  password: () => hash("123"),
  roleId: factory.assoc("Role", "id"),
});

factory.define("Category", Category, {
  name: "Category",
  maxQuantity: 200,
});

factory.define("Image", Image, {
  imageKey: "FakeImageKey",
  imageSize: 999,
  imageType: "FakeImageType",
  imageUrl: "FakeImageUrl",
});

factory.define("Product", Product, {
  name: "Product",
  description: "",
  quantity: 9,
  price: 99,
  categoryId: factory.assoc("Category", "id"),
  imageId: factory.assoc("Image", "id"),
});

export default factory;
