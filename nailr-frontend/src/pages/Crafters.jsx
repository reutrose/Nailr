import { useNavigate } from "react-router-dom";
import "../assets/css/crafters.css";
import { useEffect, useState } from "react";
import { getAllBusinesses } from "../services/businessService";
import { Eye } from "lucide-react";
import CrafterSearch from "./CrafterSearch";
const API_URL = import.meta.env.VITE_API_URL;

function Crafters() {
	const [crafters, setCrafters] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const nav = useNavigate();

	useEffect(() => {
		const fetchCrafters = async () => {
			try {
				const allCrafters = await getAllBusinesses();
				setCrafters(allCrafters);
				setFiltered(allCrafters);
			} catch (err) {
				console.error("Failed to load crafters", err);
			}
		};
		fetchCrafters();
	}, []);

	const handleFilter = ({ search, profession, location, skills }) => {
		let filteredList = [...crafters];

		if (search) {
			const searchLower = search.toLowerCase();
			filteredList = filteredList.filter(
				(c) =>
					c.businessName?.toLowerCase().includes(searchLower) ||
					c.location?.toLowerCase().includes(searchLower) ||
					c.description?.toLowerCase().includes(searchLower)
			);
		}

		if (profession) {
			filteredList = filteredList.filter((c) => c.profession === profession);
		}

		if (location) {
			filteredList = filteredList.filter((c) =>
				c.location?.toLowerCase().includes(location.toLowerCase())
			);
		}

		if (skills) {
			filteredList = filteredList.filter((c) =>
				c.description?.toLowerCase().includes(skills.toLowerCase())
			);
		}

		setFiltered(filteredList);
		setCurrentPage(1);
	};

	const totalPages = Math.ceil(filtered.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = filtered.slice(startIndex, endIndex);

	return (
		<div className="container py-5 d-flex flex-column justify-content-center align-items-center">
			<div className="text-center mb-4" style={{ maxWidth: "600px" }}>
				<h2 className="fw-bold">Find the Right Crafter for Your Project</h2>
				<p className="text-muted">
					Browse, search, and filter to discover professionals in carpentry,
					painting, welding, and more.
				</p>
			</div>

			<CrafterSearch onFilter={handleFilter} />

			<div
				className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4"
				style={{ maxWidth: "1000px" }}
			>
				{currentItems.length ? (
					currentItems.map((crafter) => (
						<div className="col" key={crafter._id}>
							<div
								className="card border-0 rounded-4 shadow-sm"
								style={{ height: "350px", minWidth: "250px" }}
							>
								<div className="card-body d-flex flex-column justify-content-between">
									<div className="d-flex align-items-center mb-3">
										<img
											src={
												crafter.logo
													? `${API_URL}/${crafter.logo}`
													: "/noPhoto.jpg"
											}
											className="rounded-circle me-3"
											alt="Avatar"
											width="50"
											height="50"
										/>
										<div>
											<h6 className="mb-0">{crafter.businessName}</h6>
											<small className="text-muted">
												<i
													className="fa-solid fa-location-dot"
													style={{ color: "#f96c6c" }}
												></i>
												&nbsp; {crafter.location}
											</small>
										</div>
									</div>
									<span className="badge bg-danger rounded-4 opacity-75 fw-semibold">
										{crafter.profession}
									</span>
									<p className="small mb-3">{crafter.description}</p>
									<div className="d-flex mb-2">
										<i
											className="fa-solid fa-star"
											style={{ color: "#ffd600" }}
										></i>
										&nbsp;
										<span className="fw-semibold">{crafter.averageRating}</span>
										&nbsp;
										<span className="text-muted opacity-50">
											({crafter.reviews.length} reviews)
										</span>
									</div>
									<button
										onClick={() => nav(`/crafter/${crafter._id}`)}
										className="btn btn-sm btn-sky text-white rounded-4 w-100"
									>
										<Eye size={16} /> View Profile
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No Crafters Yet.</p>
				)}
			</div>

			{totalPages > 1 && (
				<nav className="mt-4 d-flex justify-content-center">
					<ul className="pagination">
						<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
							<button
								className="page-link"
								onClick={() => setCurrentPage(currentPage - 1)}
							>
								&laquo;
							</button>
						</li>

						{Array.from({ length: totalPages }, (_, i) => (
							<li
								key={i}
								className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
							>
								<button
									className="page-link"
									onClick={() => setCurrentPage(i + 1)}
								>
									{i + 1}
								</button>
							</li>
						))}

						<li
							className={`page-item ${
								currentPage === totalPages ? "disabled" : ""
							}`}
						>
							<button
								className="page-link"
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								&raquo;
							</button>
						</li>
					</ul>
				</nav>
			)}
		</div>
	);
}

export default Crafters;
