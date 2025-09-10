"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import filterImg from "../../../public/images/filterImg2.png";
import { useSearchParams } from 'next/navigation';


const AllCategoryClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryProvince = searchParams.get('province');
    const queryCity = searchParams.get('city');

    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);

    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [ethicity, setEthicity] = useState([]);

    const [post, setPost] = useState([]);
    const [seoData, setSeoData] = useState({});

    const [filters, setFilters] = useState({
        categoryid: '',
        subcategoryid: '',
        province: queryProvince || '',
        city: queryCity || '',
        ethicity: '',
        isVerified: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const adsPerPage = 20;

    // Calculate indexes
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = post.slice(indexOfFirstAd, indexOfLastAd);

    const totalPages = Math.ceil(post.length / adsPerPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);


    const fetchCategory = async () => {
        const response = await fetch(`https://pinkspot.cc/api/v1/category/getallcategory`);
        const result = await response.json();
        setCategory(result?.data);
    };

    const fetchSubcategories = async (id) => {
        const response = await fetch(
            `https://pinkspot.cc/api/v1/category/getsubcategorybycatid/${id}`
        );
        const result = await response.json();
        setSubcategory(result?.data);
    };

    const fetchProvince = async () => {
        const response = await fetch(`https://pinkspot.cc/api/v1/getallprovince`);
        const result = await response.json();
        setProvince(result?.data);
    };

    const fetchCities = async (provinceId) => {
        const response = await fetch(`https://pinkspot.cc/api/v1/getallcity/${provinceId}`);
        const result = await response.json();
        setCity(result?.data);
        return result?.data || [];
    };

    const fetchEthnicity = async () => {
        const response = await fetch(`https://pinkspot.cc/api/v1/getall-ethnicity`);
        const result = await response.json();
        setEthicity(result?.data);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const fetchSeoData = async () => {
        const response = await fetch(`https://pinkspot.cc/api/v1/category/getallcategory`);
        const result = await response.json();
        setSeoData(result?.data || {});
    };

    useEffect(() => {
        fetchCategory();
        fetchEthnicity();
        fetchProvince();
        fetchFilteredPosts();
        fetchSeoData();
    }, []);


    // Fetch posts (filtered or not)
    const fetchFilteredPosts = async () => {

        const response = await fetch(
            `https://pinkspot.cc/api/v1/filter/getPostAdByCategoryfilterPagination`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filters),
            }
        );
        const result = await response.json();
        setPost(result?.data || []);
    };


    // Clear filters
    const handleClearFilters = () => {
        const cleared = {
            categoryid: '',
            subcategoryid: '',
            province: '',
            city: '',
            ethicity: '',
            isVerified: '',
        };
        setFilters(cleared);
        fetchFilteredPosts();
    };


    return (
        <>
            <div className="container-fluid p-0">
                <div className="category-page bg-ffdef7">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        {/* <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">All Category</h1>
                                    <h3 className="text-white">
                                        Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i> All Category
                                    </h3>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="">
                        <button
                            onClick={() => router.back()} // 🔹 navigate to previous page
                            className="btn btn-light shadow-sm m-3"
                        >
                            <i className="fa-solid fa-arrow-left me-2"></i> Back
                        </button>
                    </div>

                    <div className="container pt-3 pb-5 filterSection">
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
                                            {/* <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="category"
                                                    value={filters.categoryid}
                                                    onChange={(e) => {
                                                        handleFilterChange('categoryid', e.target.value);
                                                        fetchSubcategories(e.target.value);
                                                    }}
                                                >
                                                    <option value="">Category</option>
                                                    {category.map((val, index) => (
                                                        <option key={index} value={val._id}>{val.name}</option>
                                                    ))}
                                                </select>
                                            </div> */}

                                            {/* <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="subcategory"
                                                    value={filters.subcategoryid}
                                                    onChange={(e) => handleFilterChange('subcategoryid', e.target.value)}
                                                >
                                                    <option value="">Sub-Category</option>
                                                    {subcategory.map((val, index) => (
                                                        <option key={index} value={val._id}>{val.name}</option>
                                                    ))}
                                                </select>
                                            </div> */}


                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="province"
                                                    value={filters.province}
                                                    onChange={(e) => {
                                                        handleFilterChange('province', e.target.value);
                                                        fetchCities(e.target.value);
                                                    }}
                                                >
                                                    <option value="">Province</option>
                                                    {province.map((val, index) => (
                                                        <option key={index} value={val._id}>{val.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="city"
                                                    value={filters.city}
                                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                                >
                                                    <option value="">City</option>
                                                    {city.map((val, index) => (
                                                        <option key={index} value={val.name}>{val.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="ethnicity"
                                                    value={filters.ethicity}
                                                    onChange={(e) => handleFilterChange('ethicity', e.target.value)}
                                                >
                                                    <option value="">Ethnicity</option>
                                                    {ethicity.map((val, index) => (
                                                        <option key={index} value={val.name}>
                                                            {val.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="isVerified"
                                                    value={filters.isVerified === undefined ? "" : filters.isVerified}
                                                    onChange={(e) => handleFilterChange('isVerified', e.target.value === "true" ? true : e.target.value === "false" ? false : undefined)}
                                                >
                                                    <option value="">Is-Verified</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>

                                            </div> */}
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
                                                    onClick={handleClearFilters}
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
                        <div className="container box-detail">
                            {/* Mobile View */}
                            <div className="row d-block d-md-none">
                                {currentAds.length > 0 ? (
                                    currentAds.map((val, index) =>
                                        val.isActive ? (
                                            <div className="col-12 col-md-4 col-xl-3" key={index}>
                                                <Link
                                                    href={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`}
                                                    className={`categeory-card ${val.highlight ? "highlight-box" : ""}`}
                                                >
                                                    <div className="img-box">
                                                        <img src={val.image1} alt="Img" />
                                                    </div>
                                                    <div className="card-text" style={{ overflow: "hidden" }}>
                                                        <div className="d-flex mb-2">
                                                            <h6 className="mb-0 px-2 py-1 bg-4b164c text-white rounded-1">Escort</h6>
                                                        </div>
                                                        <h5 className="fw-bold">{val?.name}</h5>
                                                        <h6 className="text-capitalize">
                                                            <i className="fa-solid fa-house me-1"></i>
                                                            {val?.city}, {val?.provincesid?.name}
                                                        </h6>
                                                        {/* <h6>{val?.age}</h6> */}
                                                        <h6 className="mt-4" style={{ height: '95px', overflow: 'hidden' }}>
                                                            <i className="fa-solid fa-tags me-1"></i>
                                                            {val?.title}
                                                        </h6>
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : null
                                    )
                                ) : (
                                    <div className="col-12 text-center">
                                        <p>No data found</p>
                                    </div>
                                )}
                            </div>

                            {/* Desktop View */}
                            <div className="d-none-mobile row">
                                {currentAds.length > 0 ? (
                                    currentAds.map((val, index) =>
                                        val.isActive ? (
                                            <div className="col-12 col-md-4 col-xl-3" key={index}>
                                                <Link
                                                    href={`/profile/${val?.city.split(" ").join("-")}/${val?.slug}`}
                                                >
                                                    <div className={`card mb-4 ${val.highlight ? "highlight-box" : ""}`}>
                                                        <div className="card-box">
                                                            <div className="card-img">
                                                                <img src={val.image1} className="card-img-top" alt="..." />
                                                            </div>
                                                            <div className="card-content shadow-lg">
                                                                <h3 className="per-name">{val?.name}</h3>
                                                                <h4 className="per-ethnicity">{val?.ethicity}</h4>
                                                                <h4 className="per-age">Age : {val?.age}</h4>
                                                                <h5 className="per-city">
                                                                    <i className="fa-solid fa-location-dot"></i> {val?.city}
                                                                </h5>
                                                                <h4 className="per-descriptn">{val?.title}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : null
                                    )
                                ) : (
                                    <div className="col-12 text-center">
                                        <p>No data found</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {/* <div className="pagination d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <i class="fa-solid fa-angle-left"></i>
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        className={`btn mx-1 ${currentPage === i + 1 ? "active btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div> */}

                            <div className="pagination d-flex justify-content-center mt-4">
                                {/* Prev Button */}
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>

                                {/* Pages */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter((page) => {
                                        // ✅ Show first 2 and last 2 pages always
                                        if (page <= 2 || page > totalPages - 2) return true;
                                        // ✅ Show current, previous and next page
                                        if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                                        return false;
                                    })
                                    .map((page, idx, arr) => {
                                        // ✅ Add "..." if there is a gap
                                        const prevPage = arr[idx - 1];
                                        if (idx > 0 && page - prevPage > 1) {
                                            return (
                                                <React.Fragment key={page}>
                                                    <span className="mx-1">...</span>
                                                    <button
                                                        className={`btn mx-1 ${currentPage === page ? "active btn-primary" : "btn-outline-primary"
                                                            }`}
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                </React.Fragment>
                                            );
                                        }

                                        return (
                                            <button
                                                key={page}
                                                className={`btn mx-1 ${currentPage === page ? "active btn-primary" : "btn-outline-primary"
                                                    }`}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                {/* Next Button */}
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>


                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AllCategoryClient;
