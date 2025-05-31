const Joi = require("joi");

const commentValidation = (commentInput) => {
	const schema = Joi.object({
		postId: Joi.string().required(),
		authorId: Joi.string().required(),
		content: Joi.string().min(1).required(),
	});

	const { error } = schema.validate(commentInput);
	return error ? error.details[0].message : null;
};

module.exports = {
	commentValidation,
};
