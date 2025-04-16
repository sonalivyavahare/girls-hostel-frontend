import React, { useEffect, useState } from 'react'
import FacilityCard from './FacilityCard';
import { Box, Button, Grid, Typography } from '@mui/material';
import { getFacilities } from '../Services/APIService';
import { Link, useLocation } from 'react-router-dom';
import { useHostelTheme } from '../Services/HostelThemeContext';
import { SITE_URI } from './Navbar';

const Facilities = ({ facilities }) => {
    const location = useLocation()
    const { menuBarColor } = useHostelTheme()
    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">Our Facilities</Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={4} justifyContent="start">
                    {facilities.length > 0 && facilities.map((f, index) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <FacilityCard
                                image={f.facilityImageUrl}
                                title={f.facilityName}
                                description={f.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {
                (location.pathname === SITE_URI || location.pathname === SITE_URI + "/") && (
                    <Box textAlign="center" sx={{ padding: 2 }}>
                        <Button variant='contained' component={Link}
                            to={`${SITE_URI}/facilities`} sx={{ bgcolor: `${menuBarColor}`, padding: "12px 24px", fontSize: "16px", textTransform: "none" }}>View All Facilities</Button>
                    </Box>
                )
            }

        </>


    )
}

export default Facilities