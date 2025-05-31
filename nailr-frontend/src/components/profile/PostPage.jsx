import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPostById } from "../../services/postService";
import { useState } from "react";
import { getBusinessById } from "../../services/businessService";
import { formatDateToMonthYear } from "../../services/timeService";
import { CircleArrowLeft } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

function ShowcaseProjectCard() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [crafter, setCrafter] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			let thePost = await getPostById(id);
			setPost(thePost);
			let theAuthor = await getBusinessById(thePost.businessId);
			setCrafter(theAuthor);
			setIsLoading(false);
		};
		fetchPost();
	}, [id]);

	return (
		<>
			{isLoading ? (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<div
					className="rounded-4 shadow-sm p-4 bg-white mt-5"
					style={{ maxWidth: "800px", margin: "0 auto" }}
				>
					<div className="py-3">
						<Link style={{ textDecoration: "none" }} onClick={() => nav(-1)}>
							<CircleArrowLeft />
							&nbsp;Go Back
						</Link>
					</div>
					<div className="position-relative rounded-3 overflow-hidden mb-3">
						<img
							src={post.images[0]}
							alt={post.title}
							className="img-fluid w-100"
							style={{ maxHeight: "350px", objectFit: "cover" }}
						/>
						{crafter.location && (
							<span className="position-absolute top-0 end-0 m-3 badge rounded-pill bg-light text-dark border">
								<i className="fa-solid fa-location-dot me-1"></i>{" "}
								{crafter.location}
							</span>
						)}
					</div>

					<h3 className="fw-bold mb-3">{post.title}</h3>

					<div className="d-flex flex-wrap gap-2 mb-3">
						{post.tags?.map((tag, index) => (
							<span
								key={index}
								className="badge bg-light text-dark border rounded-pill px-3 py-1"
							>
								{tag}
							</span>
						))}
					</div>

					<p className="text-dark mb-4" style={{ lineHeight: "1.6" }}>
						{post.description}
					</p>

					<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
						<div className="d-flex align-items-center gap-2">
							<img
								src={
									crafter.logo ? `${API_URL}/${crafter.logo}` : "/noPhoto.jpg"
								}
								alt={crafter.businessName}
								className="rounded-circle"
								style={{ width: "40px", height: "40px", objectFit: "cover" }}
							/>
							<div>
								<strong>{crafter.businessName}</strong>
								<div className="text-muted small">{crafter.profession}</div>
							</div>
						</div>
						<a
							href={`/profile/${crafter._id}`}
							className="btn btn-outline-accent-red px-4 py-2 rounded-pill"
						>
							Hire Me
						</a>
					</div>

					<div className="d-flex flex-wrap gap-2 mb-3">
						{post.images &&
							post.images.length &&
							post.images.slice(1).map((img, idx) => (
								<img
									key={idx}
									src={img}
									alt={`Project image ${idx + 2}`}
									className="rounded-2"
									style={{
										width: "100px",
										height: "100px",
										objectFit: "cover",
									}}
								/>
							))}
					</div>

					<div className="text-muted small">
						<i className="fa-regular fa-clock me-1"></i> Posted:
						{formatDateToMonthYear(post.createdAt)}
					</div>
				</div>
			)}
		</>
	);
}

export default ShowcaseProjectCard;
