import Joi from 'joi';

const validateProjectBody = (req, res, next) => {
  const projectSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    clientName: Joi.string()
      .min(3)
      .max(50)
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
    employees: Joi.array().items(Joi.object({
      rate: Joi.number().required(),
      role: Joi.string().valid('DEV', 'TL', 'PM', 'QA').required(),
    })),
  });

  const validation = projectSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateProjectBody;
