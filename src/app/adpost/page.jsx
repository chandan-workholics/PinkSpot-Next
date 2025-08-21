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
import cheersImg from "../../../public/images/cheersImg.png";
import Link from 'next/link';

const AdPost = () => {
    const [category, setCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState([]);
    const [btnLoading, setBtnLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [province, Setprovince] = useState('')
    const [ethicity, Setethicity] = useState('')
    const [data, Setdata] = useState('');
    const [provincesid, setprovincesid] = useState('');
    const [provincesname, setprovincesname] = useState('');
    const [alertcity, setalertcity] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [step, setStep] = useState(1);

    const totalSteps = 3;

    const [formData, setFormData] = useState({
        postbyuserid: sessionStorage.getItem("userid") || "",
        category: "6448f0807e958facc31c4d78",
        subcategoryid: "6448f11f7e958facc31c4d8c",
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
        if (validateForm() && step < totalSteps) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleShow = async () => {
        // setLoading(true);
        if (!validateForm()) {
            return;
        }
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
                category, subcategoryid, name, age, provincesid, city, availability, phone, title, description,
                images: images && images.length > 0 ? images : null,
            })
                .filter(([_, value]) => !value)
                .map(([key]) => key);

            if (emptyFieldsList.length > 0) {
                console.warn("Missing fields:", emptyFieldsList.join(", "));
                setEmptyFields(emptyFieldsList);
                alert("please fill all required fields");
                const firstEmptyField = document.querySelector(`[name="${emptyFieldsList[0]}"]`);
                if (firstEmptyField) {
                    firstEmptyField.scrollIntoView({ behavior: "smooth", block: "center" });
                    firstEmptyField.focus();
                }
                return;
            }

            setBtnLoading(true);

            // Upload files first
            const uploadedUrls = [];

            for (const file of formData.images) {
                const formDataUpload = new FormData();
                formDataUpload.append("image", file);

                const response = await axios.post("https://pinkspot.cc/api/v1/upload", formDataUpload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const imageUrl = response.data?.data?.url;
                if (imageUrl) {
                    uploadedUrls.push(imageUrl);
                }
            }

            // Prepare final payload
            const imageFields = {};
            uploadedUrls.forEach((url, index) => {
                imageFields[`image${index + 1}`] = url;
            });

            // 🧾 Prepare final payload
            const payload = {
                ...formData,
                ...imageFields,
                images: undefined  // remove the array field
            };

            const response = await fetch("https://pinkspot.cc/api/v1/postad/createpostad", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                if (
                    result?.error?.toLowerCase().includes("Insufficient wallet balance") ||
                    result?.message?.toLowerCase().includes("Insufficient wallet balance")
                ) {
                    setErrorMessage("Your wallet balance is too low to post the ad. Please top up your wallet.");
                    setIsSubmitted(false);
                } else {
                    setIsSubmitted(true);
                }
            } else {
                setErrorMessage(result.error || result.message);
                setIsSubmitted(false);
            }

        } catch (error) {
            console.error("Error while submitting form:", error);
            alert("An error occurred. Please try again later.");
        }
        finally {
            setBtnLoading(false);
        }
    };

    const handleChange = (eOrName, maybeValue) => {
        if (typeof eOrName === 'string') {
            // Manual call: handleChange('category', e.target.value)
            setFormData((prevFormData) => ({
                ...prevFormData,
                [eOrName]: maybeValue,
            }));
        } else if (eOrName?.target) {
            // Direct event: handleChange(e)
            const { name, value } = eOrName.target;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        const newPreviews = files.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...newPreviews]);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files], // store File objects here
        }));
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove),
        }));
    };


    const getCategory = async () => {
        const response = await fetch(`https://pinkspot.cc/api/v1/category/getallcategory`);
        const result = await response.json();
        setCategory(result?.data);
    };

    const fetchSubCategories = async (id) => {
        try {
            const response = await callAPI.get(`/category/getsubcategorybycatid/${id}`);
            setSubcategories(response.data?.data || []);  // assuming response shape is { data: { data: [...] } }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setSubcategories([]);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const allowOnlyNumbers = (e) => {
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const validateForm = () => {
        let tempErrors = {};

        const isNumeric = (value) => /^[0-9]+$/.test(value);

        if (step === 1) {
            if (!formData.name) tempErrors.name = "Name is required";

            if (!formData.age || isNaN(formData.age) || formData.age <= 18 || formData.age > 100)
                tempErrors.age = "Enter a valid age";

            if (!formData.city) tempErrors.city = "City is required";

            if (!formData.phone || !/^[2-9]\d{2}[2-9]\d{6}$/.test(formData.phone)) {
                tempErrors.phone = "Enter a valid phone number";
            }


            if (!formData.provincesid) tempErrors.provincesid = "Province is required";
            if (!formData.availability) tempErrors.availability = "Availability is required";

            // Height (only numbers and must end with "cm" or "inches")
            if (formData.height && !/^\d+(cm|inches)$/.test(formData.height)) {
                tempErrors.height = "Height must end with 'cm' or 'inches' (e.g. 170cm)";
            }

            // Weight (only numbers and must end with "kg" or "pounds")
            if (formData.weight && !/^\d+(kg|pounds)$/.test(formData.weight)) {
                tempErrors.weight = "Weight must end with 'kg' or 'pounds' (e.g. 60kg)";
            }

        } else if (step === 2) {
            if (!formData.title) tempErrors.title = "Ad title is required";
        } else if (step === 3) {
            if (!formData.description) tempErrors.description = "Description is required";

            if (!formData.images.some(img => img !== null))
                tempErrors.images = "At least one image is required";

            if (formData.price && !isNumeric(formData.price)) {
                tempErrors.price = "Price must be a number";
            }
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
                            {!isSubmitted ? (
                                <div className="row justify-content-center">
                                    <h2 className="text-center fw-bold text-4b164c mb-4">Start promoting your ad for just <span className="text-dd88cf">$20</span></h2>
                                    

                                     {/* <h5 className="mb-4 fw-bold">Let's Publish Your Ad In Just <span className="text-dd88cf">$20</span></h5> */}
                                    <div className="col-lg-6 d-flex align-items-center">
                                        <img src={AdPostFormImg.src} alt="Profile" width={400} height={636} className="w-100 object-fit-contain adpost-leftImg" />
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center">
                                        <div className="form-container w-100">
                                            {/* Step Progress Bar */}
                                            <div className="stepper-container d-flex justify-content-between align-items-center mb-4">
                                                {[1, 2, 3].map((s, index) => (
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
                                                {/* {step === 1 && (
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Category *</label>
                                                                <select
                                                                    className="form-select"
                                                                    name="category"
                                                                    value={formData.category}
                                                                    onChange={(e) => {
                                                                        handleChange('category', e.target.value);
                                                                        handleChange('subcategoryid', ''); // Clear selected subcategory
                                                                        fetchSubCategories(e.target.value);
                                                                    }}
                                                                    required
                                                                >
                                                                    <option value="">Select a category</option>
                                                                    {Array.isArray(category) && category.length > 0 ? (
                                                                        category.map((cat, index) => (
                                                                            <option value={cat._id} key={index} className='text-capitalize'>{cat.name}</option>
                                                                        ))
                                                                    ) : (
                                                                        <option disabled>No category available</option>
                                                                    )}
                                                                </select>
                                                                {errors.category && <p className='input-errormsg'>{errors.category}</p>}
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Sub Category *</label>
                                                                <select
                                                                    className="form-select"
                                                                    name='subcategoryid'
                                                                    value={formData.subcategoryid}
                                                                    onChange={(e) => handleChange('subcategoryid', e.target.value)}
                                                                    required>
                                                                    <option value="0">Select a sub category</option>
                                                                    {subcategories?.map((val, index) => (
                                                                        <option key={index} value={val._id}>
                                                                            {val.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                {errors.subCategory && <p className='input-errormsg'>{errors.subCategory}</p>}
                                                            </div>
                                                        </div>
                                                    </>
                                                )} */}
                                                {step === 1 && (
                                                    <>
                                                        <div className="row">
                                                       



                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Name *</label>
                                                                <input type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Name"
                                                                    name='name'
                                                                    value={formData.name}
                                                                    onChange={handleChange}
                                                                    required />
                                                                {errors.name && <p className='input-errormsg'>{errors.name}</p>}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Age *</label>
                                                                <input type="number" className="form-control" placeholder="Enter Age" name='age' value={formData.age} onChange={handleChange} required />
                                                                {errors.age && <p className='input-errormsg'>{errors.age}</p>}
                                                            </div>
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

                                                                {errors.provincesid && <p className='input-errormsg'>{errors.provincesid}</p>}
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
                                                                {errors.city && <p className='input-errormsg'>{errors.city}</p>}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Mobile Number *</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="e.g. 416 555 1234"
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                {errors.phone && <p className='input-errormsg'>{errors.phone}</p>}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Availability *</label>
                                                                <input type="text" className="form-control" placeholder="Enter Availability" name='availability' value={formData.availability} onChange={handleChange} required />
                                                                {errors.availability && <p className='input-errormsg'>{errors.availability}</p>}
                                                            </div>
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
                                                                {errors.ethnicity && <p className='input-errormsg'>{errors.ethnicity}</p>}
                                                            </div>
                                                             
                                                        </div>
                                                    </>
                                                )}
                                                {step === 2 && (
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Body Status</label>
                                                                <input type="text" className="form-control" placeholder="Enter Body Status" value={formData.bodystatus} name='bodystatus' onChange={handleChange} />
                                                                {errors.bodystatus && <p className='input-errormsg'>{errors.bodystatus}</p>}
                                                            </div>
                                                            {/* Height */}
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Height</label>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter height"
                                                                        value={formData.height.replace(/(cm|inches)$/, "")} // numeric only
                                                                        onChange={(e) => {
                                                                            const number = e.target.value.replace(/\D/g, ""); // keep only digits
                                                                            const unit = formData.height.match(/(cm|inches)$/)?.[0] || "";
                                                                            setFormData({ ...formData, height: number + unit });
                                                                        }}
                                                                        onKeyDown={allowOnlyNumbers}
                                                                    />
                                                                    <select
                                                                        className="form-select"
                                                                        style={{ width: "10px" }}
                                                                        value={formData.height.match(/(cm|inches)$/)?.[0] || ""}
                                                                        onChange={(e) => {
                                                                            const number = formData.height.replace(/(cm|inches)$/, "");
                                                                            setFormData({ ...formData, height: number + e.target.value });
                                                                        }}
                                                                    >
                                                                        {/* <option value="" disabled>Unit</option> */}
                                                                        <option value="cm">cm</option>
                                                                        <option value="inches">inches</option>
                                                                    </select>
                                                                </div>
                                                                {errors.height && <p className="input-errormsg">{errors.height}</p>}
                                                            </div>

                                                            {/* Weight */}
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Weight</label>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter weight"
                                                                        value={formData.weight.replace(/(kg|pounds)$/, "")}
                                                                        onChange={(e) => {
                                                                            const number = e.target.value.replace(/\D/g, "");
                                                                            const unit = formData.weight.match(/(kg|pounds)$/)?.[0] || "";
                                                                            setFormData({ ...formData, weight: number + unit });
                                                                        }}
                                                                        onKeyDown={allowOnlyNumbers}
                                                                    />
                                                                    <span className="input-group-text">pounds</span>
                                                                    {/* <select
                                                                        className="form-select"
                                                                        value={formData.weight.match(/(kg|pounds)$/)?.[0] || ""}
                                                                        onChange={(e) => {
                                                                            const number = formData.weight.replace(/(kg|pounds)$/, "");
                                                                            setFormData({ ...formData, weight: number + e.target.value });
                                                                        }}
                                                                    >
                                                                        <option value="" disabled>Unit</option>
                                                                        <option value="kg">kg</option>
                                                                        <option value="pounds">pounds</option>
                                                                    </select> */}
                                                                </div>
                                                                {errors.weight && <p className="input-errormsg">{errors.weight}</p>}
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Hair Color</label>
                                                                <input type="text" className="form-control" placeholder="Enter Hair Color" name='haircolour' value={formData.haircolour} onChange={handleChange} />
                                                                {errors.haircolor && <p className='input-errormsg'>{errors.haircolor}</p>}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Eye Color</label>
                                                                <input type="text" className="form-control" placeholder="Enter Eye Color" name='eyecolour' value={formData.eyecolour} onChange={handleChange} />
                                                                {errors.eyecolor && <p className='input-errormsg'>{errors.eyecolor}</p>}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Title *</label>
                                                                <input type="text" className="form-control" placeholder="Enter Title" name='title' required value={formData.title} onChange={handleChange} />
                                                                {errors.title && <p className='input-errormsg'>{errors.title}</p>}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Price</label>
                                                                <input type="number" className="form-control" placeholder="Enter Price" name='price' value={formData.price} onChange={handleChange} />
                                                                {errors.price && <p className='input-errormsg'>{errors.price}</p>}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {step === 3 && (
                                                    <>
                                                        <div className="mb-3">
                                                            <label className="form-label">Description *</label>
                                                            <textarea className="form-control" rows="3" placeholder="Enter Description" name='description' value={formData.description} onChange={handleChange} required></textarea>
                                                            {errors.description && <p className='input-errormsg'>{errors.description}</p>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Upload Images *</label>
                                                            <div className="d-flex flex-wrap gap-2 justify-content-center image-upload-container">
                                                                <div className="image-upload">
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        name="images"
                                                                        multiple
                                                                        onChange={handleImageUpload}
                                                                    />
                                                                    <i className="fa-solid fa-camera-retro" style={{ fontSize: "2rem", color: "#4b164c" }}></i>
                                                                </div>

                                                                {images.map((img, index) => (
                                                                    <div key={index} className="image-upload position-relative">
                                                                        {loading[index] ? (
                                                                            <span>Loading...</span>
                                                                        ) : (
                                                                            <>
                                                                                <img src={img} alt="Preview" className="previewImage" />
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-sm btn-danger rounded-3 position-absolute top-0 end-0 me-0"
                                                                                    onClick={() => handleRemoveImage(index)}
                                                                                    style={{
                                                                                        padding: '0.1rem 0.3rem',
                                                                                        fontSize: '0.8rem'
                                                                                    }}
                                                                                >
                                                                                    ✕
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {errors.images && <p className='input-errormsg'>{errors.images}</p>}
                                                        </div>
                                                        <div className="text-center">
                                                            {/* <h5 className="mb-4 fw-bold">This ad will cost <span className="text-dd88cf">$20</span></h5> */}
                                                            <button type="submit" className="btn btn-custom text-white px-5 py-2 mb-4" onClick={handleShow}>
                                                                {btnLoading ? "Processing..." : "Submit"}
                                                            </button>
                                                            {errorMessage && (
                                                                <h5 className="mt-2 text-danger">{errorMessage}</h5>
                                                            )}
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
                            ) : (
                                <div className="text-center p-4 border rounded-4 bg-light">
                                    <div className="row">
                                        <div className="col-lg-4 mx-auto">
                                            <img src={cheersImg.src} alt="" className="w-100" />
                                        </div>
                                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                                            <div className="">
                                                <h1 className='pacifico-regular'>Thank you!</h1>
                                                <p>Your ad has been successfully posted.</p>

                                                <div className="justify-content-center gap-3 my-4">
                                                    <Link href="/" className="btn btn-login text-4b164c bg-ffdef7 fw-semibold rounded-pill py-2 px-3">
                                                        Go to Home
                                                    </Link>
                                                    <button className="btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill py-xxl-2 px-xxl-3" onClick={() => window.location.reload()}>
                                                        Post More Ad
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ProtectedRoute(AdPost)