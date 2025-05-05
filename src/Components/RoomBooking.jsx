import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useHostelTheme } from '../Services/HostelThemeContext'
import { getBedById, getRoomById } from '../Services/APIService'
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import BedIcon from '@mui/icons-material/Bed';


const RoomBooking = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { menuBarColor } = useHostelTheme()
    const [room, setRoom] = useState([])
    const [selectedBed, setSelectedBed] = useState(null)

    const getRoom = async () => {
        const response = await getRoomById(id)
        if (response?.data) {
            setRoom(response.data)
        }
        console.log(response?.data)
    }

    useEffect(() => {
        getRoom()
    }, [id])

    const handleBedClick = async(bed) => {
        if (!bed.allocated) {
            setSelectedBed(bed)
        }
    }

    const handleBooking = async () => {
        const response = await getBedById(selectedBed.bedId)
        console.log(response?.data)
    }

    return (
        <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
            {/* <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">
                    Room Booking
                </Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box> */}

            <Box
                sx={{
                    width: 350,
                    height: "auto",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'black',
                    boxShadow: 2,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    fontWeight: 'bold',
                    margin: '0 auto',
                    padding: 4,
                }}
            >

                <Typography variant="h4" fontWeight="bold" color={menuBarColor} textTransform="uppercase">
                    Room Booking
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 4 }}>
                    Book your room now!
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body1" fontWeight="bold" color={menuBarColor}>
                        Floor: {room?.floor?.floorName}
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body1" fontWeight="bold" color={menuBarColor}>
                        Room Number: {room?.roomNumber}
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Box
                        className="beds"
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px 20px",
                            // border: "1px solid #ccc",
                            // padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                    >

                        {room.beds?.length > 0 && room.beds.map((bed) => {
                            const isSelected = selectedBed?.bedId === bed.bedId
                            return (
                                <IconButton
                                    title={bed.bedNumber}
                                    key={bed.bedId}
                                    onClick={() => handleBedClick(bed)}
                                    disabled={bed.allocated}
                                    sx={{
                                        color: bed.allocated
                                            ? "#ef9a9a"
                                            : selectedBed?.bedId === bed.bedId
                                                ? "#1976d2"
                                                : "#a5d6a7",
                                        backgroundColor: selectedBed?.bedId === bed.bedId ? "#e3f2fd" : "transparent",
                                        border: selectedBed?.bedId === bed.bedId ? "2px solid #1976d2" : "1px solid transparent",
                                        borderRadius: '8px',
                                        transition: "all 0.2s ease-in-out",
                                        '&:hover': {
                                            backgroundColor: bed.allocated ? 'transparent' : '#f5f5f5',
                                        },
                                    }}
                                >
                                    {bed.bedType === "Single"
                                        ? <AirlineSeatFlatIcon sx={{ fontSize: 32 }} />
                                        : <BedIcon sx={{ fontSize: 32 }} />}
                                </IconButton>

                            )
                        })}
                    </Box>
                </Box>

                {selectedBed && (
                    <Box sx={{ marginTop: 2 }}>
                        <Button
                            style={{
                                backgroundColor: menuBarColor,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                            onClick={handleBooking}
                        >
                            Book Now
                        </Button>
                    </Box>
                )}

                <Box sx={{ marginTop: 4 }}>
                    <Button onClick={() => { navigate('/hostel/website/rooms') }} >
                        Back to Rooms
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default RoomBooking