const normalizeUser = async (userInput) => {
	const {
		email,
		password,
		firstName,
		lastName,
		bio = "",
		avatar = "",
		location = "",
		dateOfBirth = "",
		gender = "",
	} = userInput;

	return {
		email: email?.trim().toLowerCase(),
		password: password?.trim(),
		firstName: firstName?.trim(),
		lastName: lastName?.trim(),
		bio: bio?.trim(),
		avatar: "/static/profileAvatar.png",
		location: location?.trim(),
		dateOfBirth: dateOfBirth?.trim(),
		gender: gender?.trim(),
	};
};

module.exports = normalizeUser;
