const addZero = (num) => (num < 10 ? `0${num}` : num);

const currentTime = () => {
	const now = new Date();
	let month = now.getMonth() + 1;
	if (month === 1) month = "Jan";
	if (month === 2) month = "Feb";
	if (month === 3) month = "Mar";
	if (month === 4) month = "Apr";
	if (month === 5) month = "May";
	if (month === 6) month = "Jun";
	if (month === 7) month = "Jul";
	if (month === 8) month = "Aug";
	if (month === 9) month = "Sep";
	if (month === 10) month = "Oct";
	if (month === 11) month = "Nov";
	if (month === 12) month = "Dec";
	let result = {
		year: now.getFullYear(),
		month: month,
		day: now.getDate(),
		hours: now.getHours(),
		minutes: now.getMinutes(),
		seconds: now.getSeconds(),
	};

	for (let key in result) {
		result[key] = addZero(result[key]);
	}

	return result;
};

module.exports = { currentTime };
