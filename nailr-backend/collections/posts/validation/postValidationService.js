const Joi = require("joi");

const postValidation = (postInput) => {
	const schema = Joi.object({
		authorId: Joi.string().required(),
		title: Joi.string().min(3).required(),
		description: Joi.string().min(10).required(),
		images: Joi.array().items(Joi.string().uri()),
		tags: Joi.array().items(Joi.string()),
		location: Joi.string().allow("", null),
		postType: Joi.string().valid("showcase", "request").required(),
	});

	const { error } = schema.validate(postInput);
	return error ? error.details[0].message : null;
};

module.exports = {
	postValidation,
};
