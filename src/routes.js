import { Router } from "express";

import AuthController from "./controllers/AuthController";
import ProductController from "./controllers/ProductController";
import CategoryController from "./controllers/CategoryController";
import UserController from "./controllers/UserController";
import RoleController from "./controllers/RoleController";

import authMiddleware from "./middlewares/auth";
import managerMiddleware from "./middlewares/manager";
import imageUploadMiddleware from "./middlewares/imageUpload";

const routes = new Router();

routes.post("/login", AuthController.login);

routes.use(authMiddleware);

routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.put("/products/:id/quantity", ProductController.updateQuantity);

routes.use(managerMiddleware);

routes.post("/products", imageUploadMiddleware, ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.put(
  "/products/:id/file",
  imageUploadMiddleware,
  ProductController.updateFile
);
routes.delete("/products/:id", ProductController.destroy);

routes.get("/categories", CategoryController.index);
routes.post("/categories", CategoryController.store);
routes.get("/categories/:id", CategoryController.show);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.destroy);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

routes.get("/roles", RoleController.index);

export default routes;
