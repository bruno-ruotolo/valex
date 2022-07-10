import { Router } from "express";

import { rechargeCard } from "../controllers/rechargeController.js";
import apiKeyValidate from "../middlewares/apiKeyValidateMiddleware.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import { rechargeCardSchema } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge", apiKeyValidate, schemaValidate(rechargeCardSchema), rechargeCard);

export default rechargeRouter;