import React, { useEffect, useState } from 'react'
import { getContactInfo } from '../Services/APIService'
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import { useHostelTheme } from '../Services/HostelThemeContext'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


const ContactInfo = () => {
    const { menuBarColor } = useHostelTheme()
    const [contactInfo, setContactInfo] = useState({})
    const [loading, setLoading] = useState(false)

    const fetchContactInfo = async () => {
        const response = await getContactInfo(setLoading)
        if (response?.data) {
            console.log(response.data[0])
            setContactInfo(response?.data[0])
        }
    }

    useEffect(() => {
        fetchContactInfo()
    }, [])

    const cardData = [
        {
            icon: <LocationOnIcon sx={{ fontSize: 50, color: menuBarColor }} />,
            title: contactInfo.hostelName,
            details: [contactInfo.address]
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 50, color: menuBarColor }} />,
            title: 'Contact',
            details: [contactInfo.contactPerson, contactInfo.phoneNumber]
        },
        {
            icon: <EmailIcon sx={{ fontSize: 50, color: menuBarColor }} />,
            title: 'Email',
            details: [contactInfo.email]
        }
    ];


    return (
        <>

            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">Contact Us</Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ minHeight: "300px" }}>
                    <CircularProgress sx={{ color: menuBarColor }} />
                    <Typography variant='body1'>Loading Contact</Typography>
                </Box>
            ) : cardData && (
                <>
                    <Box sx={{ py: 4 }}>
                        <Grid container spacing={3} justifyContent="center">
                            {cardData.map((item, index) => (
                                <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                    <Card sx={{ textAlign: 'center', py: 4, height: '100%' }}>
                                        <CardContent>
                                            {item.icon}
                                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                                {item.title}
                                            </Typography>
                                            {item.details.map((line, i) => (
                                                <Typography key={i} variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                    {line}
                                                </Typography>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Grid container spacing={3} sx={{ px: 2, py: 3 }} >
                        <Grid item size={{ xs: 12, md: 12 }}>
                            <iframe
                                src={contactInfo.hostelMapUrl &&
                                    new DOMParser()
                                        .parseFromString(contactInfo.hostelMapUrl, "text/html")
                                        .querySelector("iframe")?.src
                                }
                                title="Location map for our hostel"
                                width="100%"
                                height="450"
                                style={{ border: "1px solid black" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}

export default ContactInfo