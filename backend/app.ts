import express, { Express } from "express";
import postRoutes from "./routes/postRoutes";
import cors from "cors";
const app: Express = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(postRoutes);

export default app;
