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

	return (
		<>
			<div className="container-fluid d-flex justify-content-center align-items-center my-5">
				<div
					className="container m-0 p-0 bg-white p-4 rounded-3 shadow-sm"
					style={{ maxWidth: "1000px" }}
				>
					<div className="row m-0 p-0 mx-2">
						<div className="col d-flex justify-content-start align-items-center">
							<h4 className="fw-bold">Showcase Projects</h4>
						</div>
						<div className="col d-flex justify-content-end align-items-center">
							{crafter.owner == viewer._id && (
								<div className="container d-flex justify-content-end">
									<button
										type="button"
										className="edit-profile-btn"
										onClick={() => setShowModal(true)}
									>
										<SquarePlus size={15} strokeWidth={1} absoluteStrokeWidth />
										&nbsp;Create
									</button>
								</div>
							)}
						</div>
					</div>

					{isLoading ? (
						<div className="d-flex justify-content-center m-0 p-0">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						<div className="container d-flex flex-column justify-content-center align-items-center m-0 p-0">
							<div className="row row-cols-1 row-cols-lg-3 g-4  m-0 p-0 justify-content-center">
								{crafter && posts && posts.length ? (
									posts.map((post) => {
										return (
											<>
												<div
													className="d-flex justify-content-center"
													onClick={() => {
														nav(`/showcases/${post._id}`);
													}}
													style={{ cursor: "pointer" }}
												>
													<div
														className="d-flex flex-column justify-content-between bg-canvas shadow-sm rounded-3"
														style={{ width: "300px" }}
													>
														<div
															style={{
																width: "300px",
																height: "150px",
																overflow: "hidden",
																position: "relative",
																zIndex: "1",
																borderTopLeftRadius: "10px",
																borderTopRightRadius: "10px",
															}}
														>
															<img
																src={
																	post.images ? post.images[0] : "/noPhoto.jpg"
																}
																alt=""
																className="img-fluid"
																style={{ position: "absolute", top: "-30px" }}
															/>
														</div>
														<div className="card-body p-4 d-flex flex-column justify-content-between">
															<h5
																className="fw-bold"
																style={{ fontSize: "1rem" }}
															>
																{post.title}
															</h5>
															<p
																className="card-text"
																style={{ fontSize: "0.8rem" }}
															>
																{post.description}
															</p>
															<div
																className="small text-secondary d-flex align-items-center gap-1"
																style={{ fontSize: "0.7rem" }}
															>
																<CalendarDays size={14} strokeWidth={3} />
																{formatDateToMonthYear(post.createdAt)}
															</div>
														</div>
													</div>
												</div>
											</>
										);
									})
								) : (
									<p>No posts yet.</p>
								)}
							</div>
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
