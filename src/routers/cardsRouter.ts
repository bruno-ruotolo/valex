import { Router } from "express";

import { activateCard, blockCard, createCard, infosCard } from "../controllers/cardsController.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import { createCardSchema, activateCardSchema, infosCardSchema, blockCardSchema } from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post("/card/create", schemaValidate(createCardSchema), createCard);
cardsRouter.post("/card/activate", schemaValidate(activateCardSchema), activateCard);
cardsRouter.post("/card/infos", schemaValidate(infosCardSchema), infosCard);
cardsRouter.post("/card/block", schemaValidate(blockCardSchema), blockCard);

export default cardsRouter;