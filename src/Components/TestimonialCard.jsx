import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const TestimonialCard = ({ testimonial }) => {
    console.log(testimonial)
   return( 
   <Card sx={{ maxWidth: 400, p: 2, m: 1, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {testimonial.description}
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
                <Avatar
                    src={testimonial.testimonialImage}
                    alt={testimonial.testimonialName}
                    sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                    <Typography variant="body1" fontWeight="bold">
                        {testimonial.testimonialName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {testimonial.testimonialTitle}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>)
}


export default TestimonialCard