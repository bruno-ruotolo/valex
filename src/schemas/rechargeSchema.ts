import joi from "joi";

export const rechargeCardSchema = joi.object({
  cardId: joi.number().required(),
  amount: joi.number().greater(0).required()
});