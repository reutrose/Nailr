import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
	addNewBusiness,
	getBusinessById,
	updateBusinessById,
} from "../../services/businessService";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBusiness } from "../../services/businessService";
import DeleteBusinessModal from "./DeleteBusinessModal";

const BusinessSchema = Yup.object().shape({
	businessName: Yup.string().required("Business name is required"),
	profession: Yup.string().required("Profession is required"),
	description: Yup.string(),
	location: Yup.string(),
	logo: Yup.mixed().required("Logo is required"),
});

function AddOrEditBusiness({ isEdit = false }) {
	const { user, authenticateUser } = useContext(AuthContext);
	const [loadedBusiness, setLoadedBusiness] = useState(null);
	const [isLoading, setIsLoading] = useState(isEdit);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const navigate = useNavigate();
	const { businessId } = useParams();

	useEffect(() => {
		if (isEdit && businessId) {
			const fetchBusiness = async () => {
				try {
					const business = await getBusinessById(businessId);
					setLoadedBusiness(business);
				} catch (error) {
					console.error("Failed to load business", error);
				} finally {
					setIsLoading(false);
				}
			};
			fetchBusiness();
		}
	}, [isEdit, businessId]);

	const handleDelete = async () => {
		try {
			await deleteBusiness(user.token, businessId);
			await authenticateUser();
			navigate(`/profile/${user._id}`);
		} catch (error) {
			console.error("Failed to delete business", error);
		}
	};

	const initialValues = loadedBusiness
		? {
				...loadedBusiness,
				logo: "",
		  }
		: {
				businessName: "",
				profession: "",
				description: "",
				location: "",
				logo: "",
		  };

	if (isEdit && isLoading) {
		return (
			<div className="container py-5 text-center">
				<div className="spinner-border text-danger" role="status" />
			</div>
		);
	}

	return (
		<div className="container py-5">
			<div
				className="p-5 rounded-4 shadow-sm mx-auto"
				style={{ maxWidth: "500px", backgroundColor: "#fff5f3" }}
			>
				<h4 className="fw-bold mb-4 text-danger">
					<i className="fa-solid fa-briefcase me-2"></i>
					{isEdit ? "Edit Business" : "Add Business"}
				</h4>

				<Formik
					initialValues={initialValues}
					validationSchema={BusinessSchema}
					enableReinitialize
					onSubmit={async (values, actions) => {
						try {
							if (isEdit) {
								await updateBusinessById(user.token, businessId, values);
							} else {
								await addNewBusiness(user.token, values);
							}

							await authenticateUser();
							navigate(`/profile/${user._id}`);
						} catch (err) {
							console.error("Failed to submit business", err);
						}
						actions.setSubmitting(false);
					}}
				>
					{({ setFieldValue }) => (
						<Form>
							<div className="mb-3">
								<label className="form-label">Business Name</label>
								<Field name="businessName" className="form-control" />
								<ErrorMessage
									name="businessName"
									component="div"
									className="text-danger small"
								/>
							</div>

							<div className="mb-3">
								<label className="form-label">Profession</label>
								<Field name="profession" as="select" className="form-select">
									<option value="">Select profession</option>

									<option value="General Contractor">General Contractor</option>
									<option value="Handyman">Handyman</option>
									<option value="Carpenter">Carpenter</option>
									<option value="Electrician">Electrician</option>
									<option value="Plumber">Plumber</option>
									<option value="Roofer">Roofer</option>
									<option value="Mason / Bricklayer">Mason / Bricklayer</option>
									<option value="Drywall Installer">Drywall Installer</option>
									<option value="Flooring Installer">Flooring Installer</option>
									<option value="Tiler">Tiler</option>
									<option value="Window Installer">Window Installer</option>
									<option value="Door Installer">Door Installer</option>
									<option value="Deck Builder">Deck Builder</option>
									<option value="Fence Installer">Fence Installer</option>

									<option value="HVAC Technician">HVAC Technician</option>
									<option value="Solar Panel Installer">
										Solar Panel Installer
									</option>
									<option value="Smart Home Technician">
										Smart Home Technician
									</option>
									<option value="Appliance Repair Technician">
										Appliance Repair Technician
									</option>
									<option value="Security System Installer">
										Security System Installer
									</option>

									<option value="Landscaper">Landscaper</option>
									<option value="Gardener">Gardener</option>
									<option value="Irrigation Specialist">
										Irrigation Specialist
									</option>
									<option value="Tree Surgeon / Arborist">
										Tree Surgeon / Arborist
									</option>
									<option value="Pool Technician">Pool Technician</option>
									<option value="Stone Mason">Stone Mason</option>

									<option value="House Painter">House Painter</option>
									<option value="Interior Designer">Interior Designer</option>
									<option value="Wallpaper Installer">
										Wallpaper Installer
									</option>
									<option value="Mural Artist">Mural Artist</option>
									<option value="Faux Finisher">Faux Finisher</option>

									<option value="Tailor">Tailor</option>
									<option value="Curtain & Drapery Specialist">
										Curtain & Drapery Specialist
									</option>
									<option value="Upholsterer">Upholsterer</option>

									<option value="Welder">Welder</option>
									<option value="Blacksmith">Blacksmith</option>

									<option value="House Cleaner">House Cleaner</option>
									<option value="Window Cleaner">Window Cleaner</option>
									<option value="Mold Remediation Specialist">
										Mold Remediation Specialist
									</option>
									<option value="Post-Construction Cleaner">
										Post-Construction Cleaner
									</option>
									<option value="Fire & Flood Restoration">
										Fire & Flood Restoration
									</option>

									<option value="Sign Maker">Sign Maker</option>
									<option value="Engraver">Engraver</option>
									<option value="Ceramic Artist / Potter">
										Ceramic Artist / Potter
									</option>
									<option value="Glass Artist">Glass Artist</option>
									<option value="Sculptor">Sculptor</option>

									<option value="TV / A/V Installer">TV / A/V Installer</option>
									<option value="Chimney Sweep">Chimney Sweep</option>
									<option value="Drone Roof Inspector">
										Drone Roof Inspector
									</option>
									<option value="Septic System Technician">
										Septic System Technician
									</option>
									<option value="CNC Operator">CNC Operator</option>
									<option value="3D Printing Specialist">
										3D Printing Specialist
									</option>
								</Field>

								<ErrorMessage
									name="profession"
									component="div"
									className="text-danger small"
								/>
							</div>

							<div className="mb-3">
								<label className="form-label">Description</label>
								<Field
									name="description"
									as="textarea"
									className="form-control"
								/>
							</div>

							<div className="mb-3">
								<label className="form-label">Location</label>
								<Field name="location" className="form-control" />
							</div>

							<div className="mb-3">
								<label className="form-label">Logo Upload</label>
								<input
									type="file"
									name="logo"
									className="form-control"
									accept="image/*"
									onChange={(e) => setFieldValue("logo", e.target.files[0])}
								/>
								<ErrorMessage
									name="logo"
									component="div"
									className="text-danger small"
								/>
							</div>

							<div className="d-grid">
								<button
									type="submit"
									className="btn btn-accent-red text-white rounded-pill"
								>
									<i className="fa-solid fa-circle-check me-2"></i>
									{isEdit ? "Update Business" : "Add Business"}
								</button>
							</div>

							{isEdit && (
								<div className="d-grid my-2">
									<button
										type="button"
										className="btn btn-outline-accent-red rounded-pill"
										onClick={() => {
											setShowDeleteModal(true);
										}}
									>
										<i className="fa-solid fa-trash me-2"></i>
										Delete Business
									</button>
								</div>
							)}
						</Form>
					)}
				</Formik>
				{showDeleteModal && (
					<div className="modal fade show d-block" tabIndex="-1" role="dialog">
						<DeleteBusinessModal
							setShowDeleteModal={setShowDeleteModal}
							handleDelete={handleDelete}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default AddOrEditBusiness;
