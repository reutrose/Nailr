import { useContext, useEffect, useState } from "react";
import "../assets/css/user-profile.css";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import { getBusinessById } from "../services/businessService";
import CrafterProfileHeader from "../components/profile/CrafterProfileHeader";
import ShowcasesBox from "../components/profile/ShowcasesBox";
import ReviewsBox from "../components/profile/ReviewsBox";

function CrafterProfilePage() {
	const { user, loading } = useContext(AuthContext);
	const { id } = useParams();
	const [crafter, setCrafter] = useState(null);

	const refreshBusiness = async (id) => {
		try {
			const updatedCrafter = await getBusinessById(id);
			setCrafter(updatedCrafter);
		} catch (err) {
			console.error("Failed to refresh business:", err);
		}
	};

	useEffect(() => {
		const fetchCrafter = async () => {
			let currCrafter = await getBusinessById(id);
			setCrafter(currCrafter);
		};

		fetchCrafter();
	}, [id]);

	if (loading || !user || !crafter) return <Spinner />;

	return (
		<>
			<CrafterProfileHeader
				crafter={crafter}
				viewer={user}
				refreshBusiness={refreshBusiness}
				setCrafter={setCrafter}
			/>
			<ReviewsBox
				crafter={crafter}
				viewer={user}
				refreshBusiness={refreshBusiness}
			/>
			<ShowcasesBox
				crafter={crafter}
				viewer={user}
				refreshBusiness={refreshBusiness}
			/>
		</>
	);
}

export default CrafterProfilePage;
