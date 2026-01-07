import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientByUserId, createPatient, updatePatient } from "../slices/slice/patientSlice";
import { motion } from "framer-motion";

export default function Profile({ user }) {
    const dispatch = useDispatch();
    const patientsState = useSelector((s) => s.patients || { patients: [], loading: false, error: null });
    const patient = patientsState.patients.find((p) => p.userId === (user && (user.id || user._id))) || null;

    const [form, setForm] = useState({
        name: "",
        gender: "",
        age: "",
        phone: "",
        emergencyPhone: "",
        bloodType: "",
        medicalHistory: "",
    });

    useEffect(() => {
        const uid = user && (user.id || user._id);
        if (uid) dispatch(getPatientByUserId(uid));
    }, [dispatch, user]);

    useEffect(() => {
        if (patient) {
            setForm({
                name: patient.name || "",
                gender: patient.gender || "",
                age: patient.age || "",
                phone: patient.phone || "",
                emergencyPhone: patient.emergencyPhone || "",
                bloodType: patient.bloodType || "",
                medicalHistory: patient.medicalHistory || "",
            });
        }
    }, [patient]);

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        const uid = user && (user.id || user._id);
        if (!uid) return window.alert("You must be logged in to create or update profile.");

        const payload = { ...form, userId: uid };

        try {
            if (patient) {
                await dispatch(updatePatient({ id: patient._id, patientData: payload })).unwrap();
                window.alert("Profile updated successfully");
            } else {
                await dispatch(createPatient(payload)).unwrap();
                window.alert("Profile created successfully");
            }
        } catch (err) {
            console.error(err);
            window.alert("Operation failed: " + (err?.message || err));
        }
    };

    return (
        <div className="profile-root">
            <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="profile-header">
                <h1>{patient ? "My Profile" : "Create Your Profile"}</h1>
                <p className="profile-sub">Keep your patient information up-to-date for accurate care.</p>
            </motion.header>

            <main className="profile-main">
                <section className="profile-card">
                    <form className="profile-form" onSubmit={onSubmit}>
                        <div className="form-row">
                            <label>Name</label>
                            <input name="name" value={form.name} onChange={onChange} required />
                        </div>

                        <div className="form-row">
                            <label>Gender</label>
                            <select name="gender" value={form.gender} onChange={onChange}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Age</label>
                            <input name="age" value={form.age} onChange={onChange} />
                        </div>

                        <div className="form-row">
                            <label>Phone</label>
                            <input name="phone" value={form.phone} onChange={onChange} required />
                        </div>

                        <div className="form-row">
                            <label>Emergency Phone</label>
                            <input name="emergencyPhone" value={form.emergencyPhone} onChange={onChange} required />
                        </div>

                        <div className="form-row">
                            <label>Blood Type</label>
                            <input name="bloodType" value={form.bloodType} onChange={onChange} required />
                        </div>

                        <div className="form-row full">
                            <label>Medical History</label>
                            <textarea name="medicalHistory" value={form.medicalHistory} onChange={onChange} required />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary">{patient ? "Update Profile" : "Create Profile"}</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
