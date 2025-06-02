require("dotenv").config();
const chalk = require("chalk");
const User = require("../collections/users/models/mongodb/User");
const Business = require("../collections/businesses/models/mongodb/Business");
const Post = require("../collections/posts/models/mongodb/Post");
const Review = require("../collections/reviews/models/mongodb/Review");
const Conversation = require("../collections/conversations/models/mongodb/Conversation");
const { generatePassword } = require("../collections/users/helpers/bcrypt");

const PASSWORD = process.env.PASSWORD;

const userIds = [
	"075023f083bf51ea2d5bdccd",
	"5176fb1af68437032d20d904",
	"54db8a712f8e2f76a406c59f",
	"55e5f87a84029968b032b121",
	"75697b1cf7c02330273a5561",
	"a3faacb986cbd71492ff7f0c",
	"bd7c68dabfe6772da606fade",
	"c9ebb8e89e80a4bcf152732b",
	"f83f5470ab63c3e445bba1ab",
	"fdc04e8e9b416be6669096ab",
];

const usersData = [
	{
		_id: userIds[0],
		email: "bob@builder.com",
		firstName: "Bob",
		lastName: "The Builder",
		bio: "Can we fix it? Yes we can!",
		avatar: "/uploads/avatars/bob-the-builder.jpg",
		location: "Sunflower Valley",
		dateOfBirth: "1985-01-01",
		gender: "Male",
	},
	{
		_id: userIds[1],
		email: "fred@flintstone.com",
		firstName: "Fred",
		lastName: "Flintstone",
		bio: "Yabba Dabba Doo your renovation!",
		avatar: "/uploads/avatars/fred-flintstone.jpeg",
		location: "Bedrock",
		dateOfBirth: "1960-02-20",
		gender: "Male",
	},
	{
		_id: userIds[2],
		email: "rosie@riveter.com",
		firstName: "Rosie",
		lastName: "Riveter",
		bio: "We can do it!",
		avatar: "/uploads/avatars/rosie-riveter.jpg",
		location: "Michigan",
		dateOfBirth: "1942-06-07",
		gender: "Female",
	},
	{
		_id: userIds[3],
		email: "mario@plumber.com",
		firstName: "Mario",
		lastName: "Mario",
		bio: "Here we go!",
		avatar: "/uploads/avatars/mario-plumber.jpg",
		location: "Mushroom Kingdom",
		dateOfBirth: "1981-07-09",
		gender: "Male",
	},
	{
		_id: userIds[4],
		email: "ralph@wreckit.com",
		firstName: "Ralph",
		lastName: "Wreck-It",
		bio: "I'm gonna wreck it!",
		avatar: "/uploads/avatars/ralph-wreck-it.jpeg",
		location: "Arcade World",
		dateOfBirth: "1982-11-01",
		gender: "Male",
	},
	{
		_id: userIds[5],
		email: "lara@croft.com",
		firstName: "Lara",
		lastName: "Croft",
		bio: "Tomb raider and occasional contractor",
		avatar: "/uploads/avatars/lara-croft.jpeg",
		location: "London",
		dateOfBirth: "1996-10-25",
		gender: "Female",
	},
	{
		_id: userIds[6],
		email: "bob@burger.com",
		firstName: "Bob",
		lastName: "Belcher",
		bio: "I grill, I fix, I dad.",
		avatar: "/uploads/avatars/bob-burger.jpeg",
		location: "Ocean Avenue",
		dateOfBirth: "1972-03-14",
		gender: "Male",
	},
	{
		_id: userIds[7],
		email: "jay@pritchett.com",
		firstName: "Jay",
		lastName: "Pritchett",
		bio: "Closets? You'll love it!",
		avatar: "/uploads/avatars/jay-pritchett.jpg",
		location: "Los Angeles",
		dateOfBirth: "1946-05-23",
		gender: "Male",
	},
	{
		_id: userIds[8],
		email: "mr@treeger.com",
		firstName: "Mr",
		lastName: "Treeger",
		bio: "I'm the lord of the land.",
		avatar: "/uploads/avatars/mr-treeger.jpg",
		location: "Ohio",
		dateOfBirth: "1955-09-10",
		gender: "Male",
	},
	{
		_id: userIds[9],
		email: "gypsy@auto-mechanic.com",
		firstName: "Gypsy",
		lastName: "Mechanic",
		bio: "Diesel runs in my veins.",
		avatar: "/uploads/avatars/gypsy.jpg",
		location: "Stars Hollow",
		dateOfBirth: "1968-12-12",
		gender: "Female",
	},
];

const businessData = [
	{
		owner: userIds[0],
		businessName: "Builder Bros",
		profession: "General Contractor",
		description:
			"Custom builds, repairs, and cheerful teamwork in Sunflower Valley.",
		location: "Sunflower Valley",
		logo: "/uploads/avatars/bob-the-builder.jpg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[1],
		businessName: "Flintstone Renovations",
		profession: "Mason / Bricklayer",
		description:
			"Prehistoric charm with a modern twist. Yabba Dabba Doo your home!",
		location: "Bedrock",
		logo: "/uploads/avatars/fred-flintstone.jpeg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[2],
		businessName: "Riveter Repairs",
		profession: "Welder",
		description: "Empowering fixes with strength and style. We can do it!",
		location: "Michigan",
		logo: "/uploads/avatars/rosie-riveter.jpg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[3],
		businessName: "Mario Plumbing",
		profession: "Plumber",
		description: "Pipe dreams handled with heroic flair. Let’s-a go!",
		location: "Mushroom Kingdom",
		logo: "/uploads/avatars/mario-plumber.jpg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[4],
		businessName: "Wreck-It Renovations",
		profession: "Demolition & Remodeling",
		description: "Break it down to build it better. I’m gonna wreck it!",
		location: "Arcade World",
		logo: "/uploads/avatars/ralph-wreck-it.jpeg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[5],
		businessName: "Croft Contracting",
		profession: "General Contractor",
		description: "Precision builds for daring expeditions. Tombs optional.",
		location: "London",
		logo: "/uploads/avatars/lara-croft.jpeg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[6],
		businessName: "Belcher Repairs",
		profession: "Handyman",
		description: "From grills to drills, Bob's got you covered.",
		location: "Ocean Avenue",
		logo: "/uploads/avatars/bob-burger.jpeg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[7],
		businessName: "Pritchett Closets",
		profession: "Interior Designer",
		description: "Elegant closet systems that fit your life. Trust Jay.",
		location: "Los Angeles",
		logo: "/uploads/avatars/jay-pritchett.jpg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[8],
		businessName: "Treeger Management",
		profession: "House Cleaner",
		description: "Reliable property maintenance with attitude.",
		location: "Ohio",
		logo: "/uploads/avatars/mr-treeger.jpg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
	{
		owner: userIds[9],
		businessName: "Gypsy’s Garage",
		profession: "Appliance Repair Technician",
		description: "Full-service car care with a spark of Stars Hollow charm.",
		location: "Stars Hollow",
		logo: "/uploads/avatars/gypsy.jpg",
		posts: [],
		reviews: [],
		averageRating: 0,
	},
];

usersData.forEach((user) => (user.password = generatePassword(PASSWORD)));

const checkIfUsersCreated = async () => (await User.countDocuments()) > 0;
const checkIfBusinessesCreated = async () =>
	(await Business.countDocuments()) > 0;
const checkIfPostsCreated = async () => (await Post.countDocuments()) > 0;
const checkIfReviewsCreated = async () => (await Review.countDocuments()) > 0;

const createUsers = async () => {
	await User.insertMany(usersData);
	console.log(chalk.bgBlue.white("Users created"));
};

const createBusinesses = async () => {
	await Business.insertMany(businessData);
	console.log(chalk.bgBlue.white("Businesses created"));
};

const createPosts = async () => {
	const businesses = await Business.find({});
	const showcasePosts = businesses.flatMap((biz) => [
		{
			title: `Project A by ${biz.businessName}`,
			description: `A beautiful showcase from ${biz.profession}.`,
			images: ["/uploads/posts/projects.jpg"],
			tags: ["showcase", biz.profession.toLowerCase()],
			location: biz.location,
			postType: "showcase",
			businessId: biz._id,
		},
		{
			title: `Project B by ${biz.businessName}`,
			description: `Another quality build from ${biz.businessName}.`,
			images: ["/uploads/posts/projects.jpg"],
			tags: ["build", "quality"],
			location: biz.location,
			postType: "showcase",
			businessId: biz._id,
		},
	]);

	const requestPosts = usersData.map((user) => ({
		title: `${user.firstName}'s Repair Request`,
		description: `Need help with a home fix in ${user.location}.`,
		images: ["/uploads/posts/projects.jpg"],
		tags: ["repair", "help"],
		location: user.location,
		postType: "request",
		userId: user._id,
	}));

	await Post.insertMany([...showcasePosts, ...requestPosts]);
	console.log(chalk.bgBlue.white("Posts created"));
};

const createReviews = async () => {
	const businesses = await Business.find({});
	const shuffledUsers = [...usersData];
	const reviews = [];

	const reviewComments = [
		"Outstanding craftsmanship and attention to detail!",
		"Highly recommend this professional. Reliable and skilled.",
		"The best service I've ever received!",
		"Fast, friendly, and efficient!",
		"Amazing quality and timely delivery.",
		"Truly exceeded my expectations!",
		"Would definitely hire again. 5 stars!",
		"Incredible work ethic and results.",
	];

	for (const business of businesses) {
		const reviewers = shuffledUsers.filter(
			(u) => u._id.toString() !== business.owner.toString()
		);
		if (reviewers.length < 3) continue;

		const selectedReviewers = reviewers
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);

		for (const reviewer of selectedReviewers) {
			const comment =
				reviewComments[Math.floor(Math.random() * reviewComments.length)];

			const review = await Review.create({
				user: {
					name: `${reviewer.firstName} ${reviewer.lastName}`,
					id: reviewer._id,
				},
				business: business._id,
				comment,
				rating: 5,
			});

			business.reviews.push(review._id);
			await business.populate("reviews");
			const total = business.reviews.reduce((sum, r) => sum + r.rating, 0);
			const rawAverage = total / business.reviews.length;
			business.averageRating = Math.round(rawAverage * 2) / 2;
			await business.save();

			reviews.push(review);
		}
	}

	console.log(chalk.bgBlue.white("Reviews created"));
};

const createInitialData = async () => {
	try {
		if (!(await checkIfUsersCreated())) await createUsers();
		if (!(await checkIfBusinessesCreated())) await createBusinesses();
		if (!(await checkIfPostsCreated())) await createPosts();
		if (!(await checkIfReviewsCreated())) await createReviews();
	} catch (err) {
		console.error("Error creating initial data:", err);
	}
};

module.exports = createInitialData;
