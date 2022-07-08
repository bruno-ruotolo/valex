import { NextFunction, Request, Response } from "express";

const schemaValidate = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) return res.status(422).send(error.details.map(detail => detail.message))
    next();
  };
};

export default schemaValidate;