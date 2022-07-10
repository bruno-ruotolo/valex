import { Request, Response } from "express";
import { makePurchaseService } from "../services/paymentService.js";

export async function makePurchase(req: Request, res: Response) {
  const { cardId, businessId, password, amount }:
    { cardId: number, businessId: number, password: string, amount: number } = req.body;

  await makePurchaseService(cardId, businessId, password, amount);

  res.sendStatus(201);
};