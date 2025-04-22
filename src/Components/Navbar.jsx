import React, { useEffect, useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Box,
	Container,
	Divider,
	Menu,
	MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getMenuBar } from '../Services/APIService';
import { Link, useLocation } from 'react-router-dom';
import { useHostelTheme } from '../Services/HostelThemeContext';
import AccountCircle from '@mui/icons-material/AccountCircle';


export const SITE_URI = '/hostel/website'
const pages = [
	{ label: 'Home', path: `${SITE_URI}` },
	{ label: 'Facilities', path: `${SITE_URI}/facilities` },
	{ label: 'Places Near By', path: `${SITE_URI}/near-by-places` },
	{ label: 'Testimonials', path: `${SITE_URI}/testimonials` },
	{ label: 'Gallary', path: `${SITE_URI}/gallary` },
	{ label: 'Contact', path: `${SITE_URI}/contact` },
	{ label: 'About Us', path: `${SITE_URI}/about-us` },
	{ label: 'Rooms', path: `${SITE_URI}/rooms` },
];
const Navbar = () => {
	const location = useLocation();

	const { setMenuBarColor } = useHostelTheme()

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen((prev) => !prev);
	};

	const [menuBar, setMenuBar] = useState({})
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const isLoggedIn = !!sessionStorage.getItem('userToken'); // change as needed

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		sessionStorage.removeItem('userToken');
		sessionStorage.removeItem('userId');
		handleClose();
		window.location.href = `${SITE_URI}/login`;
	};

	const getMenuBarDetails = async () => {
		const response = await getMenuBar()
		setMenuBarColor(response?.data[0]?.hostelManuBarColor)
		setMenuBar(response?.data[0])

	}
	useEffect(() => {
		getMenuBarDetails()
	}, [])


	return (
		<>
			<AppBar position="static" sx={{ bgcolor: menuBar?.hostelManuBarColor || 'primary.main' }}>
				<Container maxWidth="lg">
					<Toolbar disableGutters>
						{/* Logo */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
							<img src={menuBar.hostelManubarImage} alt="Jui Girls Hostel Logo" style={{ height: '40px' }} />
							<Typography
								variant="h6"
								component="div"
							>
								Jui Girls Hostel
							</Typography>
						</Box>

						{/* Hamburger for small screens */}
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								color="inherit"
								onClick={toggleMobileMenu}
							>
								{mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
							</IconButton>
						</Box>

						{/* Buttons for larger screens */}
						<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
							{pages.map((page) => {
								const isActive = location.pathname === page.path;

								return (
									<Button
										key={page.label}
										component={Link}
										to={page.path}
										color="inherit"
										sx={{
											bgcolor: isActive ? 'White' : (menuBar.hostelManuBarColor || 'primary.main'),
											color: isActive ? menuBar.hostelManuBarColor : 'inherit',
											fontWeight: 'bold',
											'&:hover': {
												bgcolor: isActive ? menuBar.hostelManuBarColor : "white",
												color: isActive ? "white" : menuBar.hostelManuBarColor,
											},
										}}
									>
										{page.label}
									</Button>
								);
							})}

							{isLoggedIn && (
								<>
									<IconButton size="medium" edge="end" color="inherit" onClick={handleMenu}>
										<AccountCircle />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										anchorOrigin={{
											vertical: 'bottom', 
											horizontal: 'right',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
									>
										<MenuItem onClick={handleClose} component={Link} to={`${SITE_URI}/profile`}>
											Profile
										</MenuItem>
										<MenuItem onClick={handleLogout}>Logout</MenuItem>
									</Menu>
								</>
							)}
						</Box>

					</Toolbar>
				</Container>
			</AppBar>

			{/* Full-width dropdown menu for small screens */}
			{mobileMenuOpen && (
				<Box
					sx={{
						display: { xs: 'flex', md: 'none' },
						flexDirection: 'column',
						bgcolor: menuBar.hostelManuBarColor,
						px: 2,
						py: 1,
					}}
				>
					{pages.map((page) => (
						<Button
							key={page.label}
							sx={{ color: 'white', justifyContent: 'flex-start' }}
							onClick={() => setMobileMenuOpen(false)}
						>
							{page.label}
						</Button>
					))}
					<Divider sx={{ borderColor: 'white', my: 1 }} />

					{isLoggedIn && (
						<>
							<Button
								sx={{ color: 'white', justifyContent: 'flex-start' }}
								component={Link}
								to="/profile"
								onClick={() => setMobileMenuOpen(false)}
							>
								Profile
							</Button>
							<Button
								sx={{ color: 'white', justifyContent: 'flex-start' }}
								onClick={() => {
									handleLogout();
									setMobileMenuOpen(false);
								}}
							>
								Logout
							</Button>
						</>
					)}
				</Box>
			)}
		</>
	);
};

export default Navbar;
