import Joi from "joi";

export const addKey = Joi.object({
  original: Joi.string().required().trim().error(Error("Campo original es requerido y en texto")),
  translated: Joi.string().required().trim().error(Error("Campo translated es requerido y en texto")),
}).required();
