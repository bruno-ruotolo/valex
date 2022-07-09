import { Request, Response } from "express";

import * as cardRepository from "../repositories/cardRepository.js"
import { activateCardsService, createCardsService, infosCardsService } from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
  const { "x-api-key": x_api_key }: any = req.headers;
  const { employeeId, type }:
    {
      employeeId: number,
      type: cardRepository.TransactionTypes,
    } = req.body;

  await createCardsService(employeeId, type, x_api_key);

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

  await infosCardsService(cardId);

  res.sendStatus(200);
};