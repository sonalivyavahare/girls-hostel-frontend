import React, { useEffect, useState } from 'react'
import PlacesNearBy from '../Components/PlacesNearBy'
import { Box } from '@mui/material'
import { getPlaces } from '../Services/APICalling'

const NearByPlaces = () => {
	const [places, setPlaces] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function APICalling() {
			const placeResponse = await getPlaces(setLoading)
			setPlaces(placeResponse)
		}
		APICalling()
	}, [])

	return (
		<>
			<Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
				<PlacesNearBy nearbyPlaces={places} loading={loading} />
			</Box>

		</>
	)
}

export default NearByPlaces