import Joi from 'joi';

const validateTimeSheetBody = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().min(3).trim().max(300)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is not allowed to be empty',
        'string.trim': 'Description is not allowed to be empty',
        'string.min': 'Description must have at least 3 characters',
        'string.max': 'Description can not bet longer than 300 characters',
        'string.required': 'Description is required',
        'any.required': 'Description is required',
      }),
    date: Joi.date().iso().required()
      .messages({
        'date.base': 'Insert a valid date',
        'data.empty': 'Date is not allowed to be empty',
        'date.iso': 'Date must follow the pattern yyyy-mm-dd',
        'date.required': 'Date is required',
      }),
    hours: Joi.number().positive().required()
      .messages({
        'number.empty': 'Hours are not allowed to be empty',
        'number.base': 'Hours must contain only numbers',
        'number.positive': 'The minimum amount of hours must be 1 or higher.',
        'number.required': 'Hours are required',
      }),
    task: Joi.string().length(24).required()
      .messages({
        'string.required': 'Please insert a task',
      }),
    employee: Joi.string().length(24).required()
      .messages({
        'string.required': 'Please insert a employee',
      }),
    project: Joi.string().length(24).required()
      .messages({
        'string.required': 'Please insert a project',
      }),
  });

  const validation = timeSheetValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Validation error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateTimeSheetBody;
