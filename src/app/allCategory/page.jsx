"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useSearchParams } from 'next/navigation';
import filterImg from "../../../public/images/filterImg2.png";
import { useCity } from "../../context/CityContext.js";

const AllCategory = () => {
    const searchParams = useSearchParams();
    const queryProvince = searchParams.get('province');
    const queryCity = searchParams.get('city');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [category, setCategory] = useState([])
    const [city, setCity] = useState([]);
    const [province, setProvince] = useState([]);
    const [ethicity, setEthicity] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [hasUserAppliedFilters, setHasUserAppliedFilters] = useState(false);
    const [querySynced, setQuerySynced] = useState(false);
    const [post, setPost] = useState([]);
    const fromHeader = searchParams.get('from') === 'header';

    const [filters, setFilters] = useState({
        categoryid: '',
        subcategoryid: '',
        province: '',
        city: '',
        ethicity: '',
        isVerified: undefined,
    });

    const { footerSelectedCity } = useCity();
    const [filteredData, setFilteredData] = useState(null);
    const [footerFiltersApplied, setFooterFiltersApplied] = useState(false);
    const [isOnlyFilterMode, setIsOnlyFilterMode] = useState(false);

    const fetchCardsByCityOnly = async (cityName) => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/filter/getPostAdByCategoryfilterPagination?page=1&limit=50`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: cityName }),
        });
        const result = await response.json();
        setPost(result?.data || []);
    };

    useEffect(() => {
        if (footerSelectedCity && !hasUserAppliedFilters) {
            setFilters(prev => ({
                ...prev,
                city: footerSelectedCity,
                province: '', // Reset province to avoid conflict
            }));
            setIsOnlyFilterMode(true);
            fetchCardsByCityOnly(footerSelectedCity); // Directly fetch data
        }
    }, [footerSelectedCity]);

    useEffect(() => {
        if (footerSelectedCity) {
            fetch(`http://206.189.130.102:4000/api/v1/filter/getPostAdByCity`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": "your-api-key1",
                },
                body: JSON.stringify({ city: footerSelectedCity }),
            })
                .then(res => res.json())
                .then(data => setFilteredData(data));
        }
    }, [footerSelectedCity]);

    useEffect(() => {
        if (filters.city && isOnlyFilterMode && !hasUserAppliedFilters) {
            fetchCardsByCityOnly(filters.city);
        }
    }, [filters.city, isOnlyFilterMode, hasUserAppliedFilters]);

    useEffect(() => {
        if (!footerFiltersApplied && !hasUserAppliedFilters) {
            const cityFromQuery = searchParams.get("city");
            const provinceFromQuery = searchParams.get("province");

            if (cityFromQuery || provinceFromQuery) {
                setFilters(prev => ({
                    ...prev,
                    city: cityFromQuery || '',
                    province: provinceFromQuery || ''
                }));
                setIsOnlyFilterMode(true);
                setFooterFiltersApplied(true);
            }
        }
    }, [searchParams, footerFiltersApplied, hasUserAppliedFilters]);

    useEffect(() => {
        if ((queryProvince || queryCity) && !querySynced) {
            setFilters(prev => ({
                ...prev,
                province: queryProvince || '',
                city: '',
            }));

            if (queryProvince) {
                fetchCities(queryProvince).then((cityList) => {
                    const found = cityList.find(c => c.name === queryCity);
                    if (found) {
                        setFilters(prev => ({
                            ...prev,
                            city: found.name,
                        }));
                    }
                    setQuerySynced(true);
                });
            } else {
                setQuerySynced(true);
            }
        }
    }, [queryProvince, queryCity, querySynced]);

    const handleFilterChange = (key, value) => {
        setHasUserAppliedFilters(true); // mark that user changed a filter
        setIsOnlyFilterMode(true); // switch off city-only mode
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchFilteredPosts(1, true);
    }, [filters]);

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

    const fetchProvince = async () => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getallprovince`);
        const result = await response.json();
        setProvince(result?.data);
    };

    const fetchCities = async (provinceId) => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getallcity/${provinceId}`);
        const result = await response.json();
        setCity(result?.data);
        return result?.data || [];
    };

    const fetchEthnicity = async () => {
        const response = await fetch(`http://206.189.130.102:4000/api/v1/getall-ethnicity`);
        const result = await response.json();
        setEthicity(result?.data);
    };

    useEffect(() => {
        fetchCategory();
        fetchEthnicity();
        fetchProvince();
    }, []);


    // Fetch posts (filtered or not)
    const fetchFilteredPosts = async (page = currentPage, reset = false) => {
        // Remove empty values
        const filteredBody = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
        );

        const response = await fetch(
            `http://206.189.130.102:4000/api/v1/filter/getPostAdByCategoryfilterPagination?page=${page}&limit=${itemsPerPage}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filteredBody),
            }
        );
        const result = await response.json();
        if (reset) {
            setPost(result?.data || []);
        } else {
            setPost(prev => [...prev, ...result?.data]);
        }
    };

    // Infinite scroll: only fetch more if no filters or filters are unchanged
    useEffect(() => {
        if (currentPage > 1) {
            fetchFilteredPosts(currentPage);
        }
    }, [currentPage]);

    // Clear filters
    const handleClearFilters = () => {
        setFilters({
            categoryid: '',
            subcategoryid: '',
            province: '',
            city: '',
            ethicity: '',
            isVerified: undefined,
        });

        // Reset flags
        setHasUserAppliedFilters(false);
        setIsOnlyFilterMode(false);

        // Re-apply city-only fetch if applicable
        if (footerSelectedCity) {
            fetchCardsByCityOnly(footerSelectedCity);
        }
    };


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
                                            </div>
                                            <div className="col-md-6 position-relative mb-3">
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
                                            {!fromHeader && (
                                                <>
                                                    <div className="col-md-6 position-relative mb-3">
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
                                                    </div>

                                                    <div className="col-md-6 position-relative mb-3">
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
                                                    </div>
                                                </>
                                            )}
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

                                            <div className="col-md-6 position-relative mb-3">
                                                <span className="arrow-span">
                                                    <i className="fa-solid fa-angle-down text-white"></i>
                                                </span>
                                                <select
                                                    className="form-select filter-btn position-relative"
                                                    name="isVerified"
                                                    value={filters.isVerified === undefined ? "" : filters.isVerified}
                                                    onChange={(e) => handleFilterChange('isVerified', e.target.value === "true" ? true : e.target.value === "false" ? false : undefined)}
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
                                {post?.map((val, index) =>
                                    val.isActive ? (
                                        <div className="col-12 col-md-4 col-xl-3" key={index}>
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
                                        <div className="col-12 col-md-4 col-xl-3" key={index}>
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
