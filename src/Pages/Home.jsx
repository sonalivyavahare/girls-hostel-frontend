import React, { useEffect, useState } from 'react'
import Carousel from '../Components/Carousel'
import Facilities from '../Components/Facilities'
import PlacesNearBy from '../Components/PlacesNearBy'
import Testimonials from '../Components/Testimonials'
import RulesRegulations from '../Components/RulesRegulations'
import GallaryCard from '../Components/GallaryCard'
import { fetchFacilities, fetchRulesAndReulations, getImages, getPlaces, getTestimonials } from '../Services/APICalling'
import ContactInfo from '../Components/ContactInfo'

const Home = () => {
	const [loading, setLoading] = useState(false)
	const [facilities, setFacilities] = useState([])
	const [testimonials, setTestimonials] = useState([])
	const [places, setPlaces] = useState([])
	const [images, setImages] = useState([])
	const [rules, setRules] = useState([])

	useEffect(() => {
		async function APICalling() {
			const facilityRes = await fetchFacilities(setLoading)
			setFacilities(facilityRes)

			const testimonialRes = await getTestimonials(setLoading)
			setTestimonials(testimonialRes)

			const placeResponse = await getPlaces(setLoading)
			setPlaces(placeResponse)

			const galleResponse = await getImages(setLoading)
			setImages(galleResponse)

			const ruleRes = await fetchRulesAndReulations(setLoading)
			setRules(ruleRes)
		}
		APICalling()
	}, [])
	
	return (
		<>
			<Carousel />
			<Facilities facilities={facilities.slice(0, 3)} loading={loading} />
			<PlacesNearBy nearbyPlaces={places.slice(0, 3)} loading={loading}/>
			<Testimonials testimonials={testimonials.slice(0, 3)} loading={loading} />
			<GallaryCard images={images.slice(0, 6)} loading={loading} />
			<RulesRegulations rules={rules.slice(0, 6)} loading={loading} />
			<ContactInfo />
		</>
	)
}

export default Home