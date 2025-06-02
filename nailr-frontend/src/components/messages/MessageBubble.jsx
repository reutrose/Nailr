import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

function MessageBubble({ message }) {
	const { user } = useContext(AuthContext);
	const isOwnMessage = message.senderId === user._id;

	return (
		<div
			className={`d-flex ${
				isOwnMessage ? "justify-content-end" : "justify-content-start"
			} mb-3`}
		>
			<div
				className={`p-3 rounded-4 shadow-sm ${
					isOwnMessage ? "bg-prime text-white" : "bg-white text-dark"
				}`}
				style={{
					maxWidth: "75%",
					position: "relative",
				}}
			>
				{message.text && (
					<div style={{ fontSize: "clamp(0.8rem, 0.75rem + 0.25vw, 1rem)" }}>
						{message.text}
					</div>
				)}

				{message.image && (
					<img
						src={message.image}
						alt="attached"
						className="img-fluid rounded mt-2"
						style={{ maxHeight: "200px", cursor: "pointer" }}
					/>
				)}

				<div
					className={`mt-2 small ${
						isOwnMessage ? "text-light opacity-75" : "text-muted"
					}`}
					style={{ fontSize: "0.6rem" }}
				>
					{formatDistanceToNow(new Date(message.createdAt), {
						addSuffix: true,
					})}
				</div>
			</div>
		</div>
	);
}

MessageBubble.propTypes = {
	message: PropTypes.shape({
		senderId: PropTypes.string.isRequired,
		text: PropTypes.string,
		image: PropTypes.string,
		createdAt: PropTypes.string.isRequired,
	}).isRequired,
};

export default MessageBubble;
