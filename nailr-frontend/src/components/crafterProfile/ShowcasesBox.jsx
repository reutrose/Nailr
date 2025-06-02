import { useCallback, useEffect, useState } from "react";
import { SquarePlus, CalendarDays } from "lucide-react";
import { getPostsByBusiness } from "../../services/postService";
import CreatePostModal from "../posts/CreatePostModal";
import { formatDateToMonthYear } from "../../services/timeService";
import { useNavigate } from "react-router-dom";

function ShowcasesBox({ crafter, viewer }) {
	const [showModal, setShowModal] = useState(false);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const nav = useNavigate();

	const refreshPosts = useCallback(async () => {
		try {
			const userPosts = await getPostsByBusiness(crafter._id);
			setPosts(userPosts);
			setIsLoading(false);
		} catch (err) {
			console.error("Failed to fetch posts:", err);
		}
	}, [crafter._id]);

	useEffect(() => {
		if (crafter?._id) {
			refreshPosts();
		}
	}, [crafter, refreshPosts]);

	const isOwner = crafter?.owner === viewer?._id;

	return (
		<>
			<div className="container-fluid d-flex justify-content-center align-items-center my-5">
				<div className="container bg-white p-4 rounded-3 shadow-sm showcase-box">
					<div className="d-flex justify-content-between align-items-center mb-3 px-2">
						<h4 className="fw-bold m-0">Showcase Projects</h4>
						{isOwner && (
							<button
								type="button"
								className="btn-create-showcase"
								onClick={() => setShowModal(true)}
							>
								<SquarePlus size={15} strokeWidth={1} absoluteStrokeWidth />
								&nbsp;Create
							</button>
						)}
					</div>

					{isLoading ? (
						<div className="d-flex justify-content-center">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						<div className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center">
							{posts?.length ? (
								posts.map((post) => (
									<div
										className="d-flex justify-content-center"
										key={post._id}
										onClick={() => nav(`/showcases/${post._id}`)}
										style={{ cursor: "pointer" }}
									>
										<div className="showcase-card bg-canvas shadow-sm rounded-3">
											<div className="showcase-image-wrapper">
												<img
													src={post.images?.[0] || "/noPhoto.jpg"}
													alt=""
													className="img-fluid"
													loading="lazy"
												/>
											</div>
											<div className="card-body p-4 d-flex flex-column justify-content-between">
												<h5 className="fw-bold showcase-title">{post.title}</h5>
												<p className="card-text showcase-description">
													{post.description}
												</p>
												<div className="small text-secondary d-flex align-items-center gap-1">
													<CalendarDays size={14} strokeWidth={3} />
													{formatDateToMonthYear(post.createdAt)}
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<p className="text-muted">No posts yet.</p>
							)}
						</div>
					)}
				</div>
			</div>

			{showModal && (
				<CreatePostModal
					contextId={crafter._id}
					postType="showcase"
					showModal={showModal}
					setShowModal={setShowModal}
					onSuccess={refreshPosts}
				/>
			)}
		</>
	);
}

export default ShowcasesBox;
