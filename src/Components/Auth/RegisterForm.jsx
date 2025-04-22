// src/components/auth/RegisterForm.js
import React, { useState } from 'react';
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
import validate from '../../Services/FormValidations';
import { useHostelTheme } from '../../Services/HostelThemeContext'
import { registerUser } from '../../Services/APIService';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../../Services/ToastMessages';
import { SITE_URI } from '../Navbar';
// import { SITE_URI } from './Navbar';


export default function RegisterForm() {
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
        const formErrors = validate(formData)
        setErrors(formErrors);
        console.log(Object.keys(formErrors).length)
        if (Object.keys(formErrors).length) return

        const response = await registerUser(formData)
        if (response?.data) {
            handleSuccess("User register successfully")
            navigate(`${SITE_URI}/login`)
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
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
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button component={Link}
                                    to={`${SITE_URI}/login`} sx={{ textTransform: "none" }}>
                                   Already have an account? Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
            <ToastContainer />
        </Container>
    );
}