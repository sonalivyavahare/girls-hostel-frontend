import React, { useEffect, useState } from 'react'
import Carousel from '../Components/Carousel'
import Facilities from '../Components/Facilities'
import { getAllTestimonials, getFacilities } from '../Services/APIService'
import PlacesNearBy from '../Components/PlacesNearBy'
import Testimonials from '../Components/Testimonials'

const Home = () => {
	const [facilities, setFacilities] = useState([])
	const [testimonials, setTestimonials] = useState([])

	const fetchFacilities = async () => {
		const response = await getFacilities()
		setFacilities(response.data)
	}

	const getTestimonials = async () => {
		const response = await getAllTestimonials()
		setTestimonials(response.data)
		console.log(response.data)
	}

	useEffect(() => {
		fetchFacilities()
		getTestimonials()
	}, [])
	return (
		<>
			<Carousel />
			<Facilities facilities={facilities.slice(0, 3)} />
			<PlacesNearBy />
			<Testimonials testimonials={testimonials.slice(0, 6)} />
		</>
	)
}

export default Home