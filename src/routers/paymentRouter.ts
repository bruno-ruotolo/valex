import { Router } from "express";

import { makePurchase } from "../controllers/paymentController.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import { makePurchaseSchema } from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post("/payment", schemaValidate(makePurchaseSchema), makePurchase);

export default paymentRouter;