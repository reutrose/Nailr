import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { updateUserById } from "../services/usersService";
import EditProfileForm from "../components/profile/EditProfileForm";

const EditProfilePage = () => {
	const navigate = useNavigate();
	const { user, authenticateUser } = useContext(AuthContext);

	const handleSubmit = async (updatedData) => {
		try {
			const result = await updateUserById(user._id, updatedData, user.token);

			if (result && !result.error) {
				await authenticateUser();
				navigate(`/profile/${user._id}`);
			} else {
				console.error("Update failed:", result?.error || "Unknown error");
			}
		} catch (err) {
			console.error("Unexpected error:", err.message);
		}
	};

	return <EditProfileForm user={user} onUpdate={handleSubmit} />;
};

export default EditProfilePage;
