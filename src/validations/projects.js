import Joi from 'joi';

export const validateProjectBody = (req, res, next) => {
  const projectSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z0-9 ]*$/)
      .required(),
    clientName: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z0-9 ]*$/)
      .required(),
    description: Joi.string()
      .min(3)
      .max(300)
      .required(),
    startDate: Joi.date()
      .iso()
      .required(),
    endDate: Joi.date()
      .iso()
      .required(),
    employees: Joi.array().items.required(Joi.object({
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
