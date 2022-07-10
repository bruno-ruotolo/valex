import { Router } from "express";

import { activateCard, blockCard, createCard, infosCard, unblockCard } from "../controllers/cardsController.js";
import apiKeyValidate from "../middlewares/apiKeyValidateMiddleware.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import { createCardSchema, activateCardSchema, infosCardSchema, blockCardSchema } from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post("/card/create", apiKeyValidate, schemaValidate(createCardSchema), createCard);
cardsRouter.post("/card/activate", schemaValidate(activateCardSchema), activateCard);
cardsRouter.post("/card/infos", schemaValidate(infosCardSchema), infosCard);
cardsRouter.post("/card/block", schemaValidate(blockCardSchema), blockCard);
cardsRouter.post("/card/unblock", schemaValidate(blockCardSchema), unblockCard);

export default cardsRouter;