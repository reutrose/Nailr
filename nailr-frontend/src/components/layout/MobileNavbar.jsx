import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	BellDot,
	LogOut,
	MessageCircleMore,
	House,
	CircleHelp,
	HardHat,
	BriefcaseBusiness,
} from "lucide-react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Typography,
	Grid,
} from "@mui/material";
import AuthContext from "../../contexts/AuthContext";
import { userLogout } from "../../services/usersService";

function MobileNavbar() {
	const { user, authenticateUser } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const nav = useNavigate();

	const handleLogout = async () => {
		await userLogout();
		await authenticateUser();
		setAnchorEl(null);
	};

	const handleOpenMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const iconSize = 20;
	const labelStyle = {
		fontSize: "0.6rem",
		fontWeight: 500,
		marginTop: "0.2rem",
	};

	return (
		<AppBar
			position="fixed"
			color="default"
			sx={{
				top: 0,
				bottom: "auto",
				backgroundColor: "white",
				borderBottom: "1px solid #eee",
				boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
				display: { xs: "flex", md: "none" },
				height: "70px",
				justifyContent: "center",
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					px: 1,
				}}
			>
				<Grid size={2}>
					<Box
						display="flex"
						justifyContent="flex-start"
						alignItems="center"
						width="100%"
					>
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							<Box display="flex" alignItems="center">
								<img
									src="/Nailr-favicon.png"
									alt="Logo"
									width={30}
									height={30}
								/>
							</Box>
						</Link>
					</Box>
				</Grid>

				<Grid size={8}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							<Box display="flex" flexDirection="column" alignItems="center">
								<House size={iconSize} />
								<Typography sx={labelStyle}>Home</Typography>
							</Box>
						</Link>
						<Link
							to="/how-it-works"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<Box display="flex" flexDirection="column" alignItems="center">
								<CircleHelp size={iconSize} />
								<Typography sx={labelStyle}>How To</Typography>
							</Box>
						</Link>
						<Link
							to="/crafters"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<Box display="flex" flexDirection="column" alignItems="center">
								<HardHat size={iconSize} />
								<Typography sx={labelStyle}>Crafters</Typography>
							</Box>
						</Link>
						<Link
							to="/projects"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<Box display="flex" flexDirection="column" alignItems="center">
								<BriefcaseBusiness size={iconSize} />
								<Typography sx={labelStyle}>Projects</Typography>
							</Box>
						</Link>
					</Box>
				</Grid>

				<Grid size={2}>
					{user && (
						<Box>
							<IconButton onClick={handleOpenMenu}>
								<Avatar
									src={user.avatar || "/noPhoto.jpg"}
									sx={{ width: 25, height: 25 }}
								/>
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleCloseMenu}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<Box px={2} py={1}>
									<Typography
										variant="subtitle2"
										sx={{ fontWeight: "bold", mb: 1 }}
									>
										{user.firstName + " " + user.lastName}
									</Typography>
									<MenuItem
										onClick={() => {
											nav(`/profile/${user._id}`);
											handleCloseMenu();
										}}
									>
										👤 View Profile
									</MenuItem>
									<MenuItem
										onClick={() => {
											nav("/inbox");
											handleCloseMenu();
										}}
									>
										<MessageCircleMore size={18} style={{ marginRight: 8 }} />
										Messages
									</MenuItem>
									<MenuItem
										onClick={() => {
											nav("/notifications");
											handleCloseMenu();
										}}
									>
										<BellDot size={18} style={{ marginRight: 8 }} />
										Notifications
									</MenuItem>
									<MenuItem onClick={handleLogout}>
										<LogOut size={18} style={{ marginRight: 8 }} />
										Sign Out
									</MenuItem>
								</Box>
							</Menu>
						</Box>
					)}
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default MobileNavbar;
