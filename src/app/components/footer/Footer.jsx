"use client"

import React from "react";
import Link from "next/link";
import logo from "../../../../public/images/pink-logo.png";

const Footer = () => {
  return (
    <div className="footer">
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
