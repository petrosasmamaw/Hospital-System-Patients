import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

// Images
import bone1 from "../../assets/Bone,joint&Muscle.jpg";
import book2 from "../../assets/book.jpg";
import brain from "../../assets/Brain&MentalHealth.jpg";
import digestive from "../../assets/Digestive&Stomach.jpg";
import doctors1 from "../../assets/doctors1.jpg";
import heart from "../../assets/Heart&Circulation.jpg";
import primaryDoctor from "../../assets/primaryDoctor.jpg";
import report from "../../assets/report.jpg";

export default function Doctors() {
  const navigate = useNavigate();

  const categories = [
    { title: "Primary", image: primaryDoctor },
    { title: "Bone, Joint & Muscle", image: bone1 },
    { title: "Heart & Circulation", image: heart },
    { title: "Brain & Mental Health", image: brain },
    { title: "Digestive & Stomach", image: digestive },
  ];

  return (
    <div className="doctors-page">
      {/* HERO */}
      <motion.section
        className="doctors-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Medical Specialists</h1>
        <p>Find the right doctor based on specialty and experience.</p>
      </motion.section>

      {/* CATEGORIES */}
      <section className="doctors-categories">
        <h2>Find Doctors by Specialty</h2>

        <div className="doctors-category-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="doctors-category-card"
              onClick={() =>
                navigate(
                  `/doctor?category=${encodeURIComponent(cat.title)}`
                )
              }
            >
              <img src={cat.image} alt={cat.title} />
              <div className="doctors-category-overlay">
                <h3>{cat.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOCTOR INFO */}
      <motion.section
        className="doctors-info-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="doctors-info-text">
          <h2>Experienced & Trusted</h2>
          <p>
            Our doctors provide world-class medical care using modern tools and
            compassionate treatment methods.
          </p>
        </div>

        <div className="doctors-info-images">
          <img src={doctors1} alt="Doctors team" />
        </div>
      </motion.section>

      {/* SERVICES */}
      <section className="doctors-services">
        <h2>Doctor Services</h2>

        <div className="doctors-services-grid">
          <motion.div whileHover={{ y: -10 }}>
            <img src={book2} alt="Booking" />
            <h3>Easy Booking</h3>
            <p>Book appointments quickly and securely.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }}>
            <img src={report} alt="Reports" />
            <h3>Medical Reports</h3>
            <p>Doctors access reports instantly and safely.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
