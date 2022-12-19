import Joi from 'joi';

export const validateProjectBody = (req, res, next) => {
  const projectSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9 ]*$/)
      .required()
      .messages({
        'any.required': 'Project Name is required',
        'string.empty': 'Project Name is not allowed to be empty',
        'string.min': 'Project Name must have a minimum of 3 characters',
        'string.max': 'Project Name can not be longer than 20 characters',
        'string.pattern.base': 'Project Name can only contain letters',
        'string.required': 'Project Name field is required',
      }),
    clientName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9 ]*$/)
      .required()
      .messages({
        'any.required': 'Client Name is required',
        'string.empty': 'Client Name is not allowed to be empty',
        'string.min': 'Client Name must have a minimum of 3 characters',
        'string.max': 'Client Name can not be longer than 20 characters',
        'string.pattern.base': 'Client Name can only contain letters',
        'string.required': 'Client Name field is required',
      }),
    description: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'any.required': 'Description is required',
        'string.empty': 'Description is not allowed to be empty',
        'string.min': 'Description must have a minimum of 3 characters',
        'string.max': 'Description can not be longer than 100 characters',
        'string.pattern.base': 'Description can only contain letters',
        'string.required': 'Description field is required',
      }),
    startDate: Joi.date()
      .iso()
      .required()
      .messages({
        'data.empty': 'Start Date is not allowed to be empty',
        'date.format': 'Start Date must follow the pattern DD-MM-AAAA',
        'date.required': 'Start Date is required',
      }),
    endDate: Joi.date()
      .iso()
      .required()
      .messages({
        'data.empty': 'End Date is not allowed to be empty',
        'date.format': 'End Date must follow the pattern DD-MM-AAAA',
        'date.required': 'End Date is required',
      }),
    employees: Joi.array().required(Joi.object({
      employee: Joi.string().hex().length(24).required(),
      rate: Joi.number().required(),
      role: Joi.string().valid('DEV', 'TL', 'PM', 'QA').required(),
    })),
  });

  const validation = projectSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const validateEmployeeBody = (req, res, next) => {
  const employeeSchema = Joi.object({
    employee: Joi.string().hex().length(24).required(),
    rate: Joi.number().required(),
    role: Joi.string().valid('DEV', 'TL', 'PM', 'QA').required(),
  });
  const validation = employeeSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
