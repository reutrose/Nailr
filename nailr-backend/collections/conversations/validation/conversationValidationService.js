const Joi = require("joi");

const conversationValidation = (conversationData) => {
	const schema = Joi.object({
		participants: Joi.array().items(Joi.string().required()).min(2).required(),
		lastMessage: Joi.string().allow("", null),
	});

	const { error } = schema.validate(conversationData);
	return error ? error.details[0].message : null;
};

module.exports = {
	conversationValidation,
};
