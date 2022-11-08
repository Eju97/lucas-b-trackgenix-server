import Joi from 'joi';

export const validateCreation = (req, res, next) => {
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

const checkQueryParams = (obj) => {
  const validQueryParams = ['name', 'lastName', 'email', 'password'];
  const keyList = Object.keys(obj);
  return keyList.length === 0 || keyList.every((key) => (validQueryParams.includes(key)));
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
  const letterSpacesRegEx = /^[a-zA-Z\s]*$/;
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50).regex(letterSpacesRegEx),
    lastName: Joi.string().min(3).max(50).regex(letterSpacesRegEx),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  });
  const validation = adminValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
