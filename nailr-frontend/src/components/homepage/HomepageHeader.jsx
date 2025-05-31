import { useNavigate } from "react-router-dom";
import HeaderPhotoBox from "../layout/HeaderPhotoBox";

function HomepageHeader({ user }) {
	const nav = useNavigate();

	return (
		<div
			className="row d-flex justify-content-between align-items-center w-100"
			style={{ maxWidth: "1500px" }}
		>
			<div
				className="col-12 col-md-6 order-2 order-md-1 d-flex flex-column  text-center text-md-start pt-4 pb-4 align-items-center align-items-md-start"
				style={{ maxWidth: "600px" }}
			>
				<h2
					className="m-0 p-0"
					style={{
						fontSize: "clamp(1.2rem, 0.75rem + 2.25vw, 3rem)",
					}}
				>
					Connecting You With
				</h2>
				<h2
					className="text-accent-red m-0 p-0"
					style={{
						fontSize: "clamp(1.2rem, 0.75rem + 2.25vw, 3rem)",
					}}
				>
					Skilled Crafters
				</h2>
				<p
					className="pt-2"
					style={{ fontSize: "clamp(0.7rem, 0.575rem + 0.625vw, 1.2rem)" }}
				>
					Nailr makes it easy to find trusted professionals for all your home
					improvement and repair needs. Carpenters, electricians, painters, and
					more — one click away.
				</p>
				<div
					className="container p-0 m-0 d-flex flex-row"
					style={{ maxWidth: "350px" }}
				>
					<button
						className="btn btn-accent-red text-white shadow-sm w-100"
						onClick={() => {
							nav("/crafters");
						}}
					>
						<span
							style={{
								fontSize: "clamp(0.55rem, 0.4375rem + 0.5625vw, 1rem)",
								fontWeight: "600",
							}}
						>
							Find a Crafter
						</span>
					</button>
					{!user && (
						<button
							className="btn btn-sky text-white shadow-sm mx-2 w-100"
							onClick={() => {
								nav("/register");
							}}
						>
							<span
								style={{
									fontSize: "clamp(0.55rem, 0.4375rem + 0.5625vw, 1rem)",
									fontWeight: "600",
								}}
							>
								Join Nailr
							</span>
						</button>
					)}
				</div>
			</div>
			<div className="col-12 col-md-6 order-1 order-md-2 d-flex justify-content-center align-items-center pt-4 pb-4">
				<div className="container d-flex justify-content-center justify-content-md-end align-items-center h-100">
					<div>
						<HeaderPhotoBox />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomepageHeader;
