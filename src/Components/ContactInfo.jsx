import React, { useEffect, useState } from 'react'
import { getContactInfo, getQRCode } from '../Services/APIService'
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import { useHostelTheme } from '../Services/HostelThemeContext'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';


const ContactInfo = () => {
    const { menuBarColor } = useHostelTheme()
    const [contactInfo, setContactInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [barcodeImage, setBarcodeImage] = useState("")

    const fetchContactInfo = async () => {
        const response = await getContactInfo(setLoading)
        if (response?.data) {
            console.log(response.data[0])
            setContactInfo(response?.data[0])
        }
    }

    const fetchBarcodeImage = async () => {
        const image = await getQRCode()
        setBarcodeImage(`data:image/png;base64,${image}`)
    }

    useEffect(() => {
        fetchContactInfo()
        fetchBarcodeImage()
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

            <Box sx={{ py: 4 }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                    Scan QR code for Enquiry
                                </Typography>
                                <img src={barcodeImage} alt="QR Code" style={{ width: "100%" }} />
                                <Button
                                    component="a"
                                    href="https://pjsofttech.in/juii_girls_hostel_enquiryform/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    OR Click Here
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
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
            )
            }
        </>
    )
}

export default ContactInfo