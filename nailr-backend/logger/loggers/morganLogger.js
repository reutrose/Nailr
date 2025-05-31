const morgan = require("morgan");
const { currentTime } = require("../../utils/timeHelper");
const chalk = require("chalk");

const morganLogger = morgan(function (tokens, req, res) {
	const { year, month, day, hours, minutes, seconds } = currentTime();
	let message = [
		`[${day}-${month}-${year} ${hours}:${minutes}:${seconds}] |`,
		`METHOD: ${tokens.method(req, res)} |`,
		`URL: ${tokens.url(req, res)} |`,
		`STATUS: ${tokens.status(req, res)} |`,
		`RES-TIME: ${tokens["response-time"](req, res)} ms`,
	].join(" ");

	if (res.statusCode >= 400) return chalk.redBright(message);
	else return chalk.cyanBright(message);
});

module.exports = morganLogger;
