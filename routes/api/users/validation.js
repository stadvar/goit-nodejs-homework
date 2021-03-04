const Joi = require("joi");

const schemaUpdateUser = Joi.object({
  subscription: Joi.string().valid("free", "pro", "premium"),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.updateUser = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};
