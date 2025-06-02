import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ConversationList from "../components/messages/ConversationList";
import ConversationView from "../components/messages/ConversationView";
import socket from "../utils/socket";
import {
	createConversationIfNotExists,
	getUserConversations,
} from "../services/messageService";
import "../assets/css/messages.css";
import AuthContext from "../contexts/AuthContext";

function MessagesPage() {
	const location = useLocation();
	const userToContactId = location.state?.userToContactId;
	const [activeConversation, setActiveConversation] = useState(null);
	const [conversations, setConversations] = useState([]);
	const { user } = useContext(AuthContext);

	const deduplicateConversations = (convs) => {
		const seen = new Set();
		return convs.filter((c) => {
			if (seen.has(c._id)) return false;
			seen.add(c._id);
			return true;
		});
	};

	const fetchConversations = useCallback(async () => {
		if (!user?.token) return;
		try {
			const data = await getUserConversations(user.token);
			const deduped = deduplicateConversations(data);
			deduped.sort(
				(a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
			);
			setConversations(deduped);
		} catch (err) {
			console.error("Failed to fetch conversations", err);
		}
	}, [user?.token]);

	useEffect(() => {
		const startConversation = async () => {
			if (!userToContactId) return;
			try {
				const conversation = await createConversationIfNotExists(
					userToContactId
				);
				const exists = conversations.some((c) => c._id === conversation._id);
				if (!exists) {
					setConversations((prev) => [conversation, ...prev]);
				}
				setActiveConversation(conversation);
			} catch (err) {
				console.error("Failed to start conversation", err);
			}
		};
		startConversation();
	}, [userToContactId, conversations]);

	useEffect(() => {
		fetchConversations();
	}, [fetchConversations]);

	useEffect(() => {
		if (!user?.token) return;

		const handleNewMessage = () => fetchConversations();
		socket.on("newMessage", handleNewMessage);
		return () => socket.off("newMessage", handleNewMessage);
	}, [user?.token, fetchConversations]);

	useEffect(() => {
		if (activeConversation) {
			socket.emit("joinConversation", activeConversation._id);
			return () => socket.emit("leaveConversation", activeConversation._id);
		}
	}, [activeConversation]);

	return (
		<div className="row" style={{ height: "85vh" }}>
			<div
				className="col-4 border-end bg-white m-0 p-0 pt-4 px-3 pe-0"
				style={{ overflowY: "auto" }}
			>
				<h5
					className="text-danger fw-bold mb-1"
					style={{ fontSize: "clamp(1rem, 0.875rem + 0.625vw, 1.5rem)" }}
				>
					<i className="fa-solid fa-message me-2"></i>Messages
				</h5>
				<p
					className="text-muted small"
					style={{ fontSize: "clamp(0.6rem, 0.45rem + 0.75vw, 1.2rem)" }}
				>
					Connect & collaborate with others.
				</p>
				<ConversationList
					conversations={conversations}
					activeConversation={activeConversation}
					setActiveConversation={setActiveConversation}
				/>
			</div>
			<div className="col-8 bg-light d-flex align-items-center justify-content-center">
				{activeConversation ? (
					<ConversationView conversation={activeConversation} socket={socket} />
				) : (
					<div className="text-center text-muted">
						<i className="fa-solid fa-comments fa-2x text-sky"></i>
						<h6 className="fw-bold mt-3">Select a conversation</h6>
						<p className="small">
							Choose a conversation from the left to view your messages with a
							crafter or customer.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default MessagesPage;
