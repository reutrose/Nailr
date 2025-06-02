import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postService";
import { getUserById } from "../services/usersService";
import { getBusinessById } from "../services/businessService";
const API_URL = import.meta.env.VITE_API_URL;

function PostDetailsPage() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [author, setAuthor] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPostAndAuthor = async () => {
			try {
				const postData = await getPostById(id);
				setPost(postData);

				if (postData.userId) {
					const user = await getUserById(postData.userId);
					setAuthor({
						name: `${user.firstName} ${user.lastName}`,
						avatar: user.avatar || "/default-avatar.png",
						type: "request",
					});
				} else if (postData.businessId) {
					const business = await getBusinessById(postData.businessId);
					setAuthor({
						name: business.businessName,
						avatar: business.logo || "/default-avatar.png",
						type: "showcase",
					});
				}
			} catch (err) {
				console.error("Failed to fetch post or author:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPostAndAuthor();
	}, [id]);

	if (loading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	if (!post) return <p className="text-center mt-5">Post not found</p>;

	const { title, description, images, tags, location } = post;

	return (
		<div className="container my-5">
			<div className="card shadow p-4">
				{author && (
					<div className="d-flex align-items-center mb-4">
						<img
							src={
								author.avatar ? `${API_URL}/${author.avatar}` : "/no-photo.jpg"
							}
							alt="Author"
							className="rounded-circle me-3"
							style={{ width: "60px", height: "60px", objectFit: "cover" }}
						/>
						<div>
							<h5 className="mb-0">{author.name}</h5>
							<small className="text-muted text-capitalize">
								{author.type}
							</small>
						</div>
					</div>
				)}

				<h3 className="mb-3">{title}</h3>
				<p>{description}</p>

				{location && (
					<p>
						<strong>Location:</strong> {location}
					</p>
				)}

				{tags?.length > 0 && (
					<div className="mb-3">
						<strong>Tags:</strong>{" "}
						{tags.map((tag, index) => (
							<span key={index} className="badge bg-secondary me-1">
								{tag}
							</span>
						))}
					</div>
				)}

				{images?.length > 0 && (
					<div className="row">
						{images.map((img, index) => (
							<div className="col-md-4 mb-3" key={index}>
								<img
									src={API_URL + img}
									alt={`Post Image ${index + 1}`}
									className="img-fluid rounded shadow-sm"
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default PostDetailsPage;
