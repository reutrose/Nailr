const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const chalk = require("chalk");
const { loggerMiddleware } = require("./logger/loggerService");
const path = require("path");
const createInitialData = require("./utils/initialData");
const dailyLimiter = require("./middlewares/rateLimiter");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
});

app.set("io", io);

io.on("connection", (socket) => {
	console.log(chalk.green("[SOCKET] A user connected"));

	socket.on("joinConversation", (conversationId) => {
		socket.join(conversationId);
		console.log(
			chalk.blueBright(
				`[SOCKET] Joined conversation ${chalk.bold(conversationId)}`
			)
		);
	});

	socket.on("disconnect", () => {
		console.log(chalk.red("[SOCKET] A user disconnected"));
	});
});

app.use(corsMiddleware);
app.use(dailyLimiter);
app.use(express.json());
app.use(express.static("./public"));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use(loggerMiddleware());
app.use(router);

app.use((err, req, res, next) => {
	handleError(res, 500, "Internal Server error.");
});

const PORT = process.env.PORT || 8181;
server.listen(PORT, () => {
	console.log(chalk.bgGreen.black(`🚀 Server listening on port: ${PORT}`));
	connectToDB();
	createInitialData();
});
