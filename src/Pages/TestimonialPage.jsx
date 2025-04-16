import React, { useEffect, useState } from 'react'
import { getAllTestimonials } from '../Services/APIService'
import Testimonials from '../Components/Testimonials'
import { Box } from '@mui/material'
import { getTestimonials } from '../Services/APICalling'

const TestimonialPage = () => {

    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function get() {
            const response = await getTestimonials(setLoading)
            setTestimonials(response)
        }
        get()
    }, [])

    return (
        <>
            <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
                <Testimonials testimonials={testimonials} loading={loading} />
            </Box>
        </>
    )
}

export default TestimonialPage