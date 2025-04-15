import React from 'react';
import { Card, CardMedia, Box, Typography } from '@mui/material';
import { useHostelTheme } from '../Services/HostelThemeContext';

const FacilityCard = ({ image, title, description }) => {
    const {menuBarColor} = useHostelTheme()
    return (
        <Card
            sx={{
                position: 'relative',
                width: 385,
                height: 350,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 4,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                '&:hover .overlay': {
                    opacity: 0.9,
                },
                '&:hover .title-box': {
                    opacity: 0,
                },
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <Box
                 className="title-box"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: menuBarColor,
                    opacity: 0.7,
                    color: 'white',
                    p: 2,
                    textAlign: 'center',
                    zIndex: 2, // Make sure it's above the image but under the hover overlay
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
            </Box>

            <Box
                className="overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: menuBarColor,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant="body1" mt={1}>
                    {description}
                </Typography>
            </Box>
        </Card>
    );
};

export default FacilityCard;
