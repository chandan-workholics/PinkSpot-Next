"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

import filterImg from "../../../public/images/filterImg2.png";

const AllCategory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [category, setCategory] = useState([])
    const [ethicity, setEthicity] = useState([]);
    const [city, setCity] = useState([]);

    const [subcategory, setSubcategory] = useState([]);

    const [filtercategory, setfilterCategory] = useState('')
    const [filterethicity, setfilterEthicity] = useState('');
    const [filtercity, setfilterCity] = useState('');
    const [filtervarified, setfilterVarified] = useState(true);
    const [filtersubcategory, setfilterSubcategory] = useState('');

    const [post, setPost] = useState([]);

    const fetchCategory = async () => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/category/getallcategory`);
        const result = await response.json();
        setCategory(result?.data);
    };

    const fetchSubcategories = async (id) => {
        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/category/getsubcategorybycatid/${id}`
        );
        const result = await response.json();
        setSubcategory(result?.data);
    };


    const fetchEthnicity = async () => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getall-ethnicity`);
        const result = await response.json();
        setEthicity(result?.data);
    };

    const fetchCities = async (provinceId) => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getallcity`);
        const result = await response.json();
        setCity(result?.data);
    };

    useEffect(() => {
        fetchCategory();
        fetchEthnicity();
        fetchCities();
    }, []);


    const fetchFilteredPosts = async () => {
        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/filter/getPostAdByCategoryfilterPagination?page=${currentPage}&limit=${itemsPerPage}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryid: filtercategory,
                    subcategoryid: filtersubcategory,
                    city: filtercity,
                    ethicity: filterethicity,
                    isVerified: filtervarified,
                }),
            }
        );
        const result = await response.json();
        setPost((prevEvents) => [...prevEvents, ...result?.data]);
        
    };

    useEffect(() => {
        fetchFilteredPosts();
    }, [currentPage]);




    const handleinfintescroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
            ) {
                setCurrentPage((prev) => prev + 1)
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleinfintescroll)
        return () => window.removeEventListener("scroll", handleinfintescroll)
    })

    return (
        <>
            <div className="container-fluid p-0">
                <div className="category-page bg-ffdef7">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">All Category</h1>
                                    <h3 className="text-white">
                                        Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i> All Category
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container py-5 filterSection">

                        <div className="p-2 mb-5 rounded-5 border-0 shadow-lg w-100">
                            <div className="bg-4b164c rounded-5 p-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="">
                                            <img src={filterImg.src} alt="" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="subcategoryid"

                                                    onChange={(e) => {
                                                        setfilterCategory(e.target.value);
                                                        fetchSubcategories(e.target.value); // Fetch subcategories when a category is selected
                                                    }}
                                                >
                                                    <option>Category</option>
                                                    {category.map((val, index) => (
                                                        <option key={index} value={val._id} >
                                                            {val.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="subcategoryid"

                                                    onChange={(e) => setfilterSubcategory(e.target.value)}
                                                >
                                                    <option>Sub-Category</option>
                                                    {subcategory.map((val, index) => (
                                                        <option key={index} value={val._id}>
                                                            {val.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="subcategoryid"

                                                    onChange={(e) => setfilterEthicity(e.target.value)}
                                                >
                                                    <option>Ethicity</option>
                                                    {ethicity.map((val, index) => (
                                                        <option key={index} value={val._id}>
                                                            {val.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="subcategoryid"

                                                    onChange={(e) => setfilterCity(e.target.value)}
                                                >
                                                    <option>city</option>
                                                    {city.map((val, index) => (
                                                        <option key={index} value={val._id}>
                                                            {val.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="subcategoryid"
                                                    onChange={(e) => setfilterVarified(e.target.value === "true")}
                                                >
                                                    <option value="">is-Verified</option>
                                                    <option value="true">yes</option>
                                                    <option value="false">no</option>
                                                </select>

                                            </div>
                                            <div className="col-md-12">
                                                <button
                                                    className="btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-2 py-2 px-4"
                                                    onClick={fetchFilteredPosts}
                                                >
                                                    <i className="fa-solid fa-magnifying-glass me-1"></i>
                                                    Search
                                                </button>
                                                <button
                                                    className="btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill py-2 px-4"
                                                    onClick={fetchFilteredPosts}
                                                >
                                                    <i className="fa-solid fa-ban me-1"></i>
                                                    Clear
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Filters */}


                        {/* Posts Section */}
                        <div className="container box-detail" style={{ minHeight: "100vh" }}>
                            {/* Mobile View */}
                            <div className="row d-block d-md-none">
                                {post?.map((val, index) =>
                                    val.isActive ? (
                                        <div className="col-md-3" key={index}>
                                            <Link
                                                href={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`}
                                                state={{ data: val }}
                                                className={`categeory-card ${val.highlight ? "highlight-box" : null
                                                    }`}
                                            >
                                                <div className="img-box">
                                                    <img
                                                        src={val.image1}
                                                        // onError={(e) => {
                                                        //     e.target.src = defaultImage;
                                                        // }}
                                                        alt="Img"
                                                    />
                                                </div>
                                                <div className="card-text" style={{ overflow: "hidden" }}>
                                                    <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                                                        {val?.title}
                                                    </h6>
                                                    <span>{val?.name}</span>
                                                    <br />
                                                    <span className="text-capitalize">
                                                        {val?.city}, {val?.provincesid?.name}
                                                    </span>
                                                    <br />
                                                    <span>{val?.age}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : null
                                )}
                            </div>

                            {/* Desktop View */}
                            <div className="d-none-mobile row">
                                {post?.map((val, index) =>
                                    val.isActive ? (
                                        <div className="col-md-3" key={index}>
                                            <Link
                                                href={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`}
                                                state={{ data: val }}
                                            >
                                                <div
                                                    className={`card mb-4 ${val.highlight ? "highlight-box" : null
                                                        }`}
                                                >
                                                    <div className="card-box">
                                                        <div className="card-img">
                                                            <img
                                                                src={val.image1}
                                                                className="card-img-top"
                                                                alt="..."
                                                            />
                                                        </div>
                                                        <div className="card-content shadow-lg">
                                                            <h3 className="per-name">{val?.name}</h3>
                                                            <h4 className="per-ethnicity">{val?.ethicity}</h4>
                                                            <h4 className="per-age">Age : {val?.age}</h4>
                                                            <h5 className="per-city">
                                                                <span>
                                                                    <i className="fa-solid fa-location-dot"></i>
                                                                </span>{" "}
                                                                {val?.city}
                                                            </h5>
                                                            <h4 className="per-descriptn">{val?.title}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : null
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AllCategory;
