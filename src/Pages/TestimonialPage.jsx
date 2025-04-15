import React, { useEffect, useState } from 'react'
import { getAllTestimonials } from '../Services/APIService'
import Testimonials from '../Components/Testimonials'
import { Box } from '@mui/material'

const TestimonialPage = () => {

    const [testimonials, setTestimonials] = useState([])

    const getTestimonials = async () => {
        const response = await getAllTestimonials()
        setTestimonials(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getTestimonials()
    }, [])

    return (
        <>
            <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
                <Testimonials testimonials={testimonials} />
            </Box>
        </>
    )
}

export default TestimonialPage