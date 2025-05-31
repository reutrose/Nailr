import { useContext, useEffect, useState } from "react";
import "../assets/css/user-profile.css";
import AuthContext from "../contexts/AuthContext";
import UserProfileHeader from "../components/profile/UserProfileHeader";
import BusinessesBox from "../components/profile/BusinessesBox";
import ProjectsBox from "../components/profile/ProjectsBox";
import { getUserById } from "../services/usersService";
import { useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";

function MyProfilePage() {
	const { user, loading } = useContext(AuthContext);
	const { id } = useParams();
	const [profileUser, setProfileUser] = useState(null);

	const refreshProfile = async (id) => {
		try {
			const updatedProfile = await getUserById(id);
			setProfileUser(updatedProfile);
		} catch (err) {
			console.error("Failed to refresh business:", err);
		}
	};

	useEffect(() => {
		const fetchProfile = async () => {
			let profile = await getUserById(id);
			setProfileUser(profile);
		};

		fetchProfile();
	}, [id]);

	if (loading || !user || !profileUser) return <Spinner />;

	return (
		<>
			<div className="container-fluid p-5" style={{ maxWidth: "1000px" }}>
				<UserProfileHeader
					profileOf={profileUser}
					viewer={user}
					refreshProfile={refreshProfile}
					setProfileUser={setProfileUser}
				/>
				<BusinessesBox profileOf={profileUser} viewer={user} />
				<ProjectsBox profileOf={profileUser} viewer={user} />
			</div>
		</>
	);
}

export default MyProfilePage;
