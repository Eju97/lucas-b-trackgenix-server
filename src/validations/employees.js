import Joi from 'joi';

const validateEmployeesBody = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().length(10).regex(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
  });

  const validation = employeeValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error:${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateEmployeesBody,
};
