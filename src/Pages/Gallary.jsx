import React, { useEffect, useState } from 'react'
import GallaryCard from '../Components/GallaryCard'
import { Box } from '@mui/material'
import { getImages } from '../Services/APICalling'

const Gallary = () => {
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function APICalling() {
			const galleResponse = await getImages(setLoading)
			setImages(galleResponse)
		}
		APICalling()
	}, [])
	return (
		<>
			<Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
				<GallaryCard images={images} loading={loading} />
			</Box>
		</>
	)
}

export default Gallary