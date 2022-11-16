import Joi from 'joi';

const validateTimeSheetBody = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().min(3).trim().max(300)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description field is required',
        'string.trim': 'Description is not allowed to be empty',
        'string.min': 'Description must have at least 3 characters',
        'string.max': 'Description can not bet longer than 300 characters',
        'string.required': 'Description is required',
        'any.required': 'Description is required',
      }),
    date: Joi.date().iso().less('now').required()
      .messages({
        'any.required': 'Date is required',
        'date.base': 'Insert a valid date',
        'data.empty': 'Date is not allowed to be empty',
        'date.format': 'Date must follow the pattern DD-MM-AAAA',
        'date.less': 'Date can not be greater than today',
        'date.required': 'Date is required',
      }),
    hours: Joi.number().min(1).max(12).positive()
      .required()
      .messages({
        'any.required': 'Hours are required',
        'number.empty': 'Hours are not allowed to be empty',
        'number.base': 'Hours must contain only numbers',
        'number.min': 'The minimum amount of hours must be 1 or higher',
        'number.max': 'The maximum amout of hours that can be registered are 12',
        'number.positive': 'The minimum amount of hours must be 1 or higher.',
        'number.required': 'Hours are required',
      }),
    task: Joi.string().length(24).required().messages({
      'any.required': 'Tasks are required',
      'string.required': 'Please insert a task',
    }),
    employee: Joi.string().length(24).required().messages({
      'any.required': 'Employee is required',
      'string.required': 'Please insert a employee',
    }),
    project: Joi.string().length(24).required().messages({
      'any.required': 'Project is required',
      'string.required': 'Please insert a project',
    }),
  });

  const validation = timeSheetValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateTimeSheetBody;
