import React, { useRef, useState } from 'react';
import { Modal, Box, Typography, Button, Grid, Table, TableBody, TableCell, TableRow, Divider } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { getAllRules } from '../Services/APIService';
// import { getRules } from '../services/RulesRegulationsAPIService';

const ReceiptContent = React.forwardRef(({ receipt, rules, showRules }, ref) => (
	<Box
		ref={ref}
		sx={{
			width: 800,
			bgcolor: 'background.paper',
			p: 4,
		}}
	>
		<Typography variant="h5" align="center" color="purple" gutterBottom fontWeight="bold">
			Jui Hostel
		</Typography>

		<Grid container spacing={2} mb={2}>
			<Grid item size={{xs:6}}>
				<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Student</Typography>
				<Typography>{receipt.student.name}</Typography>
				<Typography>{receipt.student.mobile}</Typography>
				<Typography>{receipt.student.email}</Typography>
			</Grid>
			<Grid item size={{xs:6}} textAlign={"right"}>
				<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Organization</Typography>
				<Typography>{receipt.org.email}</Typography>
				<Typography>{receipt.org.address}</Typography>
				<Typography>{receipt.org.phone}</Typography>
			</Grid>
		</Grid>

		<Divider sx={{ borderColor: 'purple', borderWidth: 3 }} />

		<Box sx={{ bgcolor: '#f3e5f5', color: 'black', p: 1.5, display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 600 }}>
			<span>Invoice No: {receipt.invoiceNo}</span>
			<span>Admission Receipt</span>
			<span>Invoice Date: {receipt.invoiceDate}</span>
		</Box>

		<Divider sx={{ borderColor: 'purple', borderWidth: 1.5 }} />

		<Table size="small">
			<TableBody>
				{receipt.details.map(([label, value]) => (
					<TableRow key={label}>
						<TableCell sx={{ fontWeight: 600 }}>{label}</TableCell>
						<TableCell>{value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>

		<Divider sx={{ borderColor: 'purple', borderWidth: 1.5 }} />

		{showRules && (
			<>
				<Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
					Rules and Regulations:
				</Typography>
				{rules.map((rule) => (
					<Typography key={rule.ruleId} variant="body2" sx={{ display: "flex", alignItems: "flex-start", mt: 1, ml: 2 }}>
						<span style={{ fontWeight: "bold", marginRight: 6 }}>{rule.ruleId}.</span>
						{rule.ruleDescription}
					</Typography>
				))}
			</>
		)}

		<Typography variant='body1' color='red' sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }}>
			** This Receipt is System Generated **
		</Typography>
	</Box>
));

const AdmissionReceipt = ({ open, setOpen, admissionData }) => {
	const modalRef = useRef();
	const [rules, setRules] = useState([]);
	const [showRules, setShowRules] = useState(false);

	const addRules = async () => {
		const response = await getAllRules();
		setRules(response.data);
		setShowRules(true);
	};
	const shortId = admissionData?.admissionId?.toString().padStart(4, '0');
	const invoiceNo = `INV-${shortId}`;

	const gstAmount = Number(admissionData?.monthRent) * Number(admissionData?.gstPercentage) / 100
	const totalAmount = Number(admissionData?.monthRent) + Number(gstAmount)
	const receipt = {
		invoiceNo: invoiceNo,
		invoiceDate: new Date().toLocaleDateString(),
		student: {
			name: admissionData?.studentName,
			mobile: admissionData?.mobileNo,
			email: admissionData?.email,
		},
		org: {
			email: 'mahajanpadam@gmail.com',
			address: 'shukravar peth pune',
			phone: '8605090508',
		},
		details: [
			['Name', admissionData?.studentName],
			['Mobile No', admissionData?.mobileNo],
			['Email', admissionData?.email],
			['Floor', admissionData?.floor],
			['Room Type', admissionData?.roomType],
			['Room Number', admissionData?.roomNumber],
			['Bed Type', admissionData?.bedType],
			['Bed Number', admissionData?.bedNumber],
			['Bed Allocation Status', admissionData?.bedAllocationStatus || "Allocated"],
			['Monthly Rent', "₹ " + admissionData?.monthRent],
			['GST Percentage', (admissionData?.gstPercentage || 0) + " %"],
			['GST Amount', "₹ " + (admissionData?.gstAmount || gstAmount)],
			['Total Amount', "₹ " + (admissionData?.totalAmount || totalAmount)],
			['Payment Mode', admissionData?.paymentMode],
			['Admission By', admissionData?.conductedBy],
			['Status', admissionData?.paymentStatus],
		],
	};

	const generatePDF = async () => {
		const input = modalRef.current;
		const canvas = await html2canvas(input, { scale: 2 });
		const imgData = canvas.toDataURL('image/png');

		const pdf = new jsPDF('p', 'mm', 'a4');
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

		pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save(`receipt-${receipt.invoiceNo}.pdf`);

		setOpen(false);
	};

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box
					sx={{
						width: 800,
						maxHeight: '90vh',
						overflowY: 'auto',
						mx: 'auto',
						mt: 10,
						bgcolor: 'background.paper',
						boxShadow: 24,
						borderRadius: 2,
						p: 0,
					}}
				>
					<ReceiptContent ref={modalRef} receipt={receipt} rules={rules} showRules={showRules} />

					<Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2 }}>
						<Button onClick={generatePDF} variant="contained" color="primary">
							Download PDF
						</Button>
						{showRules ? (
							<Button onClick={() => setShowRules(false)} variant="contained" color="primary">
								Hide Rules
							</Button>
						) : (
							<Button onClick={addRules} variant="contained" color="primary">
								Add Rules and Regulations
							</Button>
						)}
						<Button onClick={() => setOpen(false)} variant="outlined">
							Close
						</Button>
					</Box>
				</Box>
			</Modal>

			{/* Hidden receipt for PDF generation */}
			<div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
				<ReceiptContent ref={modalRef} receipt={receipt} rules={rules} showRules={showRules} />
			</div>
		</>
	);
};

export default AdmissionReceipt;
