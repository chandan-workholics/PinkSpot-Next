"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../../public/images/pink-logo.png";

const popularCities = [
  "London", "Saskatoon", "Brampton", "Sherbrooke", "Ottawa", "Mississauga",
  "Regina", "Windsor", "Barrie", "Edmonton", "Winnipeg", "Toronto",
  "Sarnia", "Montreal", "Calgary",
];

const slugify = (value) => value.toLowerCase().trim().replace(/\s+/g, "-");

const Footer = () => {
  const pathname = usePathname();
  const homeAlreadyShowsCities = pathname === "/" || pathname === "/home";

  return (
    <div className="footer">
      {!homeAlreadyShowsCities && (
        <section className="footer-cities" aria-labelledby="footer-cities-title">
          <div className="footer-cities__heading">
            <h2 id="footer-cities-title">Popular Cities</h2>
            <span aria-hidden="true"></span>
            <p>Browse verified ads across Canada</p>
          </div>
          <div className="footer-cities__grid">
            {popularCities.map((city) => (
              <Link key={city} href={`/female-escorts/${slugify(city)}`}>
                <strong>{city}</strong>
                <span>Escorts</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="footer-main">
        <div className="footer-policy">
          <h2>Site Usage Policy</h2>
          <p>
                  This website contains user-generated content that is not endorsed or verified by the site.
                  The owners disclaim all liability for user content to the fullest extent permitted by law.
                  Use of this site constitutes agreement to the{" "}
                  <Link href="/terms&conditions">Terms &amp; Conditions</Link>,{" "}
                  <Link href="/rules">Rules</Link>, and{" "}
                  <Link href="/privacypolicy">Privacy Policy</Link>.
          </p>
        </div>

        <div className="footer-bottom">
          <Link className="footer-logo" href="/" aria-label="Pinkspot home">
            <img src={logo.src} alt="Pinkspot.cc" />
          </Link>
          <p>&copy; 2026 PinkSpot Company, Inc. All rights reserved.</p>
          <Link href="/">pinkspot.cc</Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
