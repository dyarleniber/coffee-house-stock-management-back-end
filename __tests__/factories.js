import { factory } from "factory-girl";
import { User, Role } from "../src/models";
import { hash } from "../src/utils/hash";

factory.define("Role", Role, {
  name: "Manager",
  description: "",
});

factory.define("User", User, {
  name: "User",
  email: "user@example.com",
  password: () => hash("123"),
  roleId: factory.assoc("Role", "id"),
});

export default factory;
