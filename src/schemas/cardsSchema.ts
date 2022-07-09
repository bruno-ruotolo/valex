import joi from "joi";

export const createCardSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi.string().valid("groceries", "restaurant", "transport", "education", "health").required()
});


export const activateCardSchema = joi.object({
  cardId: joi.number().required(),
  securityCode: joi.string().min(3).required(),
  password: joi.string().pattern(/\d{4,}/).required(),
});

export const infosCardSchema = joi.object({
  cardId: joi.number().required()
});

export const blockCardSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().pattern(/\d{4,}/).required(),
});
