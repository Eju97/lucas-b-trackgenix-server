import Joi from 'joi';

export const validateTaskBody = (req, res, next) => {
  const letterSpacesRegEx = /[A-Za-z]{3}([A-Za-z]+ ?)*/;
  const taskValidation = Joi.object({
    description: Joi.string().min(3).max(300).regex(letterSpacesRegEx)
      .required()
      .messages({
        'any.required': 'Description is required',
        'string.empty': 'Description is not allowed to be empty',
        'string.min': 'Description must have a minimum of 3 characters',
        'string.max': 'Description can not be longer than 300 characters',
        'string.pattern.base': 'Description can only contain letters',
        'string.required': 'Description field is required',
      }),
  });

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const validateTaskQueryParams = (req, res, next) => {
  if (Object.keys(req.query).length === 0
   || (!(req.query.description === undefined) && (Object.keys(req.query).length === 1))) {
    return next();
  }
  return res.status(400).json({
    message: 'There was an error: The query parameters are invalid',
    data: undefined,
    error: true,
  });
};
