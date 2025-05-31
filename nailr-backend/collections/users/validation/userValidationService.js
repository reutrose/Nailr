const Joi = require("joi");

const registerValidation = (userInput) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		password: Joi.string().min(6).required(),
		firstName: Joi.string().min(2).max(50).required(),
		lastName: Joi.string().min(2).max(50).required(),
		bio: Joi.string().optional().allow("", null),
		avatar: Joi.string().uri().optional().allow("", null),
		location: Joi.string().optional().allow("", null),
		dateOfBirth: Joi.string().optional().allow("", null),
		gender: Joi.string()
			.valid("male", "female", "other")
			.optional()
			.allow("", null),
	});

	const { error } = schema.validate(userInput);
	return error ? error.details[0].message : null;
};

module.exports = {
	registerValidation,
};

const loginValidation = (userInput) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		password: Joi.string().min(6).required(),
	});

	const { error } = schema.validate(userInput);
	return error ? error.details[0].message : null;
};

module.exports = {
	registerValidation,
	loginValidation,
};
