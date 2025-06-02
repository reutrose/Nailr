import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllShowcasePosts } from "../../services/postService";
import { formatDateToMonthYear } from "../../services/timeService";
import { useNavigate } from "react-router-dom";

function RecentProjects() {
	const [showcases, setShowcases] = useState([]);
	const nav = useNavigate();
	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchAllShowcaseProjects = async () => {
			let projects = await getAllShowcasePosts();
			setShowcases(projects);
		};
		fetchAllShowcaseProjects();
	}, []);

	return (
		<>
			<h3 className="text-center fw-bold pb-4">Recent Projects</h3>
			<div
				className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center"
				style={{ maxWidth: "1000px", margin: "0 auto" }}
			>
				{showcases?.length ? (
					showcases.slice(0, 3).map((project) => (
						<div className="d-flex justify-content-center" key={project._id}>
							<div
								className="recent-project-card bg-white shadow-sm rounded-3 cursor-pointer"
								onClick={() => {
									nav(`/showcases/${project._id}`);
								}}
							>
								<div className="recent-project-image-wrapper">
									<img
										src={
											API_URL + project.images?.[0] || "/homepageBookshelf.jpg"
										}
										alt=""
										className="img-fluid"
										loading="lazy"
									/>
								</div>
								<div className="card-body p-4 d-flex flex-column justify-content-between">
									<h5 className="fw-bold" style={{ fontSize: "1rem" }}>
										{project.title}
									</h5>
									<p className="card-text" style={{ fontSize: "0.8rem" }}>
										{project.description}
									</p>
									<div
										className="small text-secondary d-flex align-items-center gap-1"
										style={{ fontSize: "0.7rem" }}
									>
										<CalendarDays size={14} strokeWidth={3} />
										{formatDateToMonthYear(project.createdAt)}
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="text-muted text-center">No projects yet.</p>
				)}
			</div>
		</>
	);
}

export default RecentProjects;
