import { useContext, useEffect, useState } from "react";
import "../assets/css/businessProfile.css";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import { getBusinessById } from "../services/businessService";
import CrafterProfileHeader from "../components/crafterProfile/CrafterProfileHeader";
import ShowcasesBox from "../components/crafterProfile/ShowcasesBox";
import ReviewsBox from "../components/crafterProfile/ReviewsBox";

function CrafterProfilePage() {
	const { user, loading } = useContext(AuthContext);
	const { id } = useParams();
	const [crafter, setCrafter] = useState(null);
	const [error, setError] = useState(null);

	const refreshCrafterData = async (crafterId) => {
		try {
			const data = await getBusinessById(crafterId);
			setCrafter(data);
			setError(null);
		} catch (err) {
			console.error("Failed to fetch crafter data:", err);
			setError("Failed to load crafter profile. Please try again later.");
		}
	};

	useEffect(() => {
		refreshCrafterData(id);
	}, [id]);

	if (loading || !crafter) return <Spinner />;
	if (error) return <div className="alert alert-danger">{error}</div>;

	return (
		<>
			<section aria-labelledby="crafter-header">
				<CrafterProfileHeader
					crafter={crafter}
					viewer={user}
					refreshBusiness={refreshCrafterData}
					setCrafter={setCrafter}
				/>
			</section>

			<section aria-labelledby="reviews-section">
				<ReviewsBox
					crafter={crafter}
					viewer={user}
					refreshBusiness={refreshCrafterData}
				/>
			</section>

			<section aria-labelledby="showcases-section">
				<ShowcasesBox
					crafter={crafter}
					viewer={user}
					refreshBusiness={refreshCrafterData}
				/>
			</section>
		</>
	);
}

export default CrafterProfilePage;
