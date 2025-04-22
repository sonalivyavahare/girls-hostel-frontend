import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getHostelPolicyByType } from '../Services/APIService'
import { useHostelTheme } from '../Services/HostelThemeContext'
import DOMPurify from 'dompurify'


const PrivacyPolicy = () => {
    const { menuBarColor } = useHostelTheme()
    const [policy, setPolicy] = useState("")

    const getPolicy = async () => {
        const response = await getHostelPolicyByType("Privacy Policy")
        const sanitizedContent = DOMPurify.sanitize(response?.data?.content)
        setPolicy(sanitizedContent)
    }

    useEffect(() => {
        getPolicy()
    }, [])
    return (
        <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: 2 }}>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, mr: 2 }} />
                <Typography variant="h3" fontSize="32px" fontWeight="bold" color={menuBarColor} textTransform="uppercase">
                    Privacy Policy
                </Typography>
                <Box sx={{ width: "15%", borderBottom: `4px solid ${menuBarColor}`, ml: 2 }} />
            </Box>

            <Box sx={{
                padding: 4,
                margin: '0 auto',
                maxWidth: '1200px',
                borderRadius: 2,
            }}>
                <div
                    dangerouslySetInnerHTML={{ __html: policy }}
                    style={{ lineHeight: '1.8', fontSize: '1rem' }}
                />
            </Box>
        </Box>
    )
}

export default PrivacyPolicy