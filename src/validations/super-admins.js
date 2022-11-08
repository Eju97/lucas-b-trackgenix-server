import Joi from 'joi';

const validateSuperAdminsBody = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  });
  const validation = superAdminValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateSuperAdminsBody;
