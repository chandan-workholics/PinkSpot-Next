"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DisclaimerModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(localStorage.getItem("disclaimerAccepted") !== "true");
  }, []);

  const handleAgree = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="pink-disclaimer" role="dialog" aria-modal="true" aria-label="Site entry disclaimer">
      <div className="pink-disclaimer__dialog">
        <p>
          By entering PinkSpot, you confirm you are 18+ and agree to our{" "}
          <Link href="/terms&conditions">Terms</Link>,{" "}
          <Link href="/privacypolicy">Privacy Policy</Link>, and{" "}
          <Link href="/rules">Rules</Link>. You also agree not to upload illegal
          content or prohibited material.
        </p>
        <button type="button" onClick={handleAgree}>Agree and Enter</button>
      </div>
    </div>
  );
}
