import Joi from 'joi';

const validateSuperAdmins = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(200).json({
      message: `there was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateSuperAdmins;
