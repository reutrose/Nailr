import { SquarePlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import AddBusinessModal from "./AddOrEditBusiness";
import {
	findAllBusinessesByUser,
	removeBusiness,
} from "../../services/businessService";
import BusinessCard from "./BusinessCard";
import { useNavigate } from "react-router-dom";

function BusinessesBox({ profileOf, viewer }) {
	const { authenticateUser } = useContext(AuthContext);
	const [businesses, setBusinesses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchBusinesses = async () => {
			let businessArray = await findAllBusinessesByUser(profileOf._id);
			setBusinesses(businessArray);
			setIsLoading(false);
		};
		fetchBusinesses();
	}, [profileOf]);

	const handleRemove = async (businessId) => {
		await removeBusiness(viewer.token, businessId);
		await authenticateUser();
		setBusinesses((prev) => prev.filter((b) => b._id !== businessId));
	};

	return (
		<>
			<div className="pt-4">
				<div className="row">
					<div className="col-9 d-flex justify-content-start align-items-center">
						<h4 className="fw-semibold m-0 p-0">My Businesses</h4>
					</div>
					<div className="col-3 m-0 p-0 d-flex justify-content-end align-items-center">
						{profileOf && profileOf._id == viewer._id && (
							<div className="container d-flex justify-content-end">
								<button
									type="button"
									className="btn btn-sky-subtle p-0 py-1 px-3"
									onClick={() => nav("/crafters/new")}
								>
									<i className="fa-solid fa-plus"></i>
									&nbsp;Add Business
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
					<div className="row row-cols-2 g-4 my-2">
						{businesses && businesses.length ? (
							businesses.map((business) => {
								return (
									<div className="col" key={business._id}>
										<BusinessCard
											key={business._id}
											business={business}
											viewer={viewer}
											profileOf={profileOf}
											onDelete={handleRemove}
										/>
									</div>
								);
							})
						) : (
							<p>Empty for now — even Picasso had to start somewhere.</p>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default BusinessesBox;
