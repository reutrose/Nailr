import { Link } from "react-router-dom";
import "../../assets/css/navbar.css";
import { useContext } from "react";
import { BellDot, LogOut, MessageCircleMore } from "lucide-react";
import AuthContext from "../../contexts/AuthContext";

function Navbar() {
	const { user } = useContext(AuthContext);

	return (
		<nav
			className="container-fluid m-0 p-0 px-5 bg-white w-100 d-flex flex-row justify-content-center align-items-center"
			style={{ zIndex: "1000", minHeight: "70px" }}
		>
			<div className="row d-flex justify-content-between w-100">
				<div className="col-3">
					<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
						<div className="container m-0 p-0 d-flex flex-row justify-content-center justify-content-md-start align-items-center h-100">
							<img src="/Nailr-favicon.png" alt="" width={30} height={30} />
							<h5 className="fw-bold m-0 p-0 p-2">Nailr</h5>
						</div>
					</Link>
				</div>
				<div className="col-6">
					<div className="container-fluid m-0 p-0 d-flex flex-row justify-content-center align-items-center h-100">
						<Link
							to="/"
							className="px-2"
							style={{
								textDecoration: "none",
								color: "inherit",
								fontWeight: "600",
								fontSize: "0.8rem",
							}}
						>
							Home
						</Link>
						<div
							className="px-2 text-accent-red"
							style={{ fontSize: "0.8rem" }}
						>
							•
						</div>
						<Link
							to="/how-to"
							className="px-2"
							style={{
								textDecoration: "none",
								color: "inherit",
								fontWeight: "600",
								fontSize: "0.8rem",
							}}
						>
							How It Works
						</Link>
						<div
							className="px-2 text-accent-red"
							style={{ fontSize: "0.8rem" }}
						>
							•
						</div>
						<Link
							to="/crafters"
							className="px-2"
							style={{
								textDecoration: "none",
								color: "inherit",
								fontWeight: "600",
								fontSize: "0.8rem",
							}}
						>
							Crafters
						</Link>
						<div
							className="px-2 text-accent-red"
							style={{ fontSize: "0.8rem" }}
						>
							•
						</div>
						<Link
							to="/projects"
							className="px-2"
							style={{
								textDecoration: "none",
								color: "inherit",
								fontWeight: "600",
								fontSize: "0.8rem",
							}}
						>
							Projects
						</Link>
					</div>
				</div>
				<div className="col-3">
					<div className="container-fluid m-0 p-0 d-flex flex-row justify-content-end align-items-center">
						<div className="container d-flex justify-content-end align-items-center">
							{!user ? (
								<>
									<button
										className="btn btn-accent-red text-white shadow-sm"
										style={{ fontSize: "0.8rem", fontWeight: "600" }}
									>
										Find a Crafter
									</button>
									<button
										className="btn btn-sky text-white shadow-sm mx-2"
										style={{ fontSize: "0.8rem", fontWeight: "600" }}
									>
										Join Nailr
									</button>
								</>
							) : (
								<>
									<div className="dropdown">
										<button
											className="btn btn-transparent dropdown-toggle"
											type="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
											onClick={(e) => {
												const btn = e.currentTarget;
												btn.classList.remove("pulse-on-click");
												void btn.offsetWidth;
												btn.classList.add("pulse-on-click");
											}}
										>
											<img
												src={user ? user.avatar : "/noPhoto.jpg"}
												alt=""
												width={40}
												height={40}
												style={{ borderRadius: "50%" }}
											/>
										</button>
										<ul
											className="dropdown-menu"
											style={{
												border: "1px solid rgba(0,0,0,0.1)",
												boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
												minWidth: "200px",
											}}
										>
											<li>
												<Link
													className="dropdown-item p-0 m-0 p-3"
													to={`/profile/${user._id}`}
												>
													<div className="row d-flex justify-content-between align-items-center">
														<div className="col-3 m-0 p-0 d-flex justify-content-center">
															<img
																src={user.avatar || "noPhoto.jpg"}
																alt=""
																width={30}
																height={30}
																style={{ borderRadius: "50%" }}
															/>
														</div>
														<div className="col-9 m-0 p-0  d-flex justify-content-center">
															<span className="fw-bold">
																{user.firstName + " " + user.lastName}
															</span>
														</div>
														<div className="col-12">
															<button className="btn btn-outline-accent-red rounded-pill p-0 px-3 w-100 mt-3">
																View Profile
															</button>
														</div>
													</div>
												</Link>
											</li>
											<li>
												<Link className="dropdown-item" to="/inbox">
													<MessageCircleMore strokeWidth={2} size={18} />{" "}
													Messages
												</Link>
											</li>
											<li>
												<Link className="dropdown-item" to="/notifications">
													<BellDot strokeWidth={2} size={18} /> Notifications
												</Link>
											</li>
											<hr className="border border-secondary border-1 opacity-25" />
											<li>
												<Link className="dropdown-item" to="/">
													<LogOut strokeWidth={2} size={18} /> Sign Out
												</Link>
											</li>
										</ul>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
