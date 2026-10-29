"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import VerifiedBadge from "../components/VerifiedBadge/VerifiedBadge";
import { useSearchParams } from 'next/navigation';
import { apiUrl } from '../../config/api';

const cityNameOverrides = {
    mississauga: "Mississauga",
};

const formatCityForApi = (value = "") => {
    const slug = value.toLowerCase().trim();
    if (cityNameOverrides[slug]) return cityNameOverrides[slug];

    return value
        .replace(/-/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

const AllCategoryClient = ({ initialCity = null }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryProvince = searchParams.get('province');
    const queryCity = searchParams.get('city');
    const [loading, setLoading] = useState(true);
    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [ethicity, setEthicity] = useState([]);
    const [post, setPost] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [searchError, setSearchError] = useState("");

    const [filters, setFilters] = useState({
        categoryid: searchParams.get("categoryid") || '',
        subcategoryid: searchParams.get("subcategoryid") || '',
        province: searchParams.get("province") || '',
        // city: searchParams.get("city") || '',
        city: initialCity || searchParams.get("city") || '',
        ethicity: searchParams.get("ethicity") || '',
        isVerified: searchParams.get("isVerified") || '',
    });

    const [currentPage, setCurrentPage] = useState(() => {
        const queryPage = Number(searchParams.get("page"));
        if (queryPage > 0) return queryPage;

        // City URLs intentionally stay clean (without a page query). Keep the
        // last visited page in session storage so returning from a profile does
        // not unexpectedly reset the listing to page 1.
        if (typeof window !== "undefined") {
            const savedUrl = sessionStorage.getItem("pinkspot-last-listing-url");
            if (savedUrl) {
                try {
                    const saved = new URL(savedUrl, window.location.origin);
                    if (saved.pathname === pathname) {
                        const savedPage = Number(saved.searchParams.get("page"));
                        if (savedPage > 0) return savedPage;
                    }
                } catch {
                    // Ignore an invalid stale session value.
                }
            }
        }

        return 1;
    });
    const hasRestoredScroll = useRef(false);

    const getScrollStorageKey = () => {
        if (typeof window === "undefined") return "";
        return `pinkspot-scroll:${window.location.pathname}${window.location.search}`;
    };

    const saveScrollPosition = () => {
        if (typeof window === "undefined") return;
        sessionStorage.setItem(getScrollStorageKey(), String(window.scrollY));
        sessionStorage.setItem(`pinkspot-scroll:${pathname}`, String(window.scrollY));
    };

    const saveListingState = () => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        params.set("page", String(currentPage));
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        const query = params.toString();
        const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
        sessionStorage.setItem("pinkspot-last-listing-url", url);
        sessionStorage.setItem(getScrollStorageKey(), String(window.scrollY));
        sessionStorage.setItem(`pinkspot-scroll:${pathname}`, String(window.scrollY));
    };

    const scrollToTop = () => {
        if (typeof window === "undefined") return;
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const fetchProvince = async () => {
        const response = await fetch(apiUrl("/getallprovince"));
        const result = await response.json();
        setProvince(result?.data);
    };

    const fetchCities = async (provinceId) => {
        const response = await fetch(apiUrl(`/getallcity/${provinceId}`));
        const result = await response.json();
        setCity(result?.data);
        return result?.data || [];
    };

    const fetchEthnicity = async () => {
        const response = await fetch(apiUrl("/getall-ethnicity"));
        const result = await response.json();
        setEthicity(result?.data);
    };

    const handleFilterChange = (field, value) => {
        setSearchError("");
        setFilters((prev) => ({ ...prev, [field]: value, }));
        setCurrentPage(1); // ✅ MOST IMPORTANT
    };

    useEffect(() => {
        fetchEthnicity();
        fetchProvince();
    }, []);

    useEffect(() => {
        if (!initialCity && !queryProvince && !queryCity) {
            router.replace("/female-escorts/toronto");
        }
    }, [initialCity, queryProvince, queryCity, router]);

    useEffect(() => {
        fetchFilteredPosts(currentPage);
    }, [currentPage, filters]);

    useEffect(() => {
        if (loading || hasRestoredScroll.current || typeof window === "undefined") return;

        const savedScroll = sessionStorage.getItem(getScrollStorageKey())
            || sessionStorage.getItem(`pinkspot-scroll:${pathname}`);
        if (savedScroll) {
            window.requestAnimationFrame(() => {
                window.scrollTo({ top: Number(savedScroll), behavior: "auto" });
                sessionStorage.removeItem(getScrollStorageKey());
            });
        }

        hasRestoredScroll.current = true;
    }, [loading, pathname, searchParams]);

    // useEffect(() => {
    //     const params = new URLSearchParams();

    //     // params.set("page", currentPage);

    //     if (!initialCity) {
    //         params.set("page", currentPage);
    //     }

    //     Object.entries(filters).forEach(([key, value]) => {
    //         if (value) params.set(key, value);
    //     });

    //     // window.history.replaceState(null, "", `?${params.toString()}`);


    //     // if (!initialCity) {
    //     //     window.history.replaceState(null, "", `?${params.toString()}`);
    //     // }

    //     if (!initialCity) {
    //         router.replace(`?${params.toString()}`);
    //     }

    // }, [filters, currentPage]);


    useEffect(() => {
        // ❌ city page pe mat chala
        if (initialCity) return;

        const params = new URLSearchParams();

        params.set("page", currentPage);

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });

        router.replace(`?${params.toString()}`);
    }, [filters, currentPage]);

    const formattedFilters = {
        ...filters,
        city: filters.city ? formatCityForApi(filters.city) : "",
    };

    // Fetch posts (filtered or not)
    const fetchFilteredPosts = async (page = 1) => {
        try {
            if (!initialCity && (!filters.province || !filters.city)) {
                setPost([]);
                setTotalPages(1);
                setLoading(false);
                return;
            }

            setLoading(true);

            const requestPosts = (requestFilters) => fetch(
                apiUrl(`/filter/getPostAdByCategoryfilterPagination?page=${page}&limit=20`),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestFilters),
                }
            );

            let response = await requestPosts(formattedFilters);
            let result = await response.json();

            if (
                initialCity &&
                formattedFilters.city?.toLowerCase() === "mississauga" &&
                (!result?.data || result.data.length === 0)
            ) {
                response = await requestPosts({ ...formattedFilters, city: "mississauga" });
                result = await response.json();
            }

            setPost(result?.data || []);
            setTotalPages(result?.pagination?.totalPages || 1);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
        setPost([]);
        setCurrentPage(1);
        router.replace(initialCity ? `/female-escorts/${initialCity}` : `/search-escorts`);
    };

    const handlePageChange = (page) => {
        scrollToTop();
        setCurrentPage(page);
    };

    const getBackUrl = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(currentPage));
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });

        const query = params.toString();
        return `${pathname}${query ? `?${query}` : ""}`;
    };

    const getListingHref = (val) => {
        const citySlug = val?.city?.toLowerCase().replace(/\s+/g, "-");
        const detailUrl = `/female-escorts/${citySlug}/${val?.slug}`;
        return detailUrl;
    };

    const citySlug = initialCity || filters.city;

    const formattedCity = citySlug
        ? citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "";
    const activeFilterCount = [filters.ethicity, filters.isVerified].filter(Boolean).length;
    const canShowResults = Boolean(initialCity || (filters.province && filters.city));


    useEffect(() => {
        if (initialCity) {
            setFilters((prev) => ({
                ...prev,
                city: initialCity,
            }));
        }
    }, [initialCity]);

    const SkeletonCard = ({ index }) => {
        return (
            <div
                className="col-12 col-md-4 col-xl-3 skeleton-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                <div className="card skeleton-card">

                    {/* Image */}
                    <div className="skeleton skeleton-img"></div>

                    {/* Content */}
                    <div className="p-3">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-line"></div>
                        <div className="skeleton skeleton-line short"></div>
                        <div className="skeleton skeleton-line"></div>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="category-page bg-ffdef7">
                    <div className='home-banner'>

                        <Header className="position-absolute w-100" />

                    </div>
                    <div className="">
                        <button
                            onClick={() => router.back()} // 🔹 navigate to previous page
                            className="btn btn-light shadow-sm m-3"
                        >
                            <i className="fa-solid fa-arrow-left me-2"></i> Back
                        </button>
                    </div>


                    {/* 🔥 H1 + H2 SEO TEXT */}

                    {/* 🔥 H1 + H2 SEO TEXT */}
                    {/* {citySlug && (
                        <div className="container text-center mt-4 mb-3">
                            <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#4b164c" }}>
                                Female Escorts in {formattedCity} – Verified & Real Listings
                            </h1>

                            <p style={{ fontSize: "16px", color: "#4b164c" }}>
                                Browse verified female escort ads across Canada.
                            </p>
                        </div>
                    )} */}


                    {citySlug && (
                        <div className="container text-center mt-4 mb-3">
                            <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#4b164c" }}>
                                Female Escorts in {formattedCity}
                            </h1>
                        </div>
                    )}


                    <div className="container pt-3 pb-5 filterSection listing-search-section">
                        <section className="listing-search-panel" aria-label="Search escort listings">
                            <div className="listing-search-panel__location">
                                <label>
                                    <span>Province</span>
                                    <div className="listing-search-select">
                                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                        <select
                                            name="province"
                                            value={filters.province}
                                            onChange={(event) => {
                                                handleFilterChange("province", event.target.value);
                                                handleFilterChange("city", "");
                                                fetchCities(event.target.value);
                                            }}
                                        >
                                            <option value="">Select Province</option>
                                            {province.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </select>
                                        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                                    </div>
                                </label>

                                <label>
                                    <span>City</span>
                                    <div className="listing-search-select">
                                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                        <select
                                            name="city"
                                            value={filters.city}
                                            onChange={(event) => handleFilterChange("city", event.target.value)}
                                        >
                                            <option value="">Select City</option>
                                            {initialCity && !city.some((item) => item.name === initialCity) && (
                                                <option value={initialCity}>{formattedCity}</option>
                                            )}
                                            {city.map((item) => (
                                                <option key={item._id || item.name} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                                    </div>
                                </label>
                            </div>

                            {showAdvancedFilters && (
                                <div className="listing-search-panel__advanced">
                                    <label>
                                        <span>Ethnicity</span>
                                        <select
                                            name="ethnicity"
                                            value={filters.ethicity}
                                            onChange={(event) => handleFilterChange("ethicity", event.target.value)}
                                        >
                                            <option value="">Any Ethnicity</option>
                                            {ethicity.map((item) => (
                                                <option key={item._id || item.name} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        <span>Verification</span>
                                        <select
                                            name="isVerified"
                                            value={filters.isVerified}
                                            onChange={(event) => handleFilterChange("isVerified", event.target.value)}
                                        >
                                            <option value="">All Listings</option>
                                            <option value="true">Verified Only</option>
                                        </select>
                                    </label>
                                </div>
                            )}

                            <div className="listing-search-panel__actions">
                                <button
                                    type="button"
                                    className="listing-filter-toggle"
                                    aria-expanded={showAdvancedFilters}
                                    onClick={() => setShowAdvancedFilters((current) => !current)}
                                >
                                    <i className="fa-solid fa-sliders" aria-hidden="true"></i>
                                    Filters ({activeFilterCount})
                                    <i className={`fa-solid fa-chevron-${showAdvancedFilters ? "up" : "down"}`} aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    className="listing-search-submit"
                                    onClick={() => {
                                        if (!filters.province || !filters.city) {
                                            setSearchError("Please select both a province and city to search.");
                                            setPost([]);
                                            setTotalPages(1);
                                            return;
                                        }

                                        const selectedCitySlug = filters.city.toLowerCase().replace(/\s+/g, "-");
                                        setSearchError("");
                                        router.push(`/female-escorts/${selectedCitySlug}`);
                                    }}
                                >
                                    <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                                    Search
                                </button>
                            </div>
                        </section>

                        <button type="button" className="listing-clear-filters" onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                        {searchError && <p className="listing-search-error">{searchError}</p>}
                        {/* Filters */}

                        <div className="listing-results-heading">
                            <div>
                                <span aria-hidden="true">
                                    <i className="fa-regular fa-star"></i>
                                </span>
                                <h2>Latest Listings</h2>
                            </div>
                            <small>{canShowResults ? post.filter((item) => item.isActive).length : 0} results</small>
                        </div>

                        {/* Posts Section */}
                        <div className="container box-detail">
                            {/* Mobile View */}
                            <div className="row d-block d-md-none">
                                {!canShowResults ? (
                                    <div className="col-12">
                                        <div className="listing-location-required">
                                            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                            <strong>Select a province and city</strong>
                                            <p>Search results are location-based. Please choose a valid province and city to view ads.</p>
                                        </div>
                                    </div>
                                ) : loading ? (
                                    [...Array(8)].map((_, i) => (
                                        <SkeletonCard key={i} index={i} />
                                    ))
                                ) : post.length > 0 ? (
                                    post.map((val, index) =>
                                        val.isActive ? (
                                            <div className="col-12 col-md-4 col-xl-3" key={index}>
                                                <Link
                                                    // href={`/female-escorts/${val?.city.split(" ").join("-")}/${val?.slug}?page=${currentPage}`}
                                                    href={getListingHref(val)}
                                                    onClick={saveListingState}
                                                    className={`categeory-card ${val.highlight ? "highlight-box" : ""}`}
                                                >
                                                    <div className="img-box">
                                                        <img src={val.image1} alt="Img" />
                                                    </div>
                                                    <div className="card-text listing-card-body" style={{ overflow: "hidden" }}>
                                                        <div className="d-flex mb-2 listing-card-type">
                                                            <h6 className="mb-0 px-2 py-1 bg-4b164c text-white rounded-1"><i className="fa-solid fa-tag me-1" aria-hidden="true"></i>Escort</h6>
                                                        </div>
                                                        <div className="listing-name-with-badge">
                                                            <h5 className="fw-bold">{val?.name}</h5>
                                                            <VerifiedBadge record={val} compact />
                                                        </div>
                                                        <h6 className="text-capitalize listing-card-location">
                                                            <i className="fa-solid fa-location-dot me-1"></i>
                                                            {val?.city}, {val?.provincesid?.name}
                                                        </h6>
                                                        <h6 className="listing-card-title">
                                                            <i className="fa-solid fa-tags me-1"></i>
                                                            {val?.title}
                                                        </h6>
                                                        <span className="listing-card-age"><i className="fa-solid fa-user me-1"></i>Age {val?.age}</span>
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
                                {!canShowResults ? (
                                    <div className="col-12">
                                        <div className="listing-location-required">
                                            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                                            <strong>Select a province and city</strong>
                                            <p>Search results are location-based. Please choose a valid province and city to view ads.</p>
                                        </div>
                                    </div>
                                ) : loading ? (
                                    [...Array(8)].map((_, i) => (
                                        <SkeletonCard key={i} index={i} />
                                    ))
                                ) : post.length > 0 ? (
                                    post.map((val, index) =>
                                        val.isActive ? (
                                            <div className="col-12 col-md-4 col-xl-3" key={index}>
                                                <Link
                                                    // href={`/female-escorts/${val?.city.split(" ").join("-")}/${val?.slug}`}
                                                    href={getListingHref(val)}
                                                    onClick={saveListingState}
                                                >
                                                    <div className={`card mb-4 ${val.highlight ? "highlight-box" : ""}`}>
                                                        <div className="card-box">
                                                            <div className="card-img">
                                                                <img src={val.image1} className="card-img-top" alt="..." />
                                                            </div>
                                                            <div className="card-content shadow-lg">
                                                                <div className="listing-card-type">
                                                                    <h6 className="mb-2 px-2 py-1 bg-4b164c text-white rounded-1"><i className="fa-solid fa-tag me-1" aria-hidden="true"></i>Escort</h6>
                                                                </div>
                                                                <div className="listing-name-with-badge">
                                                                    <h3 className="per-name">{val?.name}</h3>
                                                                    <VerifiedBadge record={val} compact />
                                                                </div>
                                                                <h4 className="per-ethnicity">{val?.ethicity}</h4>
                                                                <h4 className="per-age">Age : {val?.age}</h4>
                                                                <h5 className="per-city">
                                                                    <i className="fa-solid fa-location-dot"></i> {val?.city}
                                                                </h5>
                                                                <h4 className="per-descriptn">{val?.title}</h4>
                                                                <span className="listing-card-age"><i className="fa-solid fa-user me-1"></i>Age {val?.age}</span>
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


                            <div className="pagination d-flex justify-content-center mt-4">
                                {/* Prev Button */}
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => handlePageChange(1)}
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
                                                        onClick={() => handlePageChange(page)}
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
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                {/* Next Button */}
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
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

