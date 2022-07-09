import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const { message, statusCode } = error;
  if (statusCode === 404) return res.status(404).send(message);
  if (statusCode === 401) return res.status(401).send(message);
  if (statusCode === 409) return res.status(409).send(message);

  console.log(chalk.red.bold(error))
  res.sendStatus(500);
};