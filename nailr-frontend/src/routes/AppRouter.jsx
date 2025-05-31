import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import CrafterProfilePage from "../pages/CrafterProfilePage";
import MyProfilePage from "../pages/MyProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import UploadAvatarPage from "../pages/UploadAvatarPage";
import NewPostPage from "../pages/NewPostPage";
import EditPostPage from "../pages/EditPostPage";
import ConversationsPage from "../pages/ConversationsPage";
import MessagesPage from "../pages/MessagesPage";
import NotificationPage from "../pages/NotificationPage";
import AuthGuard from "../components/auth/AuthGuard";
import Page404 from "../pages/Page404";
import Crafters from "../pages/Crafters";
import OpenProjects from "../pages/OpenProjects";
import PostPage from "../components/profile/PostPage";
import AddOrEditBusiness from "../components/profile/AddOrEditBusiness";

const AppRouter = () => {
	return (
		<div className="container-fluid m-0 p-0">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/projects" element={<OpenProjects />} />
				<Route path="/crafters" element={<Crafters />} />
				<Route path="/requests/:id" element={<PostDetailsPage />} />
				<Route path="/showcases/:id" element={<PostPage />} />
				<Route path="/crafter/:id" element={<CrafterProfilePage />} />

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
