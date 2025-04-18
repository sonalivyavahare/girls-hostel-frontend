import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useHostelTheme } from '../Services/HostelThemeContext';

const RulesCard = ({ ruleId, ruleDescription }) => {
    const {menuBarColor} = useHostelTheme()
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 4,
                textAlign: 'center',
                width: '100%',
                height: '100%',
                transition: '0.3s',
                '&:hover .circle': {
                  backgroundColor: `${menuBarColor}`,
                  color: '#fff',
                },
            }}
        >
            <CardContent>
                <Box
                    className="circle"
                    sx={{
                        height: 60,
                        width: 60,
                        borderRadius: '50%',
                        border: `2px solid ${menuBarColor}`,
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: `${menuBarColor}`,
                        fontWeight: 'bold',
                        fontSize: 24,
                        mb: 2,
                        transition: '0.3s',
                    }}
                >
                    {ruleId}
                </Box>
                
                <Typography
                    sx={{
                        mt: 1,
                        color: '#555',
                        fontWeight: 500,
                    }}
                >
                    {ruleDescription}
                </Typography>
            </CardContent>
        </Card>)
};

export default RulesCard