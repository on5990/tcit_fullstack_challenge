import Joi from "joi";

export const createPostValidation = Joi.object({
  name: Joi.string().max(250).required(),
  description: Joi.string().max(5000).required(),
});
export const postIdValidation = Joi.object({
  id: Joi.string().uuid().required(),
});
