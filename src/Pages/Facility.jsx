import React, { useEffect, useState } from 'react'
import Facilities from '../Components/Facilities'
import { getFacilities } from '../Services/APIService'
import { Box } from '@mui/material'

const Facility = () => {
    const [facilities, setFacilities] = useState({})
    const fetchFacilities = async () => {
        const response = await getFacilities()
        setFacilities(response.data)
    }
    useEffect(() => {
        fetchFacilities()
    }, [])
    return (
        <Box sx={{marginTop:"40px", marginBottom:"40px"}}>
            <Facilities facilities={facilities} />
        </Box>
    )
}

export default Facility