import { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import {
	fetchMessagesByConversation,
	sendMessage,
} from "../../services/messageService";
import MessageBubble from "./MessageBubble";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const MessageSchema = Yup.object().shape({
	text: Yup.string().required("Type a message"),
});

function ConversationView({ conversation, socket }) {
	const [messages, setMessages] = useState([]);
	const messagesEndRef = useRef(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const data = await fetchMessagesByConversation(
					conversation._id,
					user.token
				);
				setMessages(data);
			} catch (err) {
				console.error("Failed to load messages", err);
			}
		};
		if (conversation?._id) fetchMessages();
	}, [conversation, user.token]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		if (!socket || !conversation?._id) return;

		const handleNewMessage = (newMessage) => {
			if (newMessage.conversationId === conversation._id) {
				setMessages((prev) => [...prev, newMessage]);
			}
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.off("newMessage", handleNewMessage);
		};
	}, [socket, conversation]);

	const handleSend = async (values, { resetForm }) => {
		try {
			await sendMessage(conversation._id, values.text, null, user.token);
			resetForm();
		} catch (err) {
			console.error("Send message failed", err);
		}
	};

	return (
		<div className="d-flex flex-column w-100 h-100 p-3">
			<div className="flex-grow-1 overflow-auto mb-3 px-2">
				{messages.map((msg) => (
					<MessageBubble
						key={msg._id}
						message={msg}
						isOwn={msg.senderId === user._id}
					/>
				))}
				<div ref={messagesEndRef} />
			</div>

			<Formik
				initialValues={{ text: "" }}
				validationSchema={MessageSchema}
				onSubmit={handleSend}
			>
				{({ isSubmitting }) => (
					<Form className="d-flex gap-2">
						<Field
							name="text"
							type="text"
							className="form-control"
							placeholder="Type a message..."
							style={{ fontSize: "clamp(0.6rem, 0.5rem + 0.5vw, 1rem)" }}
						/>
						<button
							type="submit"
							className="btn btn-danger"
							disabled={isSubmitting}
							style={{ fontSize: "clamp(0.6rem, 0.5rem + 0.5vw, 1rem)" }}
						>
							Send
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default ConversationView;
