import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getPatientByUserId } from "../slices/slice/patientSlice";
import { fetchReportsByPatientId } from "../slices/slice/reportSlice";
import { fetchDoctorByUserId } from "../slices/slice/doctorSlice";
import reportImg from "../../assets/report.jpg";

export default function MyReports({ user }) {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();

	// ✅ ONLY doctorId comes from URL
	const doctorId =
		searchParams.get("doctorId") ||
		searchParams.get("doctorid") ||
		searchParams.get("doctor");

	// ✅ userId ALWAYS from props/auth
	const userId = user?._id || user?.id;

	const patientsState = useSelector((s) => s.patients || { patients: [] });
	const reportsState = useSelector(
		(s) => s.reports || { reports: [], loading: false, error: null }
	);
	const doctorsState = useSelector((s) => s.doctors || { doctors: [] });

	// fetch patient + reports
	useEffect(() => {
		if (!userId) return;

		dispatch(getPatientByUserId(userId));
		dispatch(fetchReportsByPatientId(userId));
	}, [dispatch, userId]);

	// fetch doctors
	useEffect(() => {
		if (doctorId) dispatch(fetchDoctorByUserId(doctorId));

		if (reportsState.reports.length > 0) {
			const ids = [...new Set(
				reportsState.reports
					.map((r) => r.DoctorId || r.doctorId)
					.filter(Boolean)
			)];

			ids.forEach((id) => {
				const exists = doctorsState.doctors.find((d) => d.userId === id || d._id === id);
				if (!exists) dispatch(fetchDoctorByUserId(id));
			});
		}
	}, [dispatch, doctorId, reportsState.reports, doctorsState.doctors]);

	const patient =
		patientsState.patients.find(
			(p) => p.userId === userId || p._id === userId
		) || null;

	return (
		<div className="myreports-root">
			<header className="myreports-header">
				<img src={reportImg} alt="reports" />
				<div className="myreports-header-info">
					<motion.h1
						initial={{ y: -12, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						Medical Reports
					</motion.h1>
					<p className="myreports-sub">
						Secure access to your medical history.
					</p>
					{/* Short descriptive paragraph next to the header */}
					<p className="myreports-highlight">
						Each report contains clinical observations, diagnoses, prescriptions,
						and recommended follow-ups — authored by your treating physician
						and available securely for your review.
					</p>
				</div>
			</header>

			<section className="myreports-patient">
					{patient ? (
						<div className="patient-card">
							<div>
								<strong>{patient.name || "Patient"}</strong>
								<div className="patient-meta">
									{patient.email || patient.phone || ""}
								</div>
								<div className="patient-blood">Blood Type: <span className="blood-badge">{patient.bloodType || "—"}</span></div>
								<div className="patient-history">
									<strong>Medical History</strong>
									<p>{patient.medicalHistory || "No medical history provided."}</p>
								</div>
							</div>
							<div className="patient-extra">ID: {patient._id}</div>
						</div>
					) : (
						<div className="patient-loading">Loading patient information…</div>
						)}
			</section>

			<main className="myreports-list">
				{reportsState.loading && (
					<div className="reports-loading">Loading reports…</div>
				)}
				{reportsState.error && (
					<div className="reports-error">{reportsState.error}</div>
				)}

				{reportsState.reports.length === 0 && (
					<div className="reports-empty">No reports available.</div>
				)}

				<div className="reports-grid">
					{reportsState.reports.map((r) => {
						const docId = r.DoctorId || r.doctorId || doctorId;
						const doc = doctorsState.doctors.find(
							(d) => d.userId === docId || d._id === docId
						);

						return (
							<motion.article
								key={r._id}
								className="report-card"
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.25 }}
							>
								<div className="report-left">
									<div className="report-title">
										{r.title || `Report ${new Date(r.createdAt).toLocaleDateString()}`}
									</div>
									<div className="report-date">
										{r.createdAt
											? new Date(r.createdAt).toLocaleString()
											: "-"}
									</div>
									<p className="report-desc">
										{r.report || "No description provided."}
									</p>
								</div>

								<div className="report-right">
									<div className="report-doctor">
										<div className="doc-name">
											{doc?.name || "Doctor"}
										</div>
										<div className="doc-meta">
											{doc?.category || ""}
										</div>
									</div>
								</div>
							</motion.article>
						);
					})}
				</div>
			</main>

			{/* Centered footer-like paragraph for reports */}
			<section className="myreports-footer">
				<p>
					Reports are private medical records stored securely. If you have any
					questions about the content, contact your provider for clarifications
					or next steps.
				</p>
			</section>
		</div>
	);
}
