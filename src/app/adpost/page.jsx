"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link'
import Image from 'next/image';
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import AdPostFormImg from "../../../public/images/adpost-formImg.png";

const AdPost = () => {

    const [images, setImages] = useState(Array(20).fill(null));
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImages = [...images];
                newImages[index] = e.target.result;
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="adPost-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">Ad Post</h1>
                                    <h3 className="text-white">
                                        Home
                                        <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i>
                                        Ad Post
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="container my-5">
                            <div className="row justify-content-center">
                                <h2 className="text-center fw-bold text-4b164c mb-4">Fill Out the Form Below</h2>
                                <div className="col-lg-6 d-flex align-items-center">
                                    <Image src={AdPostFormImg.src} alt="Profile" width={400} height={636} className="w-100 object-fit-contain" />
                                </div>
                                <div className="col-lg-6 d-flex align-items-center">
                                    <div className="form-container w-100">
                                        {/* Step Progress Bar */}
                                        <div className="stepper-container d-flex justify-content-between align-items-center mb-4">
                                            {[1, 2, 3, 4].map((s, index) => (
                                                <motion.div
                                                    key={index}
                                                    className={`step ${step >= s ? 'active' : ''}`}
                                                    initial={{ opacity: 0.5 }}
                                                    animate={{ opacity: step >= s ? 1 : 0.5 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.div
                                                        className="step-circle"
                                                        initial={{ scale: 0.8 }}
                                                        animate={{ scale: step === s ? 1.2 : 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        style={{
                                                            backgroundColor: step >= s ? "#dd88cf" : "#ddd",
                                                            color: step >= s ? "#fff" : "#000"
                                                        }}
                                                    >
                                                        {step > s ? <i class="fa-solid fa-check text-white mt-1"></i> : s}
                                                    </motion.div>
                                                    <span className="step-label" style={{ color: step >= s ? "#6a0dad" : "#aaa" }}>Step {s}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <form>
                                            {step === 1 && (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Category *</label>
                                                            <select className="form-select" required>
                                                                <option value="0">Open this select menu</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Sub Category *</label>
                                                            <select className="form-select" required>
                                                                <option value="0">Open this select menu</option>
                                                                <option value="1">One</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {step === 2 && (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Name *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Name" required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Age *</label>
                                                            <input type="number" className="form-control" placeholder="Enter Age" required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">City *</label>
                                                            <select className="form-select" required>
                                                                <option>Select City</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Mobile Number *</label>
                                                            <input type="number" className="form-control" placeholder="Enter Mobile Number" required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Province *</label>
                                                            <select className="form-select" required>
                                                                <option>Select Province</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Availability *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Availability" required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Ethnicity</label>
                                                            <select className="form-select">
                                                                <option>Select Ethnicity</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {step === 3 && (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Body Stats</label>
                                                            <input type="text" className="form-control" placeholder="Enter Body Status" />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Height</label>
                                                            <input type="text" className="form-control" placeholder="Enter Height" />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Weight</label>
                                                            <input type="text" className="form-control" placeholder="Enter Weight" />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Hair Color</label>
                                                            <input type="text" className="form-control" placeholder="Enter Hair Color" />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Eye Color</label>
                                                            <input type="text" className="form-control" placeholder="Enter Eye Color" />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Ad Title *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Title" required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Price</label>
                                                            <input type="text" className="form-control" placeholder="Enter Price" />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {step === 4 && (
                                                <>
                                                    <div className="mb-3">
                                                        <label className="form-label">Description *</label>
                                                        <textarea className="form-control" rows="3" placeholder="Enter Description" required></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Upload Images</label>
                                                        <div className="d-flex flex-wrap gap-2 justify-content-center image-upload-container">
                                                            {images.map((img, index) => (
                                                                <div key={index} className="image-upload">
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleImageChange(index, e)}
                                                                    />
                                                                    {img ? (
                                                                        <img src={img} alt="Preview" className="previewImage" />
                                                                    ) : (
                                                                        <i className="fa-solid fa-camera-retro" style={{ fontSize: '2rem', color: '#4b164c' }}></i>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-custom text-white px-5 py-2">Submit</button>
                                                    </div>
                                                </>
                                            )}
                                            <div className="d-flex justify-content-between mt-4">
                                                {step > 1 && <button type="button" className="btn btn-secondary rounded-5" onClick={prevStep}>Previous</button>}
                                                {step < totalSteps && <button type="button" className="btn bg-4b164c text-white px-4 rounded-pill" onClick={nextStep}>Next</button>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AdPost