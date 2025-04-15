import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Container, Paper } from '@mui/material';
import { getSlider } from '../Services/APIService';

const Carousel = () => {

	const [carouselItems, setCarouselItems] = useState([])

	const getSliderDetails = async () => {
		const response = await getSlider()
		setCarouselItems(response?.data[0])
		console.log(response?.data[0])
	}

	useEffect(() => {
		getSliderDetails()
	}, [])

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,  
		autoplaySpeed: 2000,
		pauseOnHover: true,
	};

	return (
		<Slider {...settings}>
			{carouselItems?.slideImages?.length > 0 && carouselItems.slideImages.map((item, index) => (
				<Box key={index} sx={{ padding: 2 }}>
					<Paper sx={{
						bgcolor: carouselItems.slideBarColor,
						height: '500px', display: 'flex',
						alignItems: 'center', justifyContent: 'center',
						overflow: 'hidden',
						borderRadius:"10px",
						border:"2px solid lightgray"
					}}>
						<img
							src={item}
							alt="slider"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'contain',
								borderRadius: 8
							}}
						/>
					</Paper>
				</Box>
			))}
		</Slider>

	);
};

export default Carousel;
