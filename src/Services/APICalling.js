import { getAllPhotos, getAllRules, getAllTestimonials, getFacilities, getPlacesNearby } from "./APIService"

export const getTestimonials = async (setLoading) => {
    const response = await getAllTestimonials(setLoading)
    return response?.data
}

export const fetchFacilities = async (setLoading) => {
    const response = await getFacilities(setLoading)
    return response?.data
}

export const getPlaces = async (setLoading) => {
    const response = await getPlacesNearby(setLoading)
    return response?.data
}

export const getImages = async (setLoading) => {
    const response = await getAllPhotos(setLoading)
    return response?.data
}

export const fetchRulesAndReulations = async (setLoading) => {
    const response = await getAllRules(setLoading)
    return response?.data
}