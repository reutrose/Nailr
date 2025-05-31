const Joi = require("joi");

const messageValidation = (messageData) => {
	const schema = Joi.object({
		conversationId: Joi.string().required(),
		senderId: Joi.string().required(),
		text: Joi.string().min(1).required(),
	});

	const { error } = schema.validate(messageData);
	return error ? error.details[0].message : null;
};

module.exports = {
	messageValidation,
};
