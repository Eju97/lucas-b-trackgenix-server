import Joi from 'joi';

const validateSuperAdminsBody = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(30).trim()
      .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
      .required()
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is not allowed to be empty',
        'string.base': 'Name can only contain letters',
        'string.min': 'Name must have a minimum of 3 letters',
        'string.max': 'Name can not be longer than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Name field is required',
      }),
    last_name: Joi.string().min(3).max(30).trim()
      .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
      .required()
      .messages({
        'any.required': 'Last Name is required',
        'string.empty': 'Last Name is not allowed to be empty',
        'string.base': 'Last Name can only contain letters',
        'string.min': 'Last Name must have a minimum of 3 letters',
        'string.max': 'Last Name can not be longer than 30 letters',
        'string.pattern.base': 'Last Name can only contain letters',
        'string.required': 'Last Name field is required',
      }),
    email: Joi.string().email().required().messages({
      'any.required': 'An email is required',
      'string.email': 'Insert a valid email',
      'string.empty': 'Email field is not allowed to be empty',
      'string.required': 'Email field is required',
    }),
    password: Joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()
      .messages({
        'any.required': 'Password is required',
        'string.empty': 'Password field is not allowed to be empty',
        'string.min': 'Pasword length must have a minimum of 8 characters',
        'string.pattern.base':
        'Password must have at least 1 capital letter, 1 lower case and 1 number',
        'string.required': 'Password field is required',
      }),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateSuperAdminsBody;
