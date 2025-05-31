import { useContext, useState } from "react";
import { deletePostById } from "../../services/postService";
import { formatRelativeTime } from "../../services/timeService";
import AuthToken from "../../contexts/AuthContext";
import DeleteRequestProjectModal from "./DeleteRequestProjectModal";

function RequestProjectBox({ post, profileUser, onPostDeleted }) {
	const { userId, title, description, createdAt } = post;
	const { firstName } = profileUser;
	const { user } = useContext(AuthToken);
	const isOwner = userId == user._id;
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDelete = async () => {
		await deletePostById(post._id, user.token);
		setShowDeleteModal(false);
		if (onPostDeleted) onPostDeleted();
	};

	return (
		<>
			<div className="container-fluid m-0 p-0 bg-white rounded-3 shadow-sm p-3 mt-4">
				<div className="container-fluid m-0 p-0 d-flex flex-column justify-content-between align-items-center">
					<div className="row w-100">
						<div className="col-6 d-flex justify-content-start align-items-center">
							<h5 className="m-0 p-0">{title}</h5>
						</div>
						<div className="col-6 d-flex justify-content-end align-items-center">
							<button
								className="btn btn-surface py-0 mx-1 fw-semibold rounded-pill"
								style={{ fontSize: "0.8rem" }}
							>
								Help {firstName}
							</button>

							{isOwner && (
								<button
									onClick={() => setShowDeleteModal(true)}
									className="btn btn-sky py-0 mx-1 fw-semibold rounded-pill"
									style={{ fontSize: "0.8rem" }}
								>
									Mark as Done
								</button>
							)}
						</div>
					</div>
					<div className="row w-100 py-1">
						<p style={{ fontSize: "0.9rem" }}>{description} </p>
					</div>
					<div className="row w-100 py-1">
						<div className="col-3 d-flex justify-content-start align-items-center">
							<div
								className="d-flex flex-row justify-content-center align-items-center text-muted opacity-75"
								style={{ fontSize: "0.8rem" }}
							>
								<div className="fw-semibold d-flex justify-content-center align-items-center">
									<i className="fa-regular fa-calendar-plus"></i>
									&nbsp;
								</div>
								<div className="">Posted {formatRelativeTime(createdAt)}</div>
							</div>
						</div>
						<div className="col-9">
							{post && post.tags && post.tags.length > 0
								? post.tags.map((tag, index) => (
										<button
											className="btn btn-sky-subtle opacity-50 text-dark py-0 rounded-pill"
											disabled
											style={{ fontSize: "0.8rem" }}
											key={index}
										>
											{tag}
										</button>
								  ))
								: null}
						</div>
					</div>
				</div>
			</div>

			{showDeleteModal && (
				<DeleteRequestProjectModal
					handleDelete={handleDelete}
					setShowDeleteModal={setShowDeleteModal}
				/>
			)}
		</>
	);
}

export default RequestProjectBox;
