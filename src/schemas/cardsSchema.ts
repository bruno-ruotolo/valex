import joi from "joi";

const cardsSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi.string().valid("groceries", "restaurant", "transport", "education", "health").required(),
  password: joi.string().required()
});

export default cardsSchema;