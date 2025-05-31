const Joi = require("joi");

const notificationValidation = (notificationData) => {
	const schema = Joi.object({
		recipientId: Joi.string().required(),
		type: Joi.string().valid("message", "comment", "like", "review").required(),
		data: Joi.object().required(),
		isRead: Joi.boolean(),
	});

	const { error } = schema.validate(notificationData);
	return error ? error.details[0].message : null;
};

module.exports = {
	notificationValidation,
};
