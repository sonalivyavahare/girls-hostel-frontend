import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { getSlider } from '../Services/APIService';
import { useHostelTheme } from '../Services/HostelThemeContext';

const Carousel = () => {
	const { menuBarColor } = useHostelTheme()
	const [carouselItems, setCarouselItems] = useState([])
	const [loading, setLoading] = useState(false)

	const getSliderDetails = async () => {
		const response = await getSlider(setLoading)
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
		<>

			{
				loading ? (
					<Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ minHeight: "300px" }} >
						<CircularProgress sx={{ color: menuBarColor }} />
						<Typography variant='body1'>Loading Slides</Typography>
					</Box >
				) : (

					<Box sx={{ overflowX: 'hidden' }}>
						<Slider {...settings} >
							{carouselItems?.slideImages?.length > 0 && carouselItems.slideImages.map((item, index) => (
								<Box key={index} sx={{ padding: 2 }}>
									<Paper sx={{
										bgcolor: carouselItems.slideBarColor,
										height: '380px', display: 'flex',
										alignItems: 'center', justifyContent: 'center',
										overflow: 'hidden',
										borderRadius: "10px",
										border: "2px solid lightgray"
									}}>
										<img
											src={item}
											alt="slider"
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												borderRadius: 8
											}}
										/>
									</Paper>
								</Box>
							))

							}
						</Slider>
					</Box>
				)
			}
		</>

	);
};

export default Carousel;
