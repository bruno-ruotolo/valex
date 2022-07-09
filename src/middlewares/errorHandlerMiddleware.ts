import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const { message } = error;
  if (message === "Employee Not Found") return res.status(404).send(message);
  if (message === "Invalid Company ApiKey") return res.status(401).send(message);
  if (message === "Employee Already Has This Type of Card") return res.status(409).send(message);
  if (message === "Expired Card") return res.status(401).send(message);
  if (message === "Wrong Security Code") return res.status(401).send(message);
  if (message === "Card Already Actived") return res.status(401).send(message);

  if (message === "Card Not Found") return res.status(404).send(message);

  console.log(chalk.red.bold(error))
  res.sendStatus(500);
};