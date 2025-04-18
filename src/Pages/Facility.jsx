import React, { useEffect, useState } from 'react'
import Facilities from '../Components/Facilities'
import { Box } from '@mui/material'
import { fetchFacilities } from '../Services/APICalling'

const Facility = () => {
    const [facilities, setFacilities] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function get() {
            const response = await fetchFacilities(setLoading)
            setFacilities(response)
        }
        get()
    }, [])
    return (
        <Box sx={{marginTop:"40px", marginBottom:"40px"}}>
            <Facilities facilities={facilities} loading={loading} />
        </Box>
    )
}

export default Facility