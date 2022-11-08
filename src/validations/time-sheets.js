import Joi from 'joi';

const validateTimeSheetBody = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().min(3).max(300).required(),
    date: Joi.date().iso().required(),
    hours: Joi.number().positive().required(),
    task: Joi.string().length(24).required(),
    employee: Joi.string().length(24).required(),
    project: Joi.string().length(24).required(),
  });

  const validation = timeSheetValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateTimeSheetBody;
