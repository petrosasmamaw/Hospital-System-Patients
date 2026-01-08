import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooksByPatientId } from "../slices/slice/bookSlice";
import { fetchDoctorByUserId } from "../slices/slice/doctorSlice";
import book2 from "../../assets/book.jpg";
import { motion } from "framer-motion";

export default function MyBooks({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { books, loading, error } = useSelector((state) => state.books || {});
	const doctorsState = useSelector((state) => state.doctors || { doctors: [] });

	const userId = user?._id || user?.id;

	// fetch bookings by authenticated user
	useEffect(() => {
		if (userId) {
			dispatch(fetchBooksByPatientId(userId));
		}
	}, [dispatch, userId]);

	// ensure doctor info exists
	useEffect(() => {
		if (!books || books.length === 0) return;

		const ids = [...new Set(books.map((b) => b.DoctorId).filter(Boolean))];

		ids.forEach((id) => {
			const exists = doctorsState.doctors.find((d) => d.userId === id || d._id === id);
			if (!exists) dispatch(fetchDoctorByUserId(id));
		});
	}, [books, doctorsState.doctors, dispatch]);

	return (
		<div className="mybooks-root">
			<header className="mybooks-header">
				<img src={book2} alt="booking" className="mybooks-hero" />
				<div className="mybooks-hero-overlay">
					<motion.h1
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
					>
						My Bookings
					</motion.h1>
					<motion.p
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.15, duration: 0.6 }}
					>
						Review and manage your hospital appointments securely.
					</motion.p>
				</div>
			</header>

			<main className="mybooks-content">
				{loading && <div className="mybooks-loading">Loading your bookings…</div>}
				{error && <div className="mybooks-error">Error: {error}</div>}

				{!loading && books?.length === 0 && (
					<div className="mybooks-empty">You have no bookings yet.</div>
				)}

				<div className="mybooks-grid">
					{books?.map((b) => {
						const doc = doctorsState.doctors.find(
							(d) => d.userId === b.DoctorId || d._id === b.DoctorId
						);

						return (
							<motion.article
								key={b._id}
								className="book-card"
								whileHover={{ scale: 1.02 }}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35 }}
								onClick={() => {
									if (!userId) return navigate("/login");
									navigate(`/myspecificreports?doctorId=${b.DoctorId}`);
								}}
							>
								<div className="book-card-left">
									<div className="book-date">
										{b.date ? new Date(b.date).toLocaleString() : "-"}
									</div>

									<h3 className="book-title">
										{doc?.name || "Doctor"}
									</h3>
									<div className="book-doctor-cat">
										{doc?.category || ""}
									</div>
									<p className="book-doctor-desc">
										{doc?.description || b.notes || "No notes provided."}
									</p>
								</div>

								<div className="book-card-right">
									{(() => {
										const raw = b.status;
										const normalized = raw
											? String(raw).toLowerCase().replace(/[^a-z0-9]/g, "")
											: null;
										const mapping = {
											checkedin: "Checked In",
											waiting: "Waiting",
											inprogress: "In Progress",
										};
										const label = normalized ? mapping[normalized] || raw : "Scheduled";
										const cls = normalized || "unknown";
										return (
											<span className={`status ${cls}`}>
												{label}
											</span>
										);
									})()}
								</div>
							</motion.article>
						);
					})}
				</div>
			</main>
		</div>
	);
}
