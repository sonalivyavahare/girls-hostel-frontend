import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const Layout = () => {
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
				<Navbar />

				<Box component="main" sx={{ flexGrow: 1 }} >
					<Outlet />
				</Box>

				<Footer />
			</Box>

		</>
	)
}

export default Layout