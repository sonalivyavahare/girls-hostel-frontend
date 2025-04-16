import React, { useEffect, useState } from 'react'
import RulesRegulations from '../Components/RulesRegulations'
import { Box } from '@mui/material'
import { fetchRulesAndReulations } from '../Services/APICalling'

const RulesAndRegulations = () => {
	const [rules, setRules] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function APICalling() {
			const ruleRes = await fetchRulesAndReulations(setLoading)
			setRules(ruleRes)
		}
		APICalling()
	}, [])
	return (
		<>
			<Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
				<RulesRegulations rules={rules} loading={loading} />
			</Box>
		</>
	)
}

export default RulesAndRegulations