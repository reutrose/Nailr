import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { BellDot, LogOut, MessageCircleMore } from "lucide-react";
import AuthContext from "../../contexts/AuthContext";
import { userLogout } from "../../services/usersService";

function DesktopNavbar() {
	const { user, authenticateUser } = useContext(AuthContext);
	const nav = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleLogout = async () => {
		await userLogout();
		await authenticateUser();
		handleMenuClose();
	};

	return (
		<AppBar
			position="static"
			color="inherit"
			elevation={1}
			sx={{ height: "70px", justifyContent: "center" }}
		>
			<Toolbar sx={{ justifyContent: "center", px: 4 }}>
				<Box sx={{ maxWidth: "1200px", flexGrow: 1, width: "100%" }}>
					<Grid container alignItems="center">
						<Grid size={3}>
							<Box
								display="flex"
								justifyContent="flex-start"
								alignItems="center"
								width="100%"
							>
								<Link
									to="/"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Box display="flex" alignItems="center">
										<img
											src="/Nailr-favicon.png"
											alt="Logo"
											width={30}
											height={30}
										/>
										<Typography variant="h6" fontWeight="bold" ml={1}>
											Nailr
										</Typography>
									</Box>
								</Link>
							</Box>
						</Grid>

						<Grid size={6}>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								gap={2}
								width="100%"
							>
								<Link
									key={"home"}
									to={`/`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Typography fontWeight={500} fontSize={"0.8rem"}>
										Home
									</Typography>
								</Link>
								<Typography color="#ff6b6b">&bull;</Typography>
								<Link
									key={"how-it-works"}
									to={`/how-it-works`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Typography fontWeight={500} fontSize={"0.8rem"}>
										How It Works
									</Typography>
								</Link>
								<Typography color="#ff6b6b">&bull;</Typography>
								<Link
									key={"crafters"}
									to={`/crafters`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Typography fontWeight={500} fontSize={"0.8rem"}>
										Crafters
									</Typography>
								</Link>
								<Typography color="#ff6b6b">&bull;</Typography>
								<Link
									key={"projects"}
									to={`/projects`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Typography fontWeight={500} fontSize={"0.8rem"}>
										Projects
									</Typography>
								</Link>
							</Box>
						</Grid>

						<Grid size={3}>
							<Box
								display="flex"
								justifyContent="flex-end"
								alignItems="center"
								gap={2}
								width="100%"
							>
								{!user ? (
									<>
										<Button
											variant="contained"
											sx={{
												bgcolor: "#ff6b6b",
												fontSize: "0.8rem",
												fontWeight: 600,
												textTransform: "none",
											}}
											onClick={() => nav("/crafters")}
										>
											Find a Crafter
										</Button>
										<Button
											variant="contained"
											sx={{
												bgcolor: "#38bdf8",
												fontSize: "0.8rem",
												fontWeight: 600,
												textTransform: "none",
											}}
											onClick={() => nav("/register")}
										>
											Join Nailr
										</Button>
									</>
								) : (
									<>
										<IconButton onClick={handleMenuOpen}>
											<Avatar
												src={user.avatar || "/noPhoto.jpg"}
												sx={{ width: 40, height: 40 }}
											/>
										</IconButton>
										<Menu
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={handleMenuClose}
										>
											<MenuItem
												component={Link}
												to={`/profile/${user._id}`}
												onClick={handleMenuClose}
											>
												<Avatar
													src={user.avatar}
													sx={{ width: 30, height: 30, mr: 1 }}
												/>
												{user.firstName} {user.lastName}
											</MenuItem>
											<MenuItem
												component={Link}
												to="/inbox"
												onClick={handleMenuClose}
											>
												<MessageCircleMore size={18} /> &nbsp; Messages
											</MenuItem>
											<MenuItem
												component={Link}
												to="/notifications"
												onClick={handleMenuClose}
											>
												<BellDot size={18} /> &nbsp; Notifications
											</MenuItem>
											<Divider />
											<MenuItem onClick={handleLogout}>
												<LogOut size={18} /> &nbsp; Sign Out
											</MenuItem>
										</Menu>
									</>
								)}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default DesktopNavbar;
