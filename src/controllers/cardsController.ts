import { Request, Response } from "express";

import * as cardRepository from "../repositories/cardRepository.js"
import { cardsService } from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
  const { "x-api-key": x_api_key }: any = req.headers;
  const { employeeId, type, password }:
    {
      employeeId: number,
      password: string,
      type: cardRepository.TransactionTypes,
    } = req.body;

  await cardsService(employeeId, type, password, x_api_key);

  res.sendStatus(201);
};