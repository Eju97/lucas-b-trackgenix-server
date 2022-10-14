import Joi from 'joi';

export const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object({
    description: Joi.string().min(3).max(300),
  });

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validateCreation,
};
