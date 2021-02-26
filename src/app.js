import "./bootstrap";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
