import { useNavigate } from "react-router-dom";

function NextStep({ user }) {
	const nav = useNavigate();

	return (
		<>
			<h2 className="text-center">Ready to Start Your Next Project?</h2>
			<div className="container d-flex justify-content-center align-items-center p-4">
				<button
					className="btn btn-accent-red text-white shadow-sm"
					onClick={() => {
						nav("/crafters");
					}}
				>
					<span className="small">Find a Crafter</span>
				</button>
				{!user && (
					<button
						className="btn btn-sky text-white shadow-sm mx-2"
						onClick={() => {
							nav("/register");
						}}
					>
						<span className="small">Join Nailr</span>
					</button>
				)}
			</div>
		</>
	);
}

export default NextStep;
