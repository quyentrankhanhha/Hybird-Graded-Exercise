const Joi = require("@hapi/joi");

// register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(25)
      .required(),
    // must have two domain parts and TLD must be .com or .net
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(3)
      .min(6)
      .max(25)
      .required()
  });
  return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
  const schema = {
    username: Joi.string().min(6).required,
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports = { registerValidation, loginValidation };
