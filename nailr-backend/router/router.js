const express = require("express");
const router = express.Router();

const businessesRouterController = require("../collections/businesses/routes/businessRestControllers");
const reviewsRouterController = require("../collections/reviews/routes/reviewRestControllers");
const messagesRouterController = require("../collections/messages/routes/messageRestControllers");
const conversationsRouterController = require("../collections/conversations/routes/conversationRestControllers");
const notificationsRouterController = require("../collections/notifications/routes/notificationRestControllers");
const postsRouterController = require("../collections/posts/routes/postRestControllers");
const usersRouterController = require("../collections/users/routes/userRestControllers");

const { handleError } = require("../utils/handleErrors.js");

router.use("/businesses", businessesRouterController);
router.use("/reviews", reviewsRouterController);
router.use("/messages", messagesRouterController);
router.use("/conversations", conversationsRouterController);
router.use("/notifications", notificationsRouterController);
router.use("/posts", postsRouterController);
router.use("/users", usersRouterController);

router.use((req, res) => {
	handleError(res, 404, "Path not found.");
});

module.exports = router;
