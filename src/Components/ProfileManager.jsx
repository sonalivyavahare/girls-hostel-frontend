import { Avatar, Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import { Settings, Logout, Notifications, Person, Edit } from '@mui/icons-material';
import React from 'react'
import { updateProfile } from '../Services/APIService';
import { handleSuccess } from '../Services/ToastMessages';

const ProfileManager = ({ editMode, setEditMode, avatarUrl, user, setUser }) => {

    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateProfile(user, user.personalPhoto, user.personalInfoId)
        if (response?.status === 200) {
            handleSuccess("Profile updated successfully")
            setEditMode(false)
        }
        console.log(response?.data)
    }
    return (
        <>

            <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ width: 64, height: 64, mr: 2 }} src={user?.personalPhoto || avatarUrl} />
                <Box>
                    <Typography variant="h6">{user.fullName}</Typography>
                    <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                </Box>
                <IconButton sx={{ ml: 'auto' }} onClick={() => setEditMode(!editMode)}>
                    <Edit fontSize="small" />
                </IconButton>
            </Box>
            <Divider />
            <Box mt={3}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        name='fullName'
                        label="Full Name"
                        placeholder="Add name"
                        margin="normal"
                        value={user?.fullName}
                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                        InputProps={{ readOnly: !editMode }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        name='email'
                        value={user?.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Add email"
                        margin="normal"
                        InputProps={{ readOnly: !editMode }}
                        InputLabelProps={{ shrink: true }}
                    />

                    {editMode && (
                        <Button type='submit' variant="contained" sx={{ mt: 3 }}>
                            Save Change
                        </Button>
                    )}

                </form>
            </Box>
        </>
    )
}

export default ProfileManager