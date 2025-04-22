const validate = (formData, form="register") => {
    const newErrors = {};

    if(form === "register" || form === "profile"){
        if (!formData?.username.trim()) newErrors.username = 'First name is required';
        if (formData?.password !== formData?.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData?.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    }

    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
    }


    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
    }
   

    return newErrors;
    
};

export default validate