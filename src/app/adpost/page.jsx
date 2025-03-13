"use client"

import Link from 'next/link'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

import React, { useState } from 'react';

const AdPost = () => {

    const [images, setImages] = useState(Array(20).fill(null));

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
                                {/* <div className="col-md-6">
                                    <img src={adPostFormImg.src} alt="" className="w-100" />
                                </div> */}
                                <div className="col-md-8">
                                    <div className="form-container">
                                        <h3 className="text-center mb-4" style={{ color: "#4b164c" }}>Form</h3>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Category *</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option value="0">Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Sub Category *</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option value="0">Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Name *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Age *</label>
                                                    <input type="number" className="form-control" placeholder="Enter Age" required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Province *</label>
                                                    <select className="form-select" required>
                                                        <option>Select Province</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">City *</label>
                                                    <select className="form-select" required>
                                                        <option>Select City</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Ethnicity</label>
                                                    <select className="form-select">
                                                        <option>Select Ethnicity</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Availability *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Availability" required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Mobile Number *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Mobile Number (Only Number)" required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Body Stats</label>
                                                    <input type="text" className="form-control" placeholder="Enter Body Status" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Height</label>
                                                    <input type="text" className="form-control" placeholder="Enter Height" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Weight</label>
                                                    <input type="text" className="form-control" placeholder="Enter Weight" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Hair Color</label>
                                                    <input type="text" className="form-control" placeholder="Enter Hair Color" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Eye Color</label>
                                                    <input type="text" className="form-control" placeholder="Enter Eye Color" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Ad Title *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Title" required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Price</label>
                                                    <input type="text" className="form-control" placeholder="Enter Price" />
                                                </div>
                                            </div>
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