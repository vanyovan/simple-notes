import Joi from "@hapi/joi";

//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export { registerValidation, loginValidation };
