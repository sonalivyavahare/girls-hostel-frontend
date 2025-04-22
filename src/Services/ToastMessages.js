import { toast } from "react-toastify";

export const handleSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
        closeOnClick: true,
        autoClose: 3000,
        closeButton: false
    });
}

export const handleError = (msg="") => {
    toast.error(msg ? msg : "Error submitting form. Please try again.", {
        position: 'top-right',
        closeOnClick: true,
        autoClose: 1000,
        closeButton: false
    });
}
