"use client"
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import AdPostFormImg from "../../../public/images/adpost-formImg.png";
import callAPI from '../Common_Method/api';
import axios from 'axios';
import ProtectedRoute from '../Common_Method/protectedroute';

const AdPost = () => {
    const [category, setCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [images, setImages] = useState([null]);
    const [loading, setLoading] = useState([]);
    const [errors, setErrors] = useState({});
    const [province, Setprovince] = useState('')
    const [ethicity, Setethicity] = useState('')
    const [data, Setdata] = useState('');
    const [provincesid, setprovincesid] = useState('');
    const [provincesname, setprovincesname] = useState('');
    const [alertcity, setalertcity] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);


    const [step, setStep] = useState(1);

    const totalSteps = 4;

    const [formData, setFormData] = useState({
        postbyuserid: sessionStorage.getItem("userid") || "",
        category: "",
        subcategoryid: "",
        name: "",
        age: "",
        city: "",
        provincesid: "",
        ethicity: "",
        availability: "",
        bodystatus: "",
        phone: "",
        height: "",
        weight: "",
        haircolour: "",
        eyecolour: "",
        title: "",
        description: "",
        price: "",
        images: [],
        paymentid: "",
        orderid: "",
        highlight: true,
    });

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };



    const handleShow = async () => {
        try {
            if (!formData || typeof formData !== "object") {
                console.error("Form data is undefined or not an object");
                return;
            }

            console.log("Form data:", formData);

            const {
                postbyuserid,
                category,
                subcategoryid,
                name,
                age,
                city,
                provincesid,
                ethicity,
                availability,
                bodystatus,
                phone,
                height,
                weight,
                haircolour,
                eyecolour,
                title,
                description,
                price,
                images,
                paymentid,
                orderid,
                highlight
            } = formData;

            const emptyFieldsList = Object.entries({
                name, age, city, availability, phone, title, description,
                bodystatus, height, weight, haircolour, eyecolour, price,
                images: images && images.length > 0 ? images : null,
            })
                .filter(([_, value]) => !value)
                .map(([key]) => key);

            if (emptyFieldsList.length > 0) {
                console.warn("Missing fields:", emptyFieldsList.join(", "));
                setEmptyFields(emptyFieldsList);

                const firstEmptyField = document.querySelector(`[name="${emptyFieldsList[0]}"]`);
                if (firstEmptyField) {
                    firstEmptyField.scrollIntoView({ behavior: "smooth", block: "center" });
                    firstEmptyField.focus();
                }
                return;
            }

            // 🛠 Convert image array to image1, image2, etc.
            const imageFields = {};
            formData.images.forEach((url, index) => {
                imageFields[`image${index + 1}`] = url;
            });

            // 🧾 Prepare final payload
            const payload = {
                ...formData,
                ...imageFields,
                images: undefined  // remove the array field
            };

            const response = await fetch("http://206.189.130.102:4000/api/v1/postad/createpostad", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Form submitted successfully!");
                console.log("Submission result:", result);
                // Reset form if needed
            } else {
                console.error("Submission failed:", result);
                alert("Failed to submit the form. Please try again.");
            }

        } catch (error) {
            console.error("Error while submitting form:", error);
            alert("An error occurred. Please try again later.");
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        const maxSize = 1024 * 1024 * 1024; // 1GB limit

        const uploadedImageUrls = [];
        const newLoading = {};

        try {
            // Set loading true for each file
            files.forEach((_, i) => newLoading[i] = true);
            setLoading(newLoading);

            for (const file of files) {
                if (file.size > maxSize) {
                    alert("One or more files exceed the maximum size limit.");
                    continue;
                }

                const formDataUpload = new FormData();
                formDataUpload.append("image", file);

                const response = await axios.post("http://206.189.130.102:4000/upload", formDataUpload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const imageUrl = response.data?.data?.url;
                if (imageUrl) {
                    uploadedImageUrls.push(imageUrl);
                }
            }

            // Update state
            setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, ...uploadedImageUrls],
            }));
        } catch (error) {
            console.error("Image upload error:", error);
        } finally {
            setLoading({});
        }
    };



    const getCategory = async () => {
        try {
            const response = await callAPI.get(`/category/getallcategory`);

            if (response.data) {
                setCategory(response.data || []);

            } else {
                console.error("Unexpected response format", response);
                setCategory([]);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
            setCategory([]);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await callAPI.get("/category/getallcategory");
            if (response.data.status === "success" && response.data.data.length > 0) {
                const allSubcategories = response.data.data.flatMap(category => category.subcategoriesId || []);
                setSubcategories(allSubcategories);
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        if (step === 1) {
            if (!formData.category) tempErrors.category = "Category is required";
            if (!formData.subcategoryid) tempErrors.subCategory = "Sub Category is required";
        } else if (step === 2) {
            if (!formData.name) tempErrors.name = "Name is required";
            if (!formData.age || isNaN(formData.age) || formData.age <= 0)
                tempErrors.age = "Enter a valid age";
            // if (!formData.city) tempErrors.city = "City is required";
            if (!formData.phone || !/^\d{10}$/.test(formData.phone))
                tempErrors.phone = "Enter a valid 10-digit number";
            if (!formData.provincesid) tempErrors.provincesid = "Province is required";
            if (!formData.availability) tempErrors.availability = "Availability is required";
        } else if (step === 3) {
            if (!formData.title) tempErrors.title = "Ad Title is required";
        } else if (step === 4) {
            if (!formData.description) tempErrors.description = "Description is required";
            if (!formData.images.some(img => img !== null)) tempErrors.images = "At least one image is required";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully", formData);
        }
    };

    const getprovince = async () => {
        try {
            const response = await callAPI.get(`/getallprovince`);
            Setprovince(response.data || []);
        } catch (error) {
            console.error("Error fetching provinces:", error);
            Setprovince([]);
        }
    };

    const getethnicity = async () => {
        try {
            const response = await callAPI.get(`/getall-ethnicity`);
            if (response?.data) {
                Setethicity(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching ethnicity:", error);
            Setethicity([]);
        }
    };

    const getcity2 = async (provinceId, name) => {
        try {
            setprovincesid(provinceId);
            setprovincesname(name);
            const response = await callAPI.get(`/getallcity/${provinceId}`);
            if (response?.data) {
                Setdata(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            Setdata([]);
        }
    };

    useEffect(() => {
        if (formData.province) {
            getcity2(formData.province);
        }
    }, [formData.province]);

    useEffect(() => {
        getCategory();
        fetchSubCategories();
        getprovince();
        getethnicity();
        getcity2()
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }, [])

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
                                    <Image src={AdPostFormImg.src} alt="Profile" width={400} height={636} className="w-100 object-fit-contain adpost-leftImg" />
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
                                                        {step > s ? <i className="fa-solid fa-check text-white mt-1"></i> : s}
                                                    </motion.div>
                                                    <span className="step-label" style={{ color: step >= s ? "#6a0dad" : "#aaa" }}>Step {s}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            {step === 1 && (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Category *</label>
                                                            <select
                                                                className="form-select"
                                                                name="category"
                                                                value={formData.category}
                                                                onChange={handleChange}
                                                                required
                                                            >
                                                                <option value="">Select a category</option>
                                                                {Array.isArray(category?.data) && category.data.length > 0 ? (
                                                                    category.data.map((cat, index) => (
                                                                        <option value={cat._id} key={index}>{cat.name}</option>
                                                                    ))
                                                                ) : (
                                                                    <option disabled>No category available</option>
                                                                )}
                                                            </select>
                                                            {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                                                        </div>

                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Sub Category *</label>
                                                            <select className="form-select" name='subcategoryid' value={formData.subcategoryid} onChange={handleChange} required>
                                                                <option value="0">Select a sub category</option>
                                                                {subcategories?.map((subcategory) => (
                                                                    <option key={subcategory._id} value={subcategory._id}>
                                                                        {subcategory.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.subCategory && <p>{errors.subCategory}</p>}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {step === 2 && (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Name *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Name" name='name' value={formData.name} onChange={handleChange} required />
                                                        </div>
                                                        {errors.name && <p>{errors.name}</p>}
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Age *</label>
                                                            <input type="number" className="form-control" placeholder="Enter Age" name='age' value={formData.age} onChange={handleChange} required />
                                                        </div>
                                                        {errors.age && <p>{errors.age}</p>}
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Province *</label>
                                                            <select
                                                                className={`form-select ${alertcity ? 'emptyInput' : ''}`}
                                                                name="provincesid"
                                                                value={formData.provincesid || ""}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    if (e.target.value) {
                                                                        getcity2(e.target.value, e.target.options[e.target.selectedIndex].text);
                                                                    }
                                                                }}
                                                                required
                                                            >
                                                                <option value="">Select Province</option>
                                                                {Array.isArray(province?.data) && province.data.length > 0 ? (
                                                                    province.data.map((val) => (
                                                                        <option key={val._id} value={val._id}>
                                                                            {val.name}
                                                                        </option>
                                                                    ))
                                                                ) : (
                                                                    <option disabled>No provinces available</option>
                                                                )}
                                                            </select>

                                                            {errors.province && <p className="text-danger">{errors.province}</p>}
                                                        </div>

                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">City *</label>
                                                            <select className={`form-select ${alertcity ? 'emptyInput' : null}`} name='city' value={formData.city} onChange={handleChange} required>
                                                                <option>Select City</option>
                                                                {data?.data?.map((val, index) => {
                                                                    return (
                                                                        <option key={index} value={val.name}>{val.name.charAt(0).toUpperCase() + val.name.slice(1).toLowerCase()}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {errors.city && <p>{errors.city}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Mobile Number *</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Enter Mobile Number"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.phone && <p>{errors.phone}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Availability *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Availability" name='availability' value={formData.availability} onChange={handleChange} required />
                                                        </div>
                                                        {errors.availability && <p>{errors.availability}</p>}
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Ethnicity</label>
                                                            <select
                                                                className="form-select"
                                                                name="ethicity"
                                                                value={formData.ethicity}
                                                                onChange={handleChange}
                                                            >
                                                                {ethicity?.data?.map((val, index) => (
                                                                    <option key={index} value={val.name}>
                                                                        {val.name.charAt(0).toUpperCase() + val.name.slice(1).toLowerCase()}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.ethnicity && <p>{errors.ethnicity}</p>}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {step === 3 && (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Body Status</label>
                                                            <input type="text" className="form-control" placeholder="Enter Body Status" value={formData.bodystatus} name='bodystatus' onChange={handleChange} />
                                                            {errors.bodystatus && <p className="text-danger">{errors.bodystatus}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Height</label>
                                                            <input type="text" className="form-control" placeholder="Enter Height" name='height' value={formData.height} onChange={handleChange} />
                                                            {errors.height && <p className="text-danger">{errors.height}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Weight</label>
                                                            <input type="text" className="form-control" placeholder="Enter Weight" name='weight' value={formData.weight} onChange={handleChange} />
                                                            {errors.weight && <p className="text-danger">{errors.weight}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Hair Color</label>
                                                            <input type="text" className="form-control" placeholder="Enter Hair Color" name='haircolour' value={formData.haircolour} onChange={handleChange} />
                                                            {errors.haircolor && <p className="text-danger">{errors.haircolor}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Eye Color</label>
                                                            <input type="text" className="form-control" placeholder="Enter Eye Color" name='eyecolour' value={formData.eyecolour} onChange={handleChange} />
                                                            {errors.eyecolor && <p className="text-danger">{errors.eyecolor}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Title *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Title" name='title' required value={formData.title} onChange={handleChange} />
                                                            {errors.adTitle && <p className="text-danger">{errors.adTitle}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Price</label>
                                                            <input type="text" className="form-control" placeholder="Enter Price" name='price' value={formData.price} onChange={handleChange} />
                                                            {errors.price && <p className="text-danger">{errors.price}</p>}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {step === 4 && (
                                                <>
                                                    <div className="mb-3">
                                                        <label className="form-label">Description *</label>
                                                        <textarea className="form-control" rows="3" placeholder="Enter Description" name='description' value={formData.description} onChange={handleChange} required></textarea>
                                                        {errors.description && <p className="text-danger">{errors.description}</p>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Upload Images</label>
                                                        <div className="d-flex flex-wrap gap-2 justify-content-center image-upload-container">
                                                            {images.map((img, index) => (
                                                                <div key={index} className="image-upload">
                                                                    <input type="file" accept="image/*" name='images' multiple onChange={(e) => handleImageUpload(e)} />
                                                                    {loading[index] ? (
                                                                        <span>Loading...</span>
                                                                    ) : img ? (
                                                                        <>
                                                                            <img src={img} alt="Preview" className="previewImage" />
                                                                        </>
                                                                    ) : (
                                                                        <i className="fa-solid fa-camera-retro" style={{ fontSize: "2rem", color: "#4b164c" }}></i>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-custom text-white px-5 py-2" onClick={handleShow}>Submit</button>
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

export default ProtectedRoute(AdPost)