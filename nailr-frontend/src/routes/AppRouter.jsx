import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import CrafterProfilePage from "../pages/CrafterProfilePage";
import MyProfilePage from "../pages/MyProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import UploadAvatarPage from "../pages/UploadAvatarPage";
import NewPostPage from "../pages/NewPostPage";
import EditPostPage from "../pages/EditPostPage";
import MessagesPage from "../pages/MessagesPage";
import NotificationPage from "../pages/NotificationPage";
import AuthGuard from "../components/auth/AuthGuard";
import Page404 from "../pages/Page404";
import Crafters from "../pages/Crafters";
import OpenProjects from "../pages/OpenProjects";
import PostPage from "../components/profile/PostPage";
import AddOrEditBusiness from "../components/profile/AddOrEditBusiness";
import AllBusinessReviews from "../components/crafterProfile/AllBusinessReviews";
import HowItWorks from "../pages/HowItWorks";
import AboutNailr from "../pages/AboutNailr";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import ContactUs from "../pages/ContactUs";
import TooManyRequests from "../pages/TooManyRequests";

const AppRouter = () => {
	return (
		<div className="container-fluid m-0 p-0">
			<Routes>
				<Route path="/too-many-requests" element={<TooManyRequests />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/how-it-works" element={<HowItWorks />} />
				<Route path="/about" element={<AboutNailr />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-of-service" element={<TermsOfService />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/projects" element={<OpenProjects />} />
				<Route path="/crafters" element={<Crafters />} />
				<Route path="/requests/:id" element={<PostDetailsPage />} />
				<Route path="/showcases/:id" element={<PostPage />} />
				<Route path="/crafter/:id" element={<CrafterProfilePage />} />
				<Route
					path="/businesses/:id/reviews"
					element={<AllBusinessReviews />}
				/>

				<Route
					path="/profile/:id"
					element={
						<AuthGuard>
							<MyProfilePage />
						</AuthGuard>
					}
				/>
				<Route
					path="/profile/:id/edit"
					element={
						<AuthGuard>
							<EditProfilePage />
						</AuthGuard>
					}
				/>
				<Route
					path="/profile/:id/avatar"
					element={
						<AuthGuard>
							<UploadAvatarPage />
						</AuthGuard>
					}
				/>
				<Route
					path="/crafters/new"
					element={
						<AuthGuard>
							<AddOrEditBusiness />
						</AuthGuard>
					}
				/>
				<Route
					path="/crafters/edit/:businessId"
					element={
						<AuthGuard>
							<AddOrEditBusiness isEdit={true} />
						</AuthGuard>
					}
				/>

				<Route
					path="/posts/new"
					element={
						<AuthGuard>
							<NewPostPage />
						</AuthGuard>
					}
				/>
				<Route
					path="/posts/:id/edit"
					element={
						<AuthGuard>
							<EditPostPage />
						</AuthGuard>
					}
				/>
				<Route
					path="/inbox"
					element={
						<AuthGuard>
							<MessagesPage />
						</AuthGuard>
					}
				/>
				<Route
					path="/notifications"
					element={
						<AuthGuard>
							<NotificationPage />
						</AuthGuard>
					}
				/>
				<Route path="*" element={<Page404 />} />
			</Routes>
		</div>
	);
};

export default AppRouter;
