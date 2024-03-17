const validator = require("validator");
const { Joi, celebrate } = require("celebrate");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateNewsItem = celebrate({
  body: Joi.object().keys({
    source: Joi.string().required().messages({
      "string.empty": "The `source` field cannot be empty",
    }),
    title: Joi.string().required().messages({
      "string.empty": "The `title` field cannot be empty",
    }),
    text: Joi.string().required().messages({
      "string.empty": "The `text` field cannot be empty",
    }),
    date: Joi.date().required().messages({
      "string.empty": "The `date` field cannot be empty",
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      "string.empty": "The `link` field cannot be empty",
      "string.uri": "This field must contain a url",
    }),
    image: Joi.string().required().custom(validateUrl).messages({
      "string.empty": "The `image` field cannot be empty",
      "string.uri": "This field must contain a url",
    }),
    keyword: Joi.string().required().messages({
      "string.empty": "The `keyword` field cannot be empty",
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": "The `name` field must be filled out",
      "string.min": "The required length must be more than 2 characters",
      "string.max": "The required length must be less than 30 characters",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "This field cannot be empty",
      "string.email": "This field must contain a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The `password` field must be filled out",
    }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field cannot be empty",
      "string.email": "This field must contain a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "This field cannot be empty",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string.hex": "The `id` should be in hexadecimal form",
    }),
  }),
});

module.exports = {
  validateNewsItem,
  validateUser,
  validateSignin,
  validateId,
};
