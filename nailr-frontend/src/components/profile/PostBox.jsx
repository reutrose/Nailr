import { Send, CircleDollarSign } from "lucide-react";

function PostBox({ post }) {
	const {
		title,
		description,
		images = [],
		tags = [],
		location,
		createdAt,
		postType,
	} = post;

	const formattedDate =
		createdAt && !isNaN(Date.parse(createdAt))
			? new Date(createdAt).toLocaleDateString("en-GB", {
					year: "numeric",
					month: "short",
					day: "numeric",
			  })
			: "Unknown date";

	return (
		<div
			className="container-fluid border rounded-4 p-4 m-4 shadow-sm bg-white"
			key={post._id}
		>
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src={images[0] || "/noPhoto.jpg"}
						className="img-fluid p-3"
						alt={title}
						style={{
							objectFit: "cover",
							height: "100%",
							maxHeight: "240px",
							width: "100%",
							borderRadius: "30px",
						}}
					/>
				</div>

				<div className="col-md-8">
					<div className="card-body p-3">
						<h5 className="card-title fw-bold">{title}</h5>
						<p className="card-text mb-3">{description}</p>

						{tags.length > 0 && (
							<div className="mb-3">
								{tags.map((tag, index) => (
									<span key={index} className="badge bg-secondary me-1">
										#{tag}
									</span>
								))}
							</div>
						)}

						<div className="d-flex justify-content-between text-muted small">
							<span>{location?.trim() || "Unspecified location"}</span>
							<span>{formattedDate}</span>
						</div>
					</div>
				</div>
				<div className="container d-flex justify-content-center align-items-center">
					{postType == "request" ? (
						<button className="edit-profile-btn m-3">
							<CircleDollarSign size={20} strokeWidth={1} absoluteStrokeWidth />
							&nbsp;Craft Your Offer
						</button>
					) : (
						<button className="edit-profile-btn m-3">
							<Send size={14} strokeWidth={1} absoluteStrokeWidth />
							&nbsp;Contact
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default PostBox;
