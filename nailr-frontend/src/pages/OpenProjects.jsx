import { useCallback, useEffect, useState } from "react";
import { getAllRequestPosts } from "../services/postService";
import OpenProjectSearch from "../components/posts/OpenProjectSearch";
import OpenProjectBox from "../components/posts/OpenProjectBox";
import AuthContext from "../contexts/AuthContext";

function OpenProjects() {
	const [projects, setProjects] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [professionFilter, setProfessionFilter] = useState("");

	const fetchPosts = useCallback(async () => {
		try {
			const requestPosts = await getAllRequestPosts();
			setProjects(requestPosts);
			setFiltered(requestPosts);
			setLoading(false);
		} catch (err) {
			console.error("Failed to fetch posts", err);
			setError("Unable to load open projects.");
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handleSearch = useCallback(
		(query = "", profession = "") => {
			const lowerQuery = query.toLowerCase();
			const results = projects.filter((p) => {
				const matchText =
					p.title.toLowerCase().includes(lowerQuery) ||
					p.description.toLowerCase().includes(lowerQuery);
				const matchProfession = !profession || p.profession === profession;
				return matchText && matchProfession;
			});
			setFiltered(results);
			setProfessionFilter(profession);
		},
		[projects]
	);

	if (loading) return <div className="text-center mt-5">Loading...</div>;
	if (error) return <div className="text-danger text-center mt-5">{error}</div>;

	return (
		<div className="container py-5">
			<OpenProjectSearch
				onSearch={handleSearch}
				selectedProfession={professionFilter}
				fetchPosts={fetchPosts}
			/>
			<div className="row g-4 pt-4">
				{filtered.map((project) => (
					<div className="col-md-6 col-lg-4" key={project._id}>
						<OpenProjectBox project={project} />
					</div>
				))}
			</div>
		</div>
	);
}

export default OpenProjects;
