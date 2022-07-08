import { Router } from "express";

import { createCard } from "../controllers/cardsController.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import cardsSchema from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post("/card/create", schemaValidate(cardsSchema), createCard);

export default cardsRouter;