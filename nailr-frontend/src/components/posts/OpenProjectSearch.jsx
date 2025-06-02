import { useContext, useState, useEffect } from "react";
import CreatePostModal from "./CreatePostModal";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function OpenProjectSearch({ onSearch, fetchPosts }) {
	const [query, setQuery] = useState("");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { user } = useContext(AuthContext);
	const nav = useNavigate();

	useEffect(() => {
		onSearch(query);
	}, [query, onSearch]);

	return (
		<>
			<form className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
				<div className="row w-100">
					<div className="col-10">
						<input
							type="text"
							placeholder="Search projects by title or description..."
							className="form-control flex-grow-1"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>

					<div className="col-2">
						<button
							type="button"
							className="btn btn-accent-red text-white w-100"
							onClick={() => {
								{
									user ? setShowCreateModal(true) : nav("/login");
								}
							}}
						>
							+ New
						</button>
					</div>
				</div>
			</form>
			{showCreateModal && (
				<CreatePostModal
					token={user.token}
					contextId={user._id}
					postType="request"
					showModal={showCreateModal}
					setShowModal={setShowCreateModal}
					onSuccess={fetchPosts}
				/>
			)}
		</>
	);
}

export default OpenProjectSearch;
