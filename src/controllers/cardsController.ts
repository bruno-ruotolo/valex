import { Request, Response } from "express";

import * as cardRepository from "../repositories/cardRepository.js"
import {
  activateCardsService, lockCardsService,
  createCardsService, infosCardsService
} from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
  const { employeeId, type }:
    {
      employeeId: number,
      type: cardRepository.TransactionTypes,
    } = req.body;

  await createCardsService(employeeId, type);

  res.sendStatus(201);
};

export async function activateCard(req: Request, res: Response) {
  const { cardId, password, securityCode }:
    {
      cardId: number,
      password: string,
      securityCode: string
    } = req.body;

  await activateCardsService(cardId, password, securityCode)
  res.sendStatus(200);
};

export async function infosCard(req: Request, res: Response) {
  const { cardId }: { cardId: number } = req.body;

  const infoData = await infosCardsService(cardId);

  res.status(200).send(infoData);
};

export async function lockCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number, password: string } = req.body;

  await lockCardsService(cardId, password, true);
  res.sendStatus(200);
};

export async function unlockCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number, password: string } = req.body;

  await lockCardsService(cardId, password, false);
  res.sendStatus(200);
};

