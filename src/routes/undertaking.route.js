import {
  createUndertakingController,
  getUndertakingsController,
} from "../controllers/undertaking.controller.js";
import { Router } from "express";

const undertakingRoute = Router();

undertakingRoute.post("/", createUndertakingController);
undertakingRoute.get("/", getUndertakingsController);

export default undertakingRoute;
