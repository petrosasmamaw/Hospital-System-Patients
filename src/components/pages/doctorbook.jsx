import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchDoctorsByCategory } from "../slices/slice/doctorSlice";
import { createBook } from "../slices/slice/bookSlice";

export default function DoctorBook({ user }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  const { doctors, loading, error } = useSelector(
    (state) => state.doctors
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchDoctorsByCategory(category));
    }
  }, [dispatch, category]);

  return (
    <div className="doctor-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="doctor-title"
      >
        {category} Doctors
      </motion.h1>

      {loading && <p className="doctor-loading">Loading doctors...</p>}
      {error && <p className="doctor-error">{error}</p>}

      <div className="doctor-grid">
        {doctors.map((doc) => (
          <motion.div
            key={doc._id}
            className="doctor-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
          >
            <img
              src={doc.image || "/doctor-placeholder.png"}
              alt={doc.name}
            />

            <div className="doctor-card-body">
              <h3>{doc.name}</h3>
              <p className="doctor-title-text">{doc.title}</p>
              <p className="doctor-specialization">
                {doc.specialization}
              </p>

              <span
                className={`doctor-status ${
                  doc.status === "active" ? "active" : "inactive"
                }`}
              >
                {doc.status}
              </span>
                <div style={{marginTop:12}}>
                  <button
                    className="book-btn"
                    onClick={async () => {
                      if (!user) return navigate('/login');
                      const patientId = user.id || user._id;
                      try {
                        await dispatch(createBook({ patientId, DoctorId: doc.userId })).unwrap();
                        window.alert('Booking successful');
                        navigate('/mybooks');
                      } catch (err) {
                        window.alert('Booking failed: ' + (err?.message || err));
                      }
                    }}
                  >
                    Book
                  </button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!loading && doctors.length === 0 && (
        <p className="doctor-empty">
          No doctors found for this category.
        </p>
      )}
    </div>
  );
}
