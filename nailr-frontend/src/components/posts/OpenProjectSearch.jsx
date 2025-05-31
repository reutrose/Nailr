import { useContext, useState, useEffect } from "react";
import CreatePostModal from "./CreatePostModal";
import AuthContext from "../../contexts/AuthContext";

const professions = [
	"Carpenter",
	"Electrician",
	"Plumber",
	"HVAC Technician",
	"Painter",
	"Welder",
	"Mason / Bricklayer",
	"Roofer",
	"Handyman",
	"Landscaper",
	"Interior Designer",
];

function OpenProjectSearch({ onSearch, selectedProfession, fetchPosts }) {
	const [query, setQuery] = useState("");
	const [profession, setProfession] = useState(selectedProfession || "");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		onSearch(query, profession);
	}, [query, profession, onSearch]);

	return (
		<>
			<form className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
				<div className="row w-100">
					<div className="col-12 col-md-6">
						<input
							type="text"
							placeholder="Search projects by title or description..."
							className="form-control flex-grow-1"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div className="col-12 col-md-4">
						<select
							className="form-select"
							value={profession}
							onChange={(e) => setProfession(e.target.value)}
						>
							<option value="">All Professions</option>
							{professions.map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</select>
					</div>
					<div className="col-12 col-md-2">
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => {
								setShowCreateModal(true);
							}}
						>
							+ Post a New Project
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
