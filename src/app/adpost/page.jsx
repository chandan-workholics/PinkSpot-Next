// "use client"
// import React, { useEffect, useState } from 'react';
// import { motion } from "framer-motion";
// import Link from 'next/link'
// import Image from 'next/image';
// import Footer from '../components/footer/Footer'
// import Header from '../components/header/Header'
// import AdPostFormImg from "../../../public/images/adpost-formImg.png";
// import callAPI from '../Common_Method/api';
// import axios from 'axios';
// import ProtectedRoute from '../Common_Method/protectedroute';

// const AdPost = () => {
//     const [category, setCategory] = useState('');
//     const [subcategories, setSubcategories] = useState([]);
//     const [images, setImages] = useState(Array(20).fill(null));
//     const [loading, setLoading] = useState([]);
//     const [errors, setErrors] = useState({});
//     const [province, Setprovince] = useState('')
//     const [ethicity, Setethicity] = useState('')
//     const [data, Setdata] = useState('');
//     const [provincesid, setprovincesid] = useState('');
//     const [provincesname, setprovincesname] = useState('');
//     const [alertcity, setalertcity] = useState(false);
//     const [emptyFields, setEmptyFields] = useState([]);


//     const [step, setStep] = useState(1);
//     const totalSteps = 4;
//     const [formData, setFormData] = useState({
//         name: "",
//         age: "",
//         city: "",
//         mobile: "",
//         province: "",
//         availability: "",
//         ethnicity: "",
//         status: "",
//         height: "",
//         weight: "",
//         haircolor: "",
//         eyecolor: "",
//         adTitle: "",
//         price: "",
//         description: "",
//         images: [null]
//     });

//     const nextStep = () => {
//         if (step < totalSteps) setStep(step + 1);
//     };

//     const prevStep = () => {
//         if (step > 1) setStep(step - 1);
//     };

//     const [user, setUser] = useState({
//         name: "",
//         age: "",
//         city: "",
//         ethnicity: "",
//         availability: "",
//         bodystatus: "",
//         phone: "",
//         height: "",
//         weight: "",
//         haircolor: "",
//         eyecolor: "",
//         title: "",
//         description: "",
//         price: "",
//         images: []
//     });

//     const handleShow = () => {
//        try {
//         if (!user) {
//             console.error("User object is undefined");
//             return;
//         }

//         const {
//             name, age, city, ethnicity, availability, bodystatus, phone, height, weight,
//             haircolor, eyecolor, title, description, price, images
//         } = user;

//         const emptyFieldsList = [];

//         if (!name) emptyFieldsList.push('name');
//         if (!age) emptyFieldsList.push('age');
//         if (!city) emptyFieldsList.push('city');
//         if (!availability) emptyFieldsList.push('availability');
//         if (!phone) emptyFieldsList.push('phone');
//         if (!title) emptyFieldsList.push('title');
//         if (!description) emptyFieldsList.push('description');
//         if (!bodystatus) emptyFieldsList.push('bodystatus');
//         if (!height) emptyFieldsList.push('height');
//         if (!weight) emptyFieldsList.push('weight');
//         if (!haircolor) emptyFieldsList.push('haircolor');
//         if (!eyecolor) emptyFieldsList.push('eyecolor');
//         if (!price) emptyFieldsList.push('price');
//         if (!images || images.length === 0) emptyFieldsList.push('images');

//         setEmptyFields(emptyFieldsList);

//         if (emptyFieldsList.length > 0) {
//             const firstEmptyField = document.querySelector(`[name=${emptyFieldsList[0]}]`);
//             if (firstEmptyField) {
//                 firstEmptyField.scrollIntoView({ behavior: 'smooth' });
//             }
//         }
//        } catch (error) {
//         console.log(error,"Error while submitting form");
//        }
//     };


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setErrors({ ...errors, [name]: "" });
//     };

//     const handleImageUpload = async (index, event) => {
//         const file = event.target.files[0];
//         if (!file) return;
//         const maxSize = 1024 * 1024 * 1024; // 1GB limit
//         if (file.size > maxSize) {
//             alert("File size exceeds the maximum limit.");
//             return;
//         }
//         setLoading((prev) => ({ ...prev, [index]: true }));
//         const formData = new FormData();
//         formData.append("image", file);
//         try {
//             const response = await axios.post("http://206.189.130.102:4000/upload", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             if (response.data?.data?.url) {
//                 const newImages = [...images];
//                 newImages[index] = response.data.data.url;
//                 setImages(newImages);
//             }
//         } catch (error) {
//             console.error("Upload failed:", error);
//         } finally {
//             setLoading((prev) => ({ ...prev, [index]: false }));
//         }
//     };


//     const getCategory = async () => {
//         try {
//             const response = await callAPI.get(`/category/getallcategory`);

//             if (response.data) {
//                 setCategory(response.data || []);
//             } else {
//                 console.error("Unexpected response format", response);
//                 setCategory([]);
//             }
//         } catch (error) {
//             console.error("Error fetching categories", error);
//             setCategory([]);
//         }
//     };

//     const fetchSubCategories = async () => {
//         try {
//             const response = await callAPI.get("/category/getallcategory");
//             if (response.data.status === "success" && response.data.data.length > 0) {
//                 const allSubcategories = response.data.data.flatMap(category => category.subcategoriesId || []);
//                 setSubcategories(allSubcategories);
//             }
//         } catch (error) {
//             console.error("Error fetching subcategories:", error);
//         }
//     };

//     const validateForm = () => {
//         let tempErrors = {};
//         if (step === 1) {
//             if (!formData.category) tempErrors.category = "Category is required";
//             if (!formData.subCategory) tempErrors.subCategory = "Sub Category is required";
//         } else if (step === 2) {
//             if (!formData.name) tempErrors.name = "Name is required";
//             if (!formData.age || isNaN(formData.age) || formData.age <= 0)
//                 tempErrors.age = "Enter a valid age";
//             if (!formData.city) tempErrors.city = "City is required";
//             if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
//                 tempErrors.mobile = "Enter a valid 10-digit number";
//             if (!formData.province) tempErrors.province = "Province is required";
//             if (!formData.availability) tempErrors.availability = "Availability is required";
//         } else if (step === 3) {
//             if (!formData.adTitle) tempErrors.adTitle = "Ad Title is required";
//         } else if (step === 4) {
//             if (!formData.description) tempErrors.description = "Description is required";
//             if (!formData.images.some(img => img !== null)) tempErrors.images = "At least one image is required";
//         }
//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             console.log("Form submitted successfully", formData);
//         }
//     };

//     const getprovince = async () => {
//         try {
//             const response = await callAPI.get(`/getallprovince`);
//             Setprovince(response.data || []);
//         } catch (error) {
//             console.error("Error fetching provinces:", error);
//             Setprovince([]);
//         }
//     };

//     const getethnicity = async () => {
//         try {
//             const response = await callAPI.get(`/getall-ethnicity`);
//             if (response?.data) {
//                 Setethicity(response.data || []);
//             }
//         } catch (error) {
//             console.error("Error fetching ethnicity:", error);
//             Setethicity([]);
//         }
//     };

//     const getcity = async (e) => {
//         try {
//             const id = e.target.value;
//             setprovincesid(id);
//             const response = await callAPI.get(`/getallcity/${id}`);
//             if (response?.data) {
//                 Setdata(response.data || []);
//             }
//         } catch (error) {
//             console.error("Error fetching cities:", error);
//             Setdata([]);
//         }
//     };


//     const getcity2 = async (id, name) => {
//         try {
//             setprovincesid(id);
//             setprovincesname(name);
//             const response = await callAPI.get(`/getallcity/${id}`);
//             if (response?.data) {
//                 Setdata(response.data || []);
//             }
//         } catch (error) {
//             console.error("Error fetching cities:", error);
//             Setdata([]);
//         }
//     };


//     useEffect(() => {
//         getCategory();
//         fetchSubCategories();
//         getprovince();
//         getethnicity();
//         getcity2()
//         window.scrollTo({ behavior: 'smooth', top: 0 })
//     }, [])

//     return (
//         <>
//             <div className="container-fluid p-0">
//                 <div className="adPost-page">
//                     <div className='home-banner'>
//                         <Header className="position-absolute w-100" />
//                         <div className="container">
//                             <div className="banner-content text-start">
//                                 <div className="">
//                                     <h1 className="text-white">Ad Post</h1>
//                                     <h3 className="text-white">
//                                         Home
//                                         <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i>
//                                         Ad Post
//                                     </h3>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="">
//                         <div className="container my-5">
//                             <div className="row justify-content-center">
//                                 <h2 className="text-center fw-bold text-4b164c mb-4">Fill Out the Form Below</h2>
//                                 <div className="col-lg-6 d-flex align-items-center">
//                                     <Image src={AdPostFormImg.src} alt="Profile" width={400} height={636} className="w-100 object-fit-contain" />
//                                 </div>
//                                 <div className="col-lg-6 d-flex align-items-center">
//                                     <div className="form-container w-100">
//                                         {/* Step Progress Bar */}
//                                         <div className="stepper-container d-flex justify-content-between align-items-center mb-4">
//                                             {[1, 2, 3, 4].map((s, index) => (
//                                                 <motion.div
//                                                     key={index}
//                                                     className={`step ${step >= s ? 'active' : ''}`}
//                                                     initial={{ opacity: 0.5 }}
//                                                     animate={{ opacity: step >= s ? 1 : 0.5 }}
//                                                     transition={{ duration: 0.3 }}
//                                                 >
//                                                     <motion.div
//                                                         className="step-circle"
//                                                         initial={{ scale: 0.8 }}
//                                                         animate={{ scale: step === s ? 1.2 : 1 }}
//                                                         transition={{ duration: 0.3 }}
//                                                         style={{
//                                                             backgroundColor: step >= s ? "#dd88cf" : "#ddd",
//                                                             color: step >= s ? "#fff" : "#000"
//                                                         }}
//                                                     >
//                                                         {step > s ? <i className="fa-solid fa-check text-white mt-1"></i> : s}
//                                                     </motion.div>
//                                                     <span className="step-label" style={{ color: step >= s ? "#6a0dad" : "#aaa" }}>Step {s}</span>
//                                                 </motion.div>
//                                             ))}
//                                         </div>

//                                         <form onSubmit={handleSubmit}>
//                                             {step === 1 && (
//                                                 <>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Category *</label>
//                                                             <select className="form-select" required>
// //                                                                 <option value="0">Open this select menu</option>
// //                                                                 {Array.isArray(category?.data) ? category?.data?.map((cat, index) => (
//                                                                 <option value="1" key={index}>{cat.name}</option>
//                                                             )) : <option>No category available</option>}
//                                                             </select>
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Sub Category *</label>
//                                                             <select className="form-select" required>
//                                                                 <option value="0">Open this select menu</option>
//                                                                 {subcategories?.map((subcategory) => (
//                                                                     <option key={subcategory._id} value={subcategory._id}>
//                                                                         {subcategory.name}
//                                                                     </option>
//                                                                 ))}
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}
//                                             {step === 2 && (
//                                                 <>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Name *</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Name" required />
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Age *</label>
//                                                             <input type="number" className="form-control" placeholder="Enter Age" required />
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">City *</label>
//                                                             <select className={`form-select ${alertcity ? 'emptyInput' : null}`} name='city' required>
//                                                                 <option>Select City</option>
//                                                                 {data?.data?.map((val, index) => {
//                                                                     return (
//                                                                         <option key={index} value={val.name}>{val.name.charAt(0).toUpperCase() + val.name.slice(1).toLowerCase()}</option>
//                                                                     )
//                                                                 })}
//                                                             </select>
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Mobile Number *</label>
//                                                             <input type="number" className="form-control" placeholder="Enter Mobile Number" required />
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Province *</label>
//                                                             <select className={`form-select ${alertcity ? 'emptyInput' : null}`} onChange={(e) => getcity2(e.target.value, e.target.options[e.target.selectedIndex].text)} required>
//                                                                 <option>Select Province</option>
//                                                                 {province?.data?.map((val, index) => {
//                                                                     return (
//                                                                         <option key={index} value={val._id}>{val.name}</option>
//                                                                     )
//                                                                 })}
//                                                             </select>
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Availability *</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Availability" required />
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Ethnicity</label>
//                                                             <select className="form-select">
//                                                                 {ethicity?.data?.map((val, index) => {
//                                                                     return (
//                                                                         <option key={index} value={val.name}>{val.name.charAt(0).toUpperCase() + val.name.slice(1).toLowerCase()}</option>
//                                                                     )
//                                                                 })}
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}
//                                             {step === 3 && (
//                                                 <>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Body Stats</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Body Status" onChange={handleChange} />
//                                                             {errors.status && <p className="text-danger">{errors.status}</p>}
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Height</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Height" onChange={handleChange} />
//                                                             {errors.height && <p className="text-danger">{errors.height}</p>}
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Weight</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Weight" onChange={handleChange} />
//                                                             {errors.weight && <p className="text-danger">{errors.weight}</p>}
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Hair Color</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Hair Color" onChange={handleChange} />
//                                                             {errors.haircolor && <p className="text-danger">{errors.haircolor}</p>}
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Eye Color</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Eye Color" onChange={handleChange} />
//                                                             {errors.eyecolor && <p className="text-danger">{errors.eyecolor}</p>}
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Ad Title *</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Title" required onChange={handleChange} />
//                                                             {errors.adTitle && <p className="text-danger">{errors.adTitle}</p>}
//                                                         </div>
//                                                         <div className="col-md-6 mb-3">
//                                                             <label className="form-label">Price</label>
//                                                             <input type="text" className="form-control" placeholder="Enter Price" onChange={handleChange} />
//                                                             {errors.price && <p className="text-danger">{errors.price}</p>}
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}
//                                             {step === 4 && (
//                                                 <>
//                                                     <div className="mb-3">
//                                                         <label className="form-label">Description *</label>
//                                                         <textarea className="form-control" rows="3" placeholder="Enter Description" onChange={handleChange} required></textarea>
//                                                         {errors.description && <p className="text-danger">{errors.description}</p>}
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label className="form-label">Upload Images</label>
//                                                         <div className="d-flex flex-wrap gap-2 justify-content-center image-upload-container">
//                                                             {images.map((img, index) => (
//                                                                 <div key={index} className="image-upload">
//                                                                     <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
//                                                                     {loading[index] ? (
//                                                                         <span>Loading...</span>
//                                                                     ) : img ? (
//                                                                         <img src={img} alt="Preview" className="previewImage" />
//                                                                     ) : (
//                                                                         <i className="fa-solid fa-camera-retro" style={{ fontSize: "2rem", color: "#4b164c" }}></i>
//                                                                     )}
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-center">
//                                                         <button type="submit" className="btn btn-custom text-white px-5 py-2" onClick={handleShow}>Submit</button>
//                                                     </div>
//                                                 </>
//                                             )}
//                                             <div className="d-flex justify-content-between mt-4">
//                                                 {step > 1 && <button type="button" className="btn btn-secondary rounded-5" onClick={prevStep}>Previous</button>}
//                                                 {step < totalSteps && <button type="button" className="btn bg-4b164c text-white px-4 rounded-pill" onClick={nextStep}>Next</button>}
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         </>
//     )
// }

// export default ProtectedRoute(AdPost)

"use client"
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link'
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
    const [images, setImages] = useState(Array(20).fill(null));
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
        category: "",
        subCategory: "",
        name: "",
        age: "",
        city: "",
        phone: "",
        province: "",
        availability: "",
        ethnicity: "",
        status: "",
        height: "",
        weight: "",
        haircolor: "",
        eyecolor: "",
        adTitle: "",
        price: "",
        description: "",
        images: [null]
    });

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const [user, setUser] = useState({
        category: "",
        subCategory: "",
        name: "",
        age: "",
        city: "",
        ethnicity: "",
        availability: "",
        bodystatus: "",
        phone: "",
        height: "",
        weight: "",
        haircolor: "",
        eyecolor: "",
        title: "",
        description: "",
        price: "",
        images: [null]
    });

    const handleShow = () => {
        try {
            if (!formData || typeof formData !== "object") {
                console.error("Form data is undefined or not an object");
                return;
            }

            console.log("Form data:", formData);

            const {
                name, age, city, availability, phone, adTitle, description,
                status, height, weight, haircolor, eyecolor, price, images
            } = formData;

            const emptyFieldsList = Object.entries({
                name, age, city, availability, phone, adTitle, description,
                status, height, weight, haircolor, eyecolor, price,
                images: images && images.length > 0 ? images : null,
            })
                .filter(([_, value]) => !value)
                .map(([key]) => key);

            if (emptyFieldsList.length > 0) {
                console.warn("Missing fields:", emptyFieldsList.join(", "));
                setEmptyFields(emptyFieldsList);

                // Scroll to first empty field
                const firstEmptyField = document.querySelector(`[name="${emptyFieldsList[0]}"]`);
                if (firstEmptyField) {
                    firstEmptyField.scrollIntoView({ behavior: "smooth", block: "center" });
                    firstEmptyField.focus();
                }
                return;
            }
           alert("form submitting successfully")
            console.log("Form is complete. Proceeding...");
        } catch (error) {
            console.error("Error while checking form fields:", error);
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = async (index, event) => {
        const file = event.target.files[0];
        if (!file) return;
        const maxSize = 1024 * 1024 * 1024; // 1GB limit
        if (file.size > maxSize) {
            alert("File size exceeds the maximum limit.");
            return;
        }
    
        setLoading((prev) => ({ ...prev, [index]: true }));
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const response = await axios.post("http://206.189.130.102:4000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            console.log("Upload Response:", response.data); 
    
            const imageUrl = response.data?.data?.url;  
            if (imageUrl) {
                setImages((prevImages) => {
                    const newImages = [...prevImages];
                    newImages[index] = imageUrl;
                    return newImages;
                });
            } else {
                console.error("Image URL not found in response.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else if (error.request) {
                console.error("No Response from Server:", error.request);
            } else {
                console.error("Error:", error.message);
            }
        } finally {
            setLoading((prev) => ({ ...prev, [index]: false }));
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
            if (!formData.subCategory) tempErrors.subCategory = "Sub Category is required";
        } else if (step === 2) {
            if (!formData.name) tempErrors.name = "Name is required";
            if (!formData.age || isNaN(formData.age) || formData.age <= 0)
                tempErrors.age = "Enter a valid age";
            // if (!formData.city) tempErrors.city = "City is required";
            if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
                tempErrors.mobile = "Enter a valid 10-digit number";
            if (!formData.province) tempErrors.province = "Province is required";
            if (!formData.availability) tempErrors.availability = "Availability is required";
        } else if (step === 3) {
            if (!formData.adTitle) tempErrors.adTitle = "Ad Title is required";
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

    const getcity = async (e) => {
        try {
            const id = e.target.value;
            setprovincesid(id);
            const response = await callAPI.get(`/getallcity/${id}`);
            if (response?.data) {
                Setdata(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            Setdata([]);
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
                                    <Image src={AdPostFormImg.src} alt="Profile" width={400} height={636} className="w-100 object-fit-contain adpost-leftImg"  />
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
                                                                        <option value={cat.id} key={index}>{cat.name}</option>
                                                                    ))
                                                                ) : (
                                                                    <option disabled>No category available</option>
                                                                )}
                                                            </select>
                                                            {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                                                        </div>

                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Sub Category *</label>
                                                            <select className="form-select" name='subCategory' value={formData.subCategory} onChange={handleChange} required>
                                                                <option value="0">Open this select menu</option>
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
                                                            <label className="form-label">Province *</label>
                                                            <select
                                                                className={`form-select ${alertcity ? 'emptyInput' : ''}`}
                                                                name="province"
                                                                value={formData.province || ""}
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
                                                            <label className="form-label">Availability *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Availability" name='availability' value={formData.availability} onChange={handleChange} required />
                                                        </div>
                                                        {errors.availability && <p>{errors.availability}</p>}
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Ethnicity</label>
                                                            <select
                                                                className="form-select"
                                                                name="ethnicity"
                                                                value={formData.ethnicity}
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
                                                            <label className="form-label">Body Stats</label>
                                                            <input type="text" className="form-control" placeholder="Enter Body Stats" value={formData.status} name='status' onChange={handleChange} />
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
                                                            <input type="text" className="form-control" placeholder="Enter Hair Color" name='haircolor' value={formData.haircolor} onChange={handleChange} />
                                                            {errors.haircolor && <p className="text-danger">{errors.haircolor}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Eye Color</label>
                                                            <input type="text" className="form-control" placeholder="Enter Eye Color" name='eyecolor' value={formData.eyecolor} onChange={handleChange} />
                                                            {errors.eyecolor && <p className="text-danger">{errors.eyecolor}</p>}
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Ad Title *</label>
                                                            <input type="text" className="form-control" placeholder="Enter Title" name='adTitle' required value={formData.adTitle} onChange={handleChange} />
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
                                                                    <input type="file" accept="image/*" name='images' value={formData.images} onChange={(e) => handleImageUpload(index, e)} />
                                                                    {loading[index] ? (
                                                                        <span>Loading...</span>
                                                                    ) : img ? (
                                                                        <img src={img} alt="Preview" className="previewImage" />
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