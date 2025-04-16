import { Box, Button, Card, CardMedia, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getPlacesNearby } from '../Services/APIService'
import { Link, useLocation } from 'react-router-dom'
import { useHostelTheme } from '../Services/HostelThemeContext'
import { SITE_URI } from './Navbar'

const PlacesNearBy = () => {
    const location = useLocation()
    const {menuBarColor} = useHostelTheme()
    const [nearbyPlaces, setNearByPlaces] = useState([])

    const getPlaces = async () => {
        const response = await getPlacesNearby()
        setNearByPlaces(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getPlaces()
    }, [])

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase"> Near By Places</Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Grid container spacing={3}>
                    {nearbyPlaces.map((place, index) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card
                                sx={{
                                    position: "relative",
                                    height: 250,
                                    overflow: "hidden",
                                    "&:hover .hover-details": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={place.placeImageUrl}
                                    alt={place.name}
                                    sx={{ height: "100%", objectFit: "cover" }}
                                />
                                <Box
                                    className="hover-details"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        bgcolor: "rgba(0, 0, 0, 0.6)",
                                        color: "white",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        opacity: 0,
                                        transition: "opacity 0.3s ease-in-out",
                                        px: 2,
                                    }}
                                >
                                    <Typography variant="h5" fontWeight="bold">
                                        {place.place}
                                    </Typography>
                                    {place.travelTime && (
                                        <Typography variant="subtitle1" mb={0.5}>({place.travelTime} minutes)</Typography>
                                    )}

                                    <Divider sx={{ backgroundColor: `${menuBarColor}`, width: "15%", height: "3px", }} />

                                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
                                        {place.placeName}
                                    </Typography>
                                    {place.distance && (
                                        <Typography variant="body1">Distance: {place.distance} km</Typography>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {
                (location.pathname === SITE_URI || location.pathname === SITE_URI+"/") && (
                    <Box textAlign="center" sx={{ padding: 2 }}>
                        <Button variant='contained' component={Link}
                            to={`${SITE_URI}/near-by-places`} sx={{ bgcolor: `${menuBarColor}`, padding: "12px 24px", fontSize: "16px", textTransform: "none" }}>View All Near By Places</Button>
                    </Box>
                )
            }
        </>
    )
}

export default PlacesNearBy