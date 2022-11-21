import Joi from 'joi';

export const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .trim()
      .max(30)
      .regex(/^([^0-9]*)$/i)
      .required()
      .messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.empty': 'Name is not allowed to be empty',
        'string.min': 'Name must have a minimum of 3 letters',
        'string.max': 'Name can contain more than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Name field is required',
      }),
    lastName: Joi.string().min(3).max(30).regex(/^([^0-9]*)$/i)
      .required()
      .messages({
        'any.required': 'Last Name is required',
        'string.empty': 'Last Name is not allowed to be empty',
        'string.base': 'Last Name must be a string',
        'string.min': 'Last Name must have a minimum of 3 letters',
        'string.max': 'Last Name can contain more than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Last Name field is required',
      }),
    email: Joi.string().email().required().messages({
      'any.required': 'an email is required',
      'string.email': 'Insert a valid email',
      'string.empty': 'Email is not allowed to be empty',
      'string.required': 'email field is required',
    }),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required().messages({
        'any.required': 'a password is required',
        'string.empty': 'Password field is not allowed to be empty',
        'string.pattern.base': 'Password must contain at least 8 characters, "one" capital letter, "one" lower case and "one" number at least',
        'string.required': 'Password field is required',
      }),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const checkQueryParams = (obj) => {
  const validQueryParams = ['name', 'lastName', 'email', 'password'];
  const keyList = Object.keys(obj);
  return (
    keyList.length === 0
    || keyList.every((key) => validQueryParams.includes(key))
  );
};

export const validateQueryParams = (req, res, next) => {
  const queryObject = req.query;
  if (checkQueryParams(queryObject)) {
    return next();
  }
  return res.status(400).json({
    message: 'Bad request',
    data: undefined,
    error: true,
  });
};

export const validateEdit = (req, res, next) => {
  const letterSpacesRegEx = /[A-Za-z]{3}([A-Za-z]+ ?)*/;
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(30).regex(letterSpacesRegEx)
      .messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.empty': 'Name is not allowed to be empty',
        'string.min': 'Name must have a minimum of 3 letters',
        'string.max': 'Name can contain more than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Name field is required',
      }),
    lastName: Joi.string().min(3).max(30).regex(letterSpacesRegEx)
      .messages({
        'any.required': 'Last Name is required',
        'string.empty': 'Last Name is not allowed to be empty',
        'string.base': 'Last Name must be a string',
        'string.min': 'Last Name must have a minimum of 3 letters',
        'string.max': 'Last Name can contain more than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Last Name field is required',
      }),
    email: Joi.string().email().messages({
      'any.required': 'an email is required',
      'string.email': 'Insert a valid email',
      'string.empty': 'Email is not allowed to be empty',
      'string.required': 'email field is required',
    }),
    password: Joi.string().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    ).messages({
      'any.required': 'a password is required',
      'string.empty': 'Password field is not allowed to be empty',
      'string.pattern.base': 'Password must contain at least 8 characters, "one" capital letter, "one" lower case and "one" number at least',
      'string.required': 'email field is required',
    }),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
