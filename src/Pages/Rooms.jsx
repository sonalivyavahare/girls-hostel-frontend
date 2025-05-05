import { useEffect, useState } from "react";
import { getAllBeds, getAllFloors, getAllRooms } from "../Services/APIService";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useHostelTheme } from "../Services/HostelThemeContext";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
    const { menuBarColor } = useHostelTheme();
    const navigate = useNavigate();
    const [floors, setFloors] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const floorResponse = await getAllFloors();
            const fetchedFloors = floorResponse?.data || [];
            setFloors(fetchedFloors);

            const allRooms = [];
            for (const floor of fetchedFloors) {
                const roomResponse = await getAllRooms(floor?.floorId);
                if (roomResponse?.data) {
                    allRooms.push(...roomResponse.data);
                }
            }
            setRooms(allRooms);

            const allBeds = [];
            for (const room of allRooms) {
                const bedResponse = await getAllBeds(room?.roomId);
                if (bedResponse?.data) {
                    allBeds.push(...bedResponse.data);
                }
            }
            console.log(allBeds)
            setBeds(allBeds);
        };

        fetchData();
    }, []);

    const handleBook = (roomId) => () => {
        navigate(`/hostel/website/rooms/book/${roomId}`);
    }

    return (
        <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">
                    Rooms
                </Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            <Box sx={{ flexGrow: 1, paddingLeft: 4, paddingRight: 4, margin: '0 auto',  }}>
                {floors.map((floor) => (
                    <Box key={floor.floorId} >
                        <Typography variant="body1" fontWeight={"bold"} sx={{ marginBottom: 1, marginTop: 2 }}>
                            {floor.floorName}
                        </Typography>

                        <Grid container spacing={2}>
                            {rooms
                                .filter(room => room.floor.floorId === floor.floorId)
                                .map((room) => {
                                    const roomBeds = beds.filter(bed => bed.room.roomId === room.roomId);
                                    const allBedsBooked = roomBeds.length > 0 && roomBeds.every(bed => bed.allocated);

                                    return (
                                        <Grid item key={room.roomId}  size={{ xs: 12, sm: 6, md: 2 }}>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "120px",
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    color: 'black',
                                                    boxShadow: allBedsBooked
                                                        ? '0px 4px 10px rgba(255, 0, 0, 0.5)'
                                                        : '0px 4px 10px rgba(0, 128, 0, 0.5)',
                                                    padding: 2,
                                                    borderRadius: 2,
                                                    backgroundColor: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Room {room.roomNumber}

                                                {allBedsBooked ? (
                                                    <Typography variant="body2" color="red" fontWeight="bold" sx={{ marginTop: 2 }}>
                                                        Room Full
                                                    </Typography>
                                                ) : (
                                                    <Button 
                                                        color="success"
                                                        sx={{ marginTop: 1, textTransform: 'none' }}
                                                        onClick={handleBook(room.roomId)} // Assuming you have a function to handle booking
                                                    >   Book Now</Button>
                                                
                                                 )}
                                            </Box>

                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </Box>
                ))}
            </Box>

        </Box>
    );
};

export default Rooms;
