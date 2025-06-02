import { useCallback, useEffect, useState } from "react";
import { CirclePlus, SquarePlus } from "lucide-react";
import PostBox from "./PostBox";
import { getPostsByUser } from "../../services/postService";
import CreatePostModal from "../posts/CreatePostModal";
import RequestProjectBox from "./RequestProjectBox";

function ProjectsBox({ profileOf, viewer }) {
	const [showModal, setShowModal] = useState(false);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const refreshPosts = useCallback(async () => {
		try {
			const userPosts = await getPostsByUser(viewer._id);
			setPosts(userPosts);
			setIsLoading(false);
		} catch (err) {
			console.error("Failed to fetch posts:", err);
		}
	}, [viewer._id]);

	useEffect(() => {
		if (viewer?._id) {
			refreshPosts();
		}
	}, [viewer, refreshPosts]);

	return (
		<>
			<div className="pt-4">
				<div className="row">
					<div className="col-9 d-flex justify-content-start align-items-center">
						<h4 className="fw-semibold m-0 p-0">Projects I Need Help With</h4>
					</div>
					<div className="col-3 m-0 p-0 d-flex justify-content-end align-items-center">
						{profileOf && profileOf._id == viewer._id && (
							<div className="container d-flex justify-content-end">
								<button
									type="button"
									className="btn btn-sky-subtle p-0 py-1 px-3"
									onClick={() => setShowModal(true)}
								>
									<CirclePlus />
								</button>
							</div>
						)}
					</div>
				</div>
				{isLoading ? (
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : (
					<div className="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center">
						{profileOf && posts && posts.length ? (
							posts.map((post) => {
								return (
									<RequestProjectBox
										profileUser={profileOf}
										post={post}
										key={post._id}
										onPostDeleted={refreshPosts}
									/>
								);
							})
						) : (
							<p>No posts yet.</p>
						)}
					</div>
				)}
			</div>
			{showModal && (
				<CreatePostModal
					token={viewer.token}
					contextId={viewer._id}
					postType="request"
					showModal={showModal}
					setShowModal={setShowModal}
					onSuccess={refreshPosts}
				/>
			)}
		</>
	);
}

export default ProjectsBox;
