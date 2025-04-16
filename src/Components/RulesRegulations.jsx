import React, { useEffect, useState } from 'react'
import RulesCard from './RulesCard';
import { getAllRules } from '../Services/APIService';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useHostelTheme } from '../Services/HostelThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { SITE_URI } from './Navbar';

const RulesRegulations = ({rules, loading}) => {
    const { menuBarColor } = useHostelTheme()
    const location = useLocation()

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">Rules and Regulations
                </Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ minHeight: "300px" }}>
                    <CircularProgress sx={{ color: menuBarColor }} />
                    <Typography variant='body1'>Loading Rules</Typography>
                </Box>
            ) : (
                <Box sx={{ px: 2, py: 2, background: '#fff' }}>
                    <Grid container spacing={4}>
                        {rules.map((rule) => (
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={rule.ruleId}>
                                <RulesCard {...rule} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {
                (location.pathname === SITE_URI || location.pathname === SITE_URI + "/") && (
                    <Box textAlign="center" sx={{ padding: 2 }}>
                        <Button variant='contained' component={Link}
                            to={`${SITE_URI}/rules-regulations`} sx={{ bgcolor: `${menuBarColor}`, padding: "12px 24px", fontSize: "16px", textTransform: "none" }}>View All Rules</Button>
                    </Box>
                )
            }
        </>
    );
}

export default RulesRegulations