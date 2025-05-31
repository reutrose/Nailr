const fs = require("fs");
const path = require("path");
const { currentTime } = require("../utils/timeHelper");

const logDirectory = path.join(__dirname, "logFiles");

if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}

const logErrors = (status, message) => {
	const { year, month, day, hours, minutes, seconds } = currentTime();
	const today = `${day}-${month}-${year}`;
	const logFilePath = path.join(logDirectory, `${today}.log`);
	const time = `${hours}:${minutes}:${seconds}`;
	if (status >= 400) {
		const logMessage = `[${today} ${time}] | STATUS: ${status} | ERROR: ${message}\n`;
		fs.appendFile(logFilePath, logMessage, (err) => {
			if (err) {
				console.error("Failed to write to log file:", err);
			}
		});
	}
};

module.exports = logErrors;
