import React from 'react'
import PlacesNearBy from '../Components/PlacesNearBy'
import { Box } from '@mui/material'

const NearByPlaces = () => {
  return (
    <>
      <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
        <PlacesNearBy />
      </Box>

    </>
  )
}

export default NearByPlaces