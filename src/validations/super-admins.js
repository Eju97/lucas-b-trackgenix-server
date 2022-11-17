import Joi from 'joi';

const validateSuperAdminsBody = (req, res, next) => {
  const letterSpacesRegEx = /[A-Za-z]{3}([A-Za-z]+ ?)*/;
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(50).regex(letterSpacesRegEx)
      .required(),
    last_name: Joi.string().min(3).max(50).regex(letterSpacesRegEx)
      .required(),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `Error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateSuperAdminsBody;
