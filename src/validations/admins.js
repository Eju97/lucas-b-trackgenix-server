import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const letterSpacesRegEx = /^[a-zA-Z\s]*$/;
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50).regex(letterSpacesRegEx)
      .required(),
    lastName: Joi.string().min(3).max(50).regex(letterSpacesRegEx)
      .required(),
    email: Joi.string().email()
      .required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateCreation;
