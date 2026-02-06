import express from "express";
import routes from "./routes"
import { errorHandler } from "./middlewares/errorHandler";
import metricsRouter from "./routes/metrics";
const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(metricsRouter);
app.use(errorHandler);

export default app;
