import axios from "axios";

const API_URL = "http://localhost:9090"

// const API_URL = "https://pjsofttech.in:29443"

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

export const getAllRules = async (setLoading) => {
    try {
        setLoading(true)
        return await axios.get(`${API_URI}/getRuleById/getAllRules`)
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
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