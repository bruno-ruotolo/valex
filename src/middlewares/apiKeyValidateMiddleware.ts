import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

import { findByApiKey } from "../repositories/companyRepository.js"

export default async function apiKeyValidate(req: Request, res: Response, next: NextFunction) {
  const { "x-api-key": x_api_key }: IncomingHttpHeaders = req.headers;

  const apiKey = await findByApiKey(x_api_key);

  if (!apiKey) throw { statusCode: 401, message: "Invalid Company ApiKey" };

  next();
};