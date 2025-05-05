import axios from "axios";
import { handleError } from "./ToastMessages";
import { use } from "react";

// const API_URL = "http://localhost:9090"

const API_URL = "https://pjsofttech.in:29443"

const API_URI = `${API_URL}/public`
export const getMenuBar = async () => {
    try {
        return await axios.get(`${API_URI}/getAllHostelManuBars`)
    } catch (error) {
        console.error(error)
    }
}

export const getSlider = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getAllHostelSlideBars`)
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
    }
}

export const getFooter = async () => {
    try {
        return await axios.get(`${API_URI}/getAllHostelFooters`)
    } catch (error) {
        console.error(error)
    }
}

export const getFacilities = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getAllFacilities`)
    } catch (error) {
        console.error(error)
        return null;
    } finally {
        setLoading(false)
    }
}

export const getPlacesNearby = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/placesNearby/all`)
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
    }
}

export const getAllTestimonials = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getAllTestimonials`)
    } catch (error) {
        console.error(error)
        setLoading(false)
    } finally {
        setLoading(false)
    }
}

export const getAllRules = async () => {
    try {
        return await axios.get(`${API_URI}/getRuleById/getAllRules`)
    } catch (error) {
        console.error(error)
        return null
    } 
}

export const getAllPhotos = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getAllPhotos`)
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
    }
}

export const getContactInfo = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getAllHostelContacts`)
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
    }
}

export const getAboutUs = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getAllAboutUs`)
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
    }
}

export const getUrlMappings = async () => {
    try {
        return await axios.get(`${API_URI}/getAllHostelUrlMappings`)
    } catch (error) {
        console.error(error)
    }
}

export const getHostelPolicyByType = async (type) => {
    try {
        return await axios.get(`${API_URI}/getHostelPolicyByType/${type}`)
    } catch (error) {
        console.error(error)
    }
}

export const getQRCode = async () => {
    try {
        const response = await axios.get(`${API_URI}/generate-qrcode`, {
            responseType: "arraybuffer"
        })

        const image = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte), ""
            )
        );
        return image

    } catch (error) {
        console.log(error)
    }
}


export const registerUser = async (data) => {
    try {
        return await axios.post(`${API_URI}/hostelUsers/registerUser`, data)
    } catch (error) {
        handleError(error.response.data)
        console.log(error)
    }
}

export const loginUser = async (data) => {
    try {
        return await axios.post(`${API_URI}/hostelUsers/login`, data)
    } catch (error) {
        console.log(error)
    }
}

export const getDetails = async (userId) => {
    try {
        return await axios.get(`${API_URI}/hostelUsers/getHostelUserById/${userId}`)
    } catch (error) {
        console.log(error)
    }
}



export const getUserDetails = async () => {
    const userId = sessionStorage.getItem("userId")
    const userToken = sessionStorage.getItem("userToken")
    const headers = {
        Authorization: `Bearer ${userToken}`
    }
    try {
        return await axios.get(`${API_URL}/getPersonalInfoById/${userId}`, { headers })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (data, file, userId) => {
    const newData = new FormData();
    newData.append('fullName', data.fullName || "");
    // newData.append('email', data.email || "");
    newData.append('dateOfBirth', data.dateOfBirth || "");
    newData.append('age', data.age || "");
    newData.append('gender', data.gender || "");
    newData.append('maritalStatus', data.maritalStatus || "");
    newData.append('bloodGroup', data.bloodGroup || "");
    newData.append('religion', data.religion || "");
    newData.append('personalPhoto', file || "");

    const TOKEN = sessionStorage.getItem("userToken")
    const headers = {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
    };

    try {
        return await axios.put(`${API_URL}/updatePersonalInformation/${userId}`, newData, { headers })
    } catch (error) {
        console.log(error)
    }
}


export const getBookingDetails = async (formNumber) => {
    const userToken = sessionStorage.getItem("userToken")
    const headers = {
        Authorization: `Bearer ${userToken}`
    }
    return await axios.get(`${API_URL}/admissionForms/getAdmissionFormByFormNumber/formNumber/${formNumber}`, { headers })

}


export const getAllFloors = async () => {

    try {
        return await axios.get(API_URI + "/getAllFloors")
    } catch (e) {
        handleError()
    }
}

export const getAllRooms = async (floorId) => {
    try {
        return await axios.get(API_URI + `/getRoomsByFloor/${floorId}`)
    } catch (e) {
        handleError()
    }
}

export const getAllBeds = async (roomId) => {
    try {
        return await axios.get(API_URI + `/beds/getBedsByRoom/${roomId}`)
    } catch (e) {
        handleError()
    }
}


export const getRoomById = async (roomId) => {
    try {
        return await axios.get(API_URI + `/getRoomById/${roomId}`)
    } catch (e) {
        handleError()
    }
}

export const getBedById = async (bedId) => {
    try {
        return await axios.get(API_URI + `/beds/getBedById/${bedId}`)
    } catch (e) {
        handleError()
    }
}
