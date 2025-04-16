import React, { useEffect, useState } from 'react'
import TestimonialCard from './TestimonialCard';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useHostelTheme } from '../Services/HostelThemeContext';
import { getAllTestimonials } from '../Services/APIService';
import { Link, useLocation } from 'react-router-dom';
import { SITE_URI } from './Navbar';

const Testimonials = ({ testimonials = [], loading }) => {
    const { menuBarColor } = useHostelTheme()
    const location = useLocation()

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">WHAT PEOPLE SAY
                </Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ minHeight: "300px" }}>
                    <CircularProgress sx={{ color: menuBarColor }} />
                    <Typography variant='body1'>Loading Testimonials</Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {Array.isArray(testimonials) && testimonials.length > 0 && testimonials.map((testimonial, index) => (
                                <Grid item key={index} size={{ xs: 12, sm: 6, md: 4, }}>
                                    <TestimonialCard testimonial={testimonial} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {(location.pathname === SITE_URI || location.pathname === SITE_URI + "/") && (
                    <Box textAlign="center" sx={{ padding: 2 }}>
                        <Button variant='contained' component={Link}
                            to={`${SITE_URI}/testimonials`} sx={{ bgcolor: `${menuBarColor}`, padding: "12px 24px", fontSize: "16px", textTransform: "none" }}>View All Testimonials</Button>
                    </Box>
                    )}
                </>
            )}
        </>
    )
}

export default Testimonials