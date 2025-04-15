import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"; import Layout from './Layout/Layout'
import theme from './Layout/theme'
import Home from './Pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Facility from './Pages/Facility';
import NearByPlaces from './Pages/NearByPlaces';
import { HostelThemeProvider } from './Services/HostelThemeContext';
import TestimonialPage from './Pages/TestimonialPage';


function AppContent() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate to="/jui-hostel/" replace />} />
				<Route path="/jui-hostel/*" element={<Layout />}>
					<Route path="" element={<Home />} />
					<Route path="facilities" element={<Facility />} />
					<Route path="near-by-places" element={<NearByPlaces />} />
					<Route path="testimonials" element={<TestimonialPage />} />
				</Route>
			</Routes>
		</>
	)
}
const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<HostelThemeProvider>
					<AppContent />
				</HostelThemeProvider>
			</Router>
		</ThemeProvider>
	)
}

export default App