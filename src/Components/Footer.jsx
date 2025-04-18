import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Divider, Grid } from '@mui/material';
import { Email, Facebook, Instagram, LocationOn, Phone, Twitter, WhatsApp, YouTube } from '@mui/icons-material'
import { getFacilities, getFooter } from '../Services/APIService';


const Footer = () => {
    const [footer, setFooter] = useState({});
    const [facilities, setFacilities] = useState({})
    const [loading, setLoading] = useState(false)

    const fetchFooter = async () => {
        const response = await getFooter()
        setFooter(response.data[0])
        console.log(response.data)
    }

    const fetchFacilities = async () => {
        const response = await getFacilities(setLoading)
        setFacilities(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        fetchFooter()
        fetchFacilities()
    }, [])

    return (
        <Box sx={{ bgcolor: footer.footerColor, color: "#fff", paddingTop: "40px", paddingBottom: "40px" }}>
            <Grid container spacing={2} className="textField-root">
                <Grid item size={{ xs: 12, md: 8 }} >
                    <Typography variant="h5" sx={{ marginBottom: "20px", textAlign: "center" }} >
                        <b>Facilities</b>
                    </Typography>
                    <Divider sx={{ backgroundColor: "white", width: "100%", margin: "20px auto" }} />
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {facilities.length > 0 &&
                                facilities.map((facility, index) => (
                                    <Grid item size={{ xs: 12, md: 4 }} key={index}>
                                        <Typography variant="body1" sx={{ textAlign: "center" }}>
                                            {facility.facilityName ?? ""}
                                        </Typography>
                                    </Grid>
                                ))}
                        </Grid>

                    </Box>
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }} >
                    <Typography variant="h5" sx={{ marginBottom: "20px", textAlign: "center" }} >
                        <b> Contact Us</b>
                    </Typography>
                    <Divider sx={{ backgroundColor: "white", width: "100%", margin: "20px auto" }} />
                    <Box mt={2} textAlign="left">
                        <Typography variant="body1">
                            <LocationOn sx={{ color: "red", verticalAlign: "middle", marginRight: "10px" }} /> {footer.address}
                        </Typography>
                        <Typography variant="body1" mt={1}>
                            <Email sx={{ color: "orange", verticalAlign: "middle", marginRight: "10px" }} /> {footer.email}
                        </Typography>
                        <Typography variant="body1" mt={1} >
                            <Phone sx={{ color: "green", verticalAlign: "middle", marginRight: "12px" }} />
                            {footer.mobileNumber}</Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* Social Media Icons */}
            <Grid container justifyContent="center" alignItems="center" mt={3}>
                <IconButton href={footer.instagramLink} sx={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                    <Instagram sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton href={footer.facebookLink} sx={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                    <Facebook sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton href={footer.twitterLink} sx={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                    <Twitter sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton href={footer.youtubeLink} sx={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                    <YouTube sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton href={footer.whatsappLink} sx={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                    <WhatsApp sx={{ fontSize: 32 }} />
                </IconButton>
            </Grid>

            <Divider sx={{ backgroundColor: "white", width: "100%", margin: "20px auto" }} />


            <Grid container justifyContent="center" alignItems="center" mt={3}>
                <Grid item size={{ xs: 12, md: 6 }} >
                    <Typography variant="body1" align="center" sx={{ color: 'white' }}>
                        Copyright© {new Date().getFullYear()}. All rights reserved.
                    </Typography>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                            Made with ❤️ by
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                            PJSOFTTECH
                        </Typography>
                        <img
                            src="/logo.jpg"
                            alt="PJSOFTTECH Logo"
                            style={{ height: '15px' }}
                        />
                    </Box>

                    
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
