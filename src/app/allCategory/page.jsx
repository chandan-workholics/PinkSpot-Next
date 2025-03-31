"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useParams } from "next/navigation";

const AllCategory = () => {
    const { category } = useParams();
    const [catid, setCatid] = useState("6448f0807e958facc31c4d78");
    const [province, setProvince] = useState([]);
    const [ethicity, setEthicity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);
    const [filters, setFilters] = useState({
        categoryid: catid,
        subcategoryid: "",
        city: "",
        ethicity: "",
        isVerified: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Access sessionStorage only in the browser
            const savedCity = sessionStorage.getItem("city");
            if (savedCity) {
                setFilters((prev) => ({ ...prev, city: savedCity }));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        if (name === "city" && typeof window !== "undefined") {
            sessionStorage.setItem("city", value);
        }
    };

    const clearFilters = () => {
        if (typeof window !== "undefined") {
            sessionStorage.clear();
        }
        setFilters({
            categoryid: catid,
            subcategoryid: "",
            city: "",
            ethicity: "",
            isVerified: "",
        });
        setIsLoading(true);
        fetchFilteredPosts();
    };

    const fetchCategoryBySlug = async () => {
        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/category/getCatageryIdBySlug/${category}`
        );
        const result = await response.json();
        setCatid(result?.catgoryid);
    };

    const fetchSubcategories = async () => {
        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/category/getsubcategorybycatid/${catid}`
        );
        const result = await response.json();
        setSubcategory(result);
    };

    const fetchPostsByCategory = async () => {
        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/postad/getpostadby_category_id/${catid}`
        );
        const result = await response.json();
        setPost(result?.data);
        setIsLoading(false);
    };

    const fetchFilteredPosts = async () => {
        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/filter/getPostAdByCategoryfilter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filters),
            }
        );
        const result = await response.json();
        setPost(result?.data);
        setIsLoading(false);
    };

    const fetchEthnicity = async () => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getall-ethnicity`);
        const result = await response.json();
        setEthicity(result?.data);
    };

    const fetchProvinces = async () => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getallprovince`);
        const result = await response.json();
        setProvince(result);
    };

    const fetchCities = async (provinceId) => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getallcity/${provinceId}`);
        const result = await response.json();
        setData(result);
    };

    useEffect(() => {
        fetchCategoryBySlug();
        fetchProvinces();
        fetchEthnicity();
        fetchFilteredPosts();
        fetchSubcategories();
    }, [catid]);

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        sessionStorage.setItem("province", provinceId);
        fetchCities(provinceId);
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="category-page bg-ffdef7">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">Single Profile</h1>
                                    <h3 className="text-white">
                                        Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i> Single Profile
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-2">
                        {/* Filters */}
                        <div className="row bg-4b164c rounded-0 rounded-lg-pill py-3 px-2 my-5">
                            <div className="col-md-2">
                                <select
                                    className="form-select filter-btn"
                                    name="subcategoryid"
                                    value={filters.subcategoryid}
                                    onChange={handleChange}
                                    // style={{
                                    //     borderTopLeftRadius: "18px",
                                    //     borderBottomLeftRadius: "18px"
                                    // }}
                                >
                                    <option>Sub-Category</option>
                                    {subcategory.data?.map((val, index) => (
                                        <option key={index} value={val._id}>
                                            {val.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select" aria-label="Default select example">
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select" aria-label="Default select example">
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select" aria-label="Default select example">
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select" aria-label="Default select example">
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button
                                    className="btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-2 px-3"
                                    onClick={fetchFilteredPosts}
                                >
                                    <i className="fa-solid fa-magnifying-glass me-1"></i>
                                    Search
                                </button>
                                <button
                                    className="btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill ps-2 pe-3"
                                    onClick={fetchFilteredPosts}
                                >
                                    <i className="fa-solid fa-ban me-1"></i>
                                    Clear
                                </button>
                            </div>
                        </div>

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
                                {post.length > 0 ? null : (
                                    <div className="text-center text-secondary">
                                        <b>No Data Found</b>
                                    </div>
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
