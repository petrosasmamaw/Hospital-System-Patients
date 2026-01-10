import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// Images
import bone1 from "../../assets/Bone,joint&Muscle.jpg";
import book2 from "../../assets/book.jpg";
import brain from "../../assets/Brain&MentalHealth.jpg";
import digestive from "../../assets/Digestive&Stomach.jpg";
import doctors1 from "../../assets/doctors1.jpg";
import doctors2 from "../../assets/doctors2.jpg";
import heart from "../../assets/Heart&Circulation.jpg";
import hospital1 from "../../assets/hospital1.jpg";
import hospital2 from "../../assets/hospital2.jpg";
import hospital3 from "../../assets/hospital3.jpg";
import hospitalEmergency from "../../assets/hospitalEmergency.jpg";
import hospitalMain from "../../assets/hospitalMain.jpg";
import primaryDoctor from "../../assets/primaryDoctor.jpg";
import report from "../../assets/report.jpg";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { title: "Primary", image: primaryDoctor },
    { title: "Bone, Joint & Muscle", image: bone1 },
    { title: "Heart & Circulation", image: heart },
    { title: "Brain & Mental Health", image: brain },
    { title: "Digestive & Stomach", image: digestive },
  ];

  return (
    <div className="home">
      {/* HERO */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={hospitalMain} alt="Hospital Main" />
        <div className="hero-content">
          <h1>Dengel Hospital -Smart Healthcare for Everyone</h1>
          <p>
            Book appointments, consult doctors, manage reports, and receive
            emergency care — all in one platform.
          </p>
          <button onClick={() => navigate("/doctors")}>Find Doctors</button>
        </div>
      </motion.section>
       {/* CATEGORIES */}
       <section className="categories">
           <h2>Find Doctors by Specialty</h2>
               <div className="category-grid">
                  {categories.map((cat, i) => (
           <motion.div
                   key={i}
                   className="category-card"
                   whileHover={{ scale: 1.05 }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                   onClick={() =>
           navigate(`/doctor?category=${encodeURIComponent(cat.title)}`)
        } 
      >
        <img src={cat.image} alt={cat.title} />
        <div className="overlay">
          <h3>{cat.title}</h3>
        </div>
      </motion.div>
    ))}
  </div>
       </section>


      {/* ABOUT */}
      <motion.section
        className="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={hospital1} alt="Hospital Building" />
        <div>
          <h2>About Our Hospital</h2>
          <p>
            We are a modern digital healthcare platform designed to connect
            patients with trusted doctors. Our hospitals are equipped with
            advanced medical technology and professional specialists.
          </p>
        </div>
      </motion.section>

      {/* SERVICES */}
      <section className="services">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Our Services
        </motion.h2>

        <div className="services-grid">
          <motion.div whileHover={{ y: -10 }}>
            <img src={book2} alt="Booking" />
            <h3>Online Booking</h3>
            <p>Book doctor appointments anytime, anywhere.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }}>
            <img src={report} alt="Medical Reports" />
            <h3>Medical Reports</h3>
            <p>Access and manage your health records digitally.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }}>
            <img src={hospitalEmergency} alt="Emergency" />
            <h3>Emergency Care</h3>
            <p>24/7 emergency services with rapid response teams.</p>
          </motion.div>
        </div>
      </section>

      {/* DOCTORS */}
      <motion.section
        className="doctors"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2>Meet Our Doctors</h2>
        <div className="doctor-images">
          <img src={doctors1} alt="Doctors Team" />
          <img src={doctors2} alt="Doctors Team" />
        </div>
        <p>
          Our doctors are highly qualified, experienced, and dedicated to
          providing compassionate care.
        </p>
      </motion.section>

     

      {/* GALLERY */}
      <motion.section
        className="gallery"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2>Our Facilities</h2>
        <div className="gallery-grid">
          <img src={hospital2} alt="Facility" />
          <img src={hospital3} alt="Facility" />
        </div>
      </motion.section>

      {/* FOOTER INFO */}
      <motion.section
        className="footer-info"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <p>
          Your health matters. We combine technology, compassion, and expertise
          to deliver quality healthcare services.
        </p>
      </motion.section>
    </div>
  );
}
