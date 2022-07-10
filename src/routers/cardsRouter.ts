import { Router } from "express";

import { activateCard, lockCard, createCard, infosCard, unlockCard } from "../controllers/cardsController.js";
import schemaValidate from "../middlewares/schemaValidateMiddleware.js";
import { createCardSchema, activateCardSchema, infosCardSchema, lockCardSchema } from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post("/card/create", schemaValidate(createCardSchema), createCard);
cardsRouter.post("/card/activate", schemaValidate(activateCardSchema), activateCard);
cardsRouter.post("/card/infos", schemaValidate(infosCardSchema), infosCard);
cardsRouter.post("/card/block", schemaValidate(lockCardSchema), lockCard);
cardsRouter.post("/card/unblock", schemaValidate(lockCardSchema), unlockCard);

export default cardsRouter;