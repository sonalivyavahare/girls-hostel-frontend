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
import { loginUser, registerUser } from '../../Services/APIService';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../../Services/ToastMessages';
import { SITE_URI } from '../Navbar';


export default function LoginForm() {
    const { menuBarColor } = useHostelTheme()

    const navigate = useNavigate();
    const initialState = {
        email: '',
        password: '',
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
        const formErrors = validate(formData, "login")
        setErrors(formErrors);
        console.log(Object.keys(formErrors))
        if (Object.keys(formErrors).length) return

        const response = await loginUser(formData)
        if (response?.data) {
            handleSuccess(response.data.message)
            navigate(`${SITE_URI}/profile`)
            sessionStorage.setItem("userToken", response.data.token)
            sessionStorage.setItem("userId", response.data.id)
            sessionStorage.setItem("formNumber", response.data.formNumber)
        }
        console.log(response?.data)
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
                        Sign in
                    </Typography>



                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {renderTextField('Email', 'email')}
                            {renderTextField('Password', 'password', "password")}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: menuBarColor }}

                            >
                                Sign In
                            </Button>
                        </Grid>
                        {/* <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button component={Link}
                                    to={`${SITE_URI}/register`} sx={{ textTransform: "none" }}>Not having an account? Sign up</Button>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
            </Paper>
            <ToastContainer />
        </Container>
    );
}