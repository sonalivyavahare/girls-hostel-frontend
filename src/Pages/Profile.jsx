import React, { use, useEffect, useState } from 'react';
import {
    Avatar, Box, Button, Divider, IconButton, MenuItem,
    TextField, Typography, useMediaQuery
} from '@mui/material';
import { Settings, Logout, Person } from '@mui/icons-material';
import ProfileManager from '../Components/ProfileManager';
import Bookings from './Bookings';
import { useTheme } from '@mui/material/styles';
import { SITE_URI } from '../Components/Navbar';
import { getUserDetails, updateProfile } from '../Services/APIService';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../Services/ToastMessages';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/64');
    const [selectedSection, setSelectedSection] = useState('MyProfile');

    const [user, setUser] = useState({});

    const fetchUserData = async () => {
        const response = await getUserDetails()
        console.log(response?.data)
        setUser(response?.data)
    }

    useEffect(() => {
        fetchUserData()
    }, [])



    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAvatarClick = () => {
        document.getElementById('avatarInput').click();
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const result = reader.result;
                setAvatarUrl(result);
                const updatedUser = {
                    ...user,
                    personalPhoto: result,
                };
                setUser(updatedUser);

                // ✅ API Call to update avatar on server
                try {
                    const response = await updateProfile(updatedUser, file, user.personalInfoId);
                    if (response.status === 200) { 
                        handleSuccess("Profile Photo Updated")
                     }

                    console.log("Avatar updated:", response.data);
                } catch (error) {
                    console.error("Failed to update avatar:", error);
                    // You can show an error toast/snackbar here
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const handleLogout = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userId');
        navigate(`${SITE_URI}/login`);
    };

    const renderSection = () => {
        switch (selectedSection) {
            case 'MyProfile':
                return <ProfileManager editMode={editMode}
                    setEditMode={setEditMode}
                    avatarUrl={avatarUrl}
                    user={user}
                    setUser={setUser}
                />;
            case 'Bookings':
                return <Bookings />;
            default:
                return <ProfileManager editMode={editMode} setEditMode={setEditMode} avatarUrl={avatarUrl} user={user} setUser={setUser} />;
        }
    };

    return (
        <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            gap={4}
            p={isMobile ? 2 : 4}
            justifyContent="center"
            alignItems={isMobile ? 'center' : 'flex-start'}
        >
            {/* Sidebar */}
            <Box
                bgcolor="white"
                borderRadius={3}
                p={2}
                width={isMobile ? '100%' : 250}
                boxShadow={3}
            >
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar
                        sx={{ width: 64, height: 64, cursor: 'pointer' }}
                        src={user?.personalPhoto || avatarUrl}
                        onClick={handleAvatarClick}
                    />
                    <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                    <Typography variant="subtitle1" mt={1}>{user.fullName}</Typography>
                    <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                </Box>
                <Divider />
                <Box mt={2}>
                    <MenuItem
                        selected={selectedSection === 'MyProfile'}
                        onClick={() => setSelectedSection('MyProfile')}>
                        <Person sx={{ mr: 1 }} /> My Profile
                    </MenuItem>
                    <MenuItem
                        selected={selectedSection === 'Bookings'}
                        onClick={() => setSelectedSection('Bookings')}>
                        <Settings sx={{ mr: 1 }} /> Bookings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 1 }} /> Log Out
                    </MenuItem>
                </Box>
            </Box>

            {/* Main Content */}
            <Box
                bgcolor="white"
                borderRadius={3}
                p={4}
                width={isMobile ? '100%' : 800}
                boxShadow={3}
            >
                {renderSection()}
            </Box>

            <ToastContainer />
        </Box>
    );
};

export default Profile;
