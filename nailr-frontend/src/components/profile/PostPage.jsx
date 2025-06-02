import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../../services/postService";
import { getBusinessById } from "../../services/businessService";
import { formatDateToMonthYear } from "../../services/timeService";
import { BriefcaseBusiness, CircleArrowLeft, Pencil } from "lucide-react";
import EditPostModal from "../../components/posts/EditPostModal";

const API_URL = import.meta.env.VITE_API_URL;

function ShowcaseProjectCard() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [crafter, setCrafter] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
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

	const handleContact = () => {
		nav("/inbox", {
			state: { userToContactId: crafter._id },
		});
	};

	const handleEditSuccess = async () => {
		const updatedPost = await getPostById(id);
		setPost(updatedPost);
		setShowModal(false);
	};

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
					<div className="py-3 d-flex justify-content-between align-items-center">
						<Link style={{ textDecoration: "none" }} onClick={() => nav(-1)}>
							<CircleArrowLeft /> &nbsp;Go Back
						</Link>
						{crafter?._id === post?.businessId && (
							<button
								type="button"
								className="btn btn-sm btn-outline-secondary"
								onClick={() => setShowModal(true)}
							>
								<Pencil size={14} /> Edit
							</button>
						)}
					</div>
					<div className="position-relative rounded-3 overflow-hidden mb-3">
						<img
							src={API_URL + post.images[0]}
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
						<button
							type="button"
							className="btn btn-accent-red text-white"
							onClick={handleContact}
							aria-label={`Contact ${crafter.businessName}`}
						>
							<BriefcaseBusiness
								size={15}
								strokeWidth={1}
								absoluteStrokeWidth
							/>{" "}
							&nbsp;Hire Me
						</button>
					</div>

					<div className="d-flex flex-wrap gap-2 mb-3">
						{post.images &&
							post.images.length &&
							post.images.slice(1).map((img, idx) => (
								<img
									key={idx}
									src={API_URL + img}
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

			<EditPostModal
				showModal={showModal}
				setShowModal={setShowModal}
				post={post}
				onSuccess={handleEditSuccess}
			/>
		</>
	);
}

export default ShowcaseProjectCard;
