import React from 'react';
import { Grid, Card, CardMedia, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useHostelTheme } from '../Services/HostelThemeContext';
import { SITE_URI } from './Navbar';
import { Link, useLocation } from 'react-router-dom';

const GallaryCard = ({images, loading}) => {
    const location = useLocation()
    const {menuBarColor} = useHostelTheme()

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">Gallery
                </Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ minHeight: "300px" }}>
                    <CircularProgress sx={{ color: menuBarColor }} />
                    <Typography variant='body1'>Loading Gallery</Typography>
                </Box>
            ) : (
            <Grid container spacing={3} sx={{ px: 2, py: 3 }}>
                {images.map((img, index) => (
                    <Grid item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 3,
                                boxShadow: 3,
                                cursor: 'pointer',
                                '&:hover .caption': {
                                    bottom: 0,
                                    opacity: 1,
                                },
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                                transition: '0.3s',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                image={img.imageUrl}
                                alt={`Gallery Image ${index + 1}`}
                                sx={{
                                    transition: 'transform 0.4s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            />

                            <Box
                                className="caption"
                                sx={{
                                    position: 'absolute',
                                    bottom: '-100%',
                                    left: 0,
                                    right: 0,
                                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                                    color: '#fff',
                                    px: 2,
                                    py: 3,
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    opacity: 0,
                                }}
                            >
                                <Typography variant="body1">{img.description}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            ) }

            {
                (location.pathname === SITE_URI || location.pathname === SITE_URI + "/") && (
                    <Box textAlign="center" sx={{ padding: 2 }}>
                        <Button variant='contained' component={Link}
                            to={`${SITE_URI}/gallary`} sx={{ bgcolor: `${menuBarColor}`, padding: "12px 24px", fontSize: "16px", textTransform: "none" }}>View Gallery</Button>
                    </Box>
                )
            }
        </>
    );
}

export default GallaryCard