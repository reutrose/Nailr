const Joi = require("joi");

const businessSchema = {
	businessName: Joi.string().min(2).max(100).required(),
	profession: Joi.string().max(100),
	description: Joi.string().max(1000),
	location: Joi.string().max(100),
	logo: Joi.string().uri().allow(""),
};

const validateBusinessCreation = (data) => {
	const schema = Joi.object(businessSchema);
	return schema.validate(data);
};

const validateBusinessUpdate = (data) => {
	const schema = Joi.object(businessSchema);
	return schema.validate(data);
};

module.exports = {
	validateBusinessCreation,
	validateBusinessUpdate,
};
