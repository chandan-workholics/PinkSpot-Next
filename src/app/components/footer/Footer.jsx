"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../../../public/images/pink-logo.png";

const topCities = [
  "London", "Saskatoon", "Brampton", "Sherbrooke", "Ottawa", "Mississuaga",
  "Regina", "Windsor", "Barrie", "Edmonton", "Winnipeg", "City Of Toronto",
  "Sarnia", "Montreal", "Calgary", "Vancouver", "Halifax", "Quebec",
];

const slugify = (value) => value?.toLowerCase().replace(/\s+/g, "-");

const Footer = () => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    fetch("https://pinkspot.cc/api/v1/getallcity", {
      headers: { "X-API-Key": "your-api-key1" },
    })
      .then((response) => response.json())
      .then((data) => setCity(data))
      .catch(() => setCity([]));
  }, []);

  const cityList = city?.data?.filter((item) => topCities.includes(item.name)) || [];

  const handleSearch = (cityName) => {
    window.location.href = `/female-escorts/${slugify(cityName)}`;
  };

  return (
    <div className="footer">
      <div className="bg-faedf8">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h2 className="text-center fw-bold text-4b164c mb-4">Top Searches In</h2>
              <p className="searchCitySection text-center">
                {(cityList.length ? cityList : topCities.map((name) => ({ name }))).map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSearch(item.name)}
                    className="cityBadge text-decoration-none border-0"
                  >
                    {item.name} Escorts
                  </button>
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
                <h5 className="text-white px-3 text-center">Site Usage Policy</h5>
                <p className="nav-link p-0 text-white mb-0 fs-14 lh-2 px-3 text-center">
                  This website contains user-generated content that is not endorsed or verified by the site.
                  The owners disclaim all liability for user content to the fullest extent permitted by law.
                  Use of this site constitutes agreement to the{" "}
                  <Link href="/terms&conditions" className="text-white fw-semibold">Terms & Conditions</Link>,{" "}
                  <Link href="/rules" className="text-white fw-semibold">Rules</Link>, and{" "}
                  <Link href="/privacypolicy" className="text-white fw-semibold">Privacy Policy</Link>.
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-top py-2 flex-column flex-md-row gap-3">
              <div className="footer-logo mb-0 text-center text-md-start">
                <img src={logo.src} alt="Pinkspot" className="w-75" />
              </div>
              <p className="text-white mb-0 text-center">&copy; 2026 PinkSpot Company, Inc. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
