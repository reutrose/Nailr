const chalk = require("chalk");
const logErrors = require("../logs/logsService");

const createError = (validator, error) => {
	error.message = `${validator} Error: ${error.message}`;
	error.status = error.status || 400;
	throw new Error(error);
};

const handleError = (res, status, message = "") => {
	console.log(chalk.bgYellowBright.red(message));
	logErrors(status, message);
	return res.status(status).send(message);
};

module.exports = { createError, handleError };
