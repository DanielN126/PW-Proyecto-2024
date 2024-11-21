import { Router } from "express";
import authRoute from "./user.route.js";
import undertakingRoute from "./undertaking.route.js";

const mainRoute = Router();

mainRoute.use("/auth", authRoute);
mainRoute.use("/undertaking", undertakingRoute);

export default mainRoute;
