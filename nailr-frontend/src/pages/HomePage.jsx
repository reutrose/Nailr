import { useContext } from "react";
import "../assets/css/homepage.css";
import AuthContext from "../contexts/AuthContext";
import HomepageHeader from "../components/homepage/HomepageHeader";
import WhatIsNailr from "../components/homepage/WhatIsNailr";
import FeaturedCrafters from "../components/homepage/FeaturedCrafters";
import RecentProjects from "../components/homepage/RecentProjects";
import Testimonials from "../components/homepage/Testimonials";
import NextStep from "../components/homepage/NextStep";

function HomePage() {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div className="container-fluid homepage-header p-0 m-0 shadow-sm pt-5 pb-5 px-5 d-flex justify-content-center align-items-center">
				<HomepageHeader user={user} />
			</div>
			<div className="container-fluid p-0 m-0 bg-eggshell d-flex justify-content-center align-items-center">
				<WhatIsNailr />
			</div>
			<div className="container-fluid p-0 m-0 p-5 bg-caucasion d-flex flex-column justify-content-center align-items-center">
				<FeaturedCrafters />
			</div>
			<div className="container-fluid p-0 m-0 p-5 bg-eggshell d-flex flex-column justify-content-center align-items-center">
				<RecentProjects />
			</div>
			<div className="container-fluid p-0 m-0 p-5 bg-caucasion d-flex flex-column justify-content-center align-items-center">
				<Testimonials />
			</div>
			<div className="container-fluid homepage-header m-0 p-5 d-flex flex-column border-bottom justify-content-center align-items-center">
				<NextStep user={user} />
			</div>
		</>
	);
}

export default HomePage;
