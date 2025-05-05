import { Box, Typography, Card, CardContent, Grid, Divider, Chip, CardActions, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHostelTheme } from '../Services/HostelThemeContext';
import { getBookingDetails } from '../Services/APIService';
import AdmissionReceipt from '../Components/AdmissionReceipt';

const Bookings = () => {
    const { menuBarColor } = useHostelTheme();
    const [booking, setBooking] = useState(null);
    const [isFound, setIsFound] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function get() {
            const formNumber = sessionStorage.getItem("formNumber");
            try {
                const response = await getBookingDetails(formNumber);
                console.log(response?.data);
                setBooking(response?.data);
                setIsFound(true);
            } catch (error) {
                if (error.response?.status === 404) {
                    console.log("No bookings found");
                    setIsFound(false);
                }
            }
        }
        get();
    }, []);

    const handlePrint = () => {
        setOpen(true);
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ color: menuBarColor }} mb={3}>
                Booking Details
            </Typography>

            <Grid container spacing={4}>
                {/* Booking Summary */}
                <Grid item size={{ xs: 12, md: 4 }}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, }}>
                        <CardContent>
                            <Typography variant="h6">Booking Summary</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body1">Booking ID: {booking?.admissionId}</Typography>

                            <Chip
                                label={booking?.paymentStatus}
                                color={
                                    booking?.paymentStatus === 'Paid' ? 'success' :
                                        booking?.paymentStatus === 'Pending' ? 'warning' :
                                            'error'
                                }
                                sx={{ mt: 2 }}
                            />
                            <Typography variant="h6" mt={2}>₹ {booking?.totalAmount
                            }</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handlePrint}> Invoice </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Guest and Room Details */}
                <Grid item size={{ xs: 12, md: 8 }}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Student Information</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography>Name: {booking?.studentName}</Typography>
                            <Typography>Email: {booking?.email}</Typography>
                            <Typography>Phone: {booking?.mobileNo}</Typography>

                            <Box mt={3}>
                                <Typography variant="h6">Room Details</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography>Floor: {booking?.floor}</Typography>
                                <Typography>Room Type: {booking?.roomType}</Typography>
                                <Typography>Room Number: {booking?.roomNumber}</Typography>
                                <Typography>Bed Type: {booking?.bedType}</Typography>
                                <Typography>Bed: {booking?.bedNumber}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <AdmissionReceipt open={open} setOpen={setOpen} admissionData={booking} />
        </Box>
    );
};

export default Bookings;
