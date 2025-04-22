// src/components/auth/RegisterForm.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Grid,
    Avatar,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import validate from '../Services/FormValidations';
import { getDetails, registerUser, updateProfile } from '../Services/APIService';
import { SITE_URI } from '../Components/Navbar';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../Services/ToastMessages';
import { useHostelTheme } from '../Services/HostelThemeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
    const { menuBarColor } = useHostelTheme()

    const navigate = useNavigate();
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
    }
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState(null)


    const getUserDetails = async () => {
        const userId = sessionStorage.getItem("userId")
        setUserId(userId)
        const response = await getDetails(userId)
        console.log(response?.data)
        setFormData(prev => ({
            ...prev,
            username: response?.data?.username || '',
            email: response?.data?.email || '',
            mobileNumber: response?.data?.mobileNumber || '',
        }));
    }

    useEffect(()=>{
        getUserDetails()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors({ ...errors, [name]: "" })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate(formData, "profile")
        setErrors(formErrors);
        console.log(Object.keys(formErrors))
        if (Object.keys(formErrors).length) return

        const response = await updateProfile(formData, userId)
        if (response?.data) {
            handleSuccess("User profile updated")
            //navigate(`${SITE_URI}/login`)
        }
        console.log(response.data)
    };

    const renderTextField = (label, name, type = "text", multiline = false, rows = 1) => (
        <Grid item size={{ xs: 12 }}>
            <TextField
                fullWidth
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type={type}
                multiline={multiline}
                rows={rows}
                error={!!errors[name]}
                helperText={errors[name]}
            />
        </Grid>
    );


    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, my: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: menuBarColor }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                       Edit Profile
                    </Typography>



                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {renderTextField('User Name', 'username')}
                            {renderTextField('Email', 'email')}
                            {renderTextField('Password', 'password', "password")}
                            {renderTextField('Confirm Password', 'confirmPassword', "password")}
                            {renderTextField('Mobile Number', 'mobileNumber')}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: menuBarColor }}

                            >
                                Update Profile
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
            <ToastContainer />
        </Container>
    );
}