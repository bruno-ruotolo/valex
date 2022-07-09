import { Router } from "express";

import { activateCard, createCard, infosCard } from "../controllers/cardsController.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import { createCardSchema, activateCardSchema, infosCardSchema } from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post("/card/create", schemaValidate(createCardSchema), createCard);
cardsRouter.post("/card/activate", schemaValidate(activateCardSchema), activateCard);
cardsRouter.post("/card/infos", schemaValidate(infosCardSchema), infosCard);

export default cardsRouter;