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
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
	{ label: 'Login', path: `${SITE_URI}/login` },
];
const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { setMenuBarColor } = useHostelTheme()

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen((prev) => !prev);
	};

	const [menuBar, setMenuBar] = useState({})

	const isLoggedIn = !!sessionStorage.getItem('userToken'); // change as needed

	const handleMenu = (event) => {
		navigate(`${SITE_URI}/profile`)
	};


	const handleLogout = () => {
		sessionStorage.removeItem('userToken');
		sessionStorage.removeItem('userId');
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
							{pages
								.filter((page) => !(isLoggedIn && page.label === 'Login'))
								.map((page) => {
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
					{pages
						.filter((page) => !(isLoggedIn && page.label === 'Login'))
						.map((page) => (
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
