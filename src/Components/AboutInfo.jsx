import React, { useEffect, useState } from 'react'
import { useHostelTheme } from '../Services/HostelThemeContext'
import { getAboutUs } from '../Services/APIService'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'

const AboutInfo = () => {
    const { menuBarColor } = useHostelTheme()
    const [aboutUs, setAboutUs] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchAboutUs = async () => {
        const response = await getAboutUs(setLoading)
        setAboutUs(response?.data[0])
        console.log(response?.data[0])
    }

    useEffect(() => {
        fetchAboutUs()
    }, [])

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">About Us</Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ minHeight: "300px" }}>
                    <CircularProgress sx={{ color: menuBarColor }} />
                    <Typography variant='body1'>Loading About Us</Typography>
                </Box>
            ) : aboutUs ? (
                <Box sx={{ py: 4, px: 2 }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item size={{xs:12, md:6}}>
                            <Typography variant='body1'>{aboutUs.description}</Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:6}}>
                            <img src={aboutUs.aboutUsImage} alt="About Us" style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Typography variant='body1' align='center'>No About Us data found.</Typography>
            )}
        </>
    )
}

export default AboutInfo
