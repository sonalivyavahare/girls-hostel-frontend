import axios from "axios";

const API_URL = "http://localhost:9090"

export const getMenuBar = async () => {
    try {
        return await axios.get(`${API_URL}/getAllHostelManuBars`)
    } catch (error) {
        console.error(error)
    }
}

export const getSlider = async () => {
    try {
        return await axios.get(`${API_URL}/getAllHostelSlideBars`)
    } catch (error) {
        console.error(error)
    }
}

export const getFooter = async () => {
    try {
        return await axios.get(`${API_URL}/getAllHostelFooters`)
    } catch (error) {
        console.error(error)
    }
}

export const getFacilities = async () => {
    try {
        return await axios.get(`${API_URL}/getAllFacilities`)
    } catch (error) {
        console.error(error)
    }
}

export const getPlacesNearby = async () => {
    try {
        return await axios.get(`${API_URL}/placesNearby/all`)
    } catch (error) {
        console.error(error)
    }
}

export const getAllTestimonials = async () => {
    try {
        return await axios.get(`${API_URL}/hostel-testimonials/getAllTestimonials`)
    } catch (error) {
        console.error(error)
    }
}