import { Request, Response } from "express";
import { rechargeCardService } from "../services/rechargeService.js";

export async function rechargeCard(req: Request, res: Response) {
  const { cardId, amount }: { cardId: number, amount: number } = req.body;

  await rechargeCardService(cardId, amount);

  res.sendStatus(201);
}