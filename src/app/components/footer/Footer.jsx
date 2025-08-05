"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import logo from '../../../../public/images/pink-logo.png'
import { useCity } from "../../../context/CityContext.js";
import { useRouter } from "next/navigation";

const Footer = () => {

    const { setFooterSelectedCity } = useCity();
    const router = useRouter();
    const [province, Setprovince] = useState([]);
    const [city, SetCity] = useState([]);
    const [category, Setcategory] = useState(null);
    const URL = 'http://206.189.130.102:4000/api/v1';

    const handleCityClick = (cityName) => {
        setFooterSelectedCity(cityName);
        localStorage.setItem("selectedLocation", cityName);
        router.push("/all-category");
    };

    const getprovince = () => {
        fetch(`${URL}/getallprovince`, {
            headers: { "X-API-Key": "your-api-key1" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Setprovince(data);
            });
    };
    const getAllCity = () => {
        fetch(`${URL}/getallcity`, {
            headers: { "X-API-Key": "your-api-key1" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetCity(data);
            });
    };

    const getcategory = () => {
        fetch(`${URL}/category/getallcategory`, {
            headers: { "X-API-Key": "your-api-key1" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data[0]._id); // Ensure data.data exists and is an array
                if (Array.isArray(data.data) && data.data.length > 0) {
                    Setcategory(data.data[0]);
                } else {
                    // Handle the case where data is not an array or is empty
                    Setcategory(null); // or set a default value
                }
            })
            .catch((error) => {
                console.error("Error fetching category:", error);
                // Handle the error by setting an error state or default value
                Setcategory(null);
            });
    };
    useEffect(() => {
        getprovince();
        getAllCity();
        getcategory();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkWord = ['Manitoba', 'Trois Rivieres', 'Sarnia', 'Drummondville', 'Niagra Region', 'Granby', 'Windsor', 'London', 'Barrie', 'Saskatoon', 'Regina', 'Sherbrooke', 'Hamilton', 'Mississuaga', 'Brampton', 'Halifax', 'Quebec', 'Vancouver', 'Montreal', 'Winnipeg', 'Ottawa', 'City Of Toronto', 'Calgary', 'Edmonton'];


    return (
        <>
            <div className="footer">
                <div className="bg-faedf8">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <h2 className="text-center fw-bold text-4b164c mb-4" data-aos="fade-down" data-aos-duration="2000">Top Searches In</h2>
                                <p className="searchCitySection text-center">
                                    {city?.data?.map((val2, index) => (
                                        checkWord.includes(val2.name) ? (
                                            <Link
                                                key={index}
                                                href="/allCategory"
                                                onClick={() => handleCityClick(val2.name)} // ✅ Correct: only pass selected city
                                                className="cityBadge text-decoration-none"
                                                data-aos="zoom-in"
                                                data-aos-duration="2000"
                                            >
                                                {val2.name} Escorts &nbsp;
                                            </Link>
                                        ) : null
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-4b164c">
                    <div className="container">
                        <footer className="pt-4">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <h5 className='text-white px-3 text-center'>Site Usage Policy</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">
                                            <p className="nav-link p-0 text-white mb-0 fs-14 lh-2 px-3  text-center">
                                                The content on this site is user generated and in no way reflects the views nor is endorsed by the owners of this site. You agree that the owner of this website is released of all liabilities. If you are offended by any material posted on this site you should exit immediately. This entire <Link href="http://pinkspot.cc/" target='blank' className='text-white fw-semibold'>www.pinkspot.cc</Link> website, including its code, images, logos, and names are protected by copyright, and any infringement of said copyright will be prosecuted to the fullest extent of the law. By entering the website you acknowledge and agree to the above and agree to our terms & conditions, rules, and privacy policy. All with links that will navigate to upon clicking the <Link href="/" className='text-white fw-semibold'>terms & conditions</Link>, <Link href="/" className='text-white fw-semibold'>rules</Link>, and <Link href="/" className='text-white fw-semibold'>privacy policy</Link>.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Copyright & Social Icons */}
                            <div className="d-flex justify-content-between align-items-center border-top py-2">
                                <div className="footer-logo mb-0">
                                    <img src={logo.src} alt="" className="w-75" />
                                </div>
                                <p className='text-white mb-0'>© 2025 PinkSpot Company, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer