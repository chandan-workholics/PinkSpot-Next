"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PricingPlanButton({ plan, children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(Boolean(sessionStorage.getItem("token")));
    }, []);

    const authenticatedDestination = plan === "single"
        ? "/adpost"
        : `/subscription?plan=${plan}`;
    const destination = isAuthenticated
        ? authenticatedDestination
        : `/login?mode=signup&next=${encodeURIComponent(authenticatedDestination)}`;

    return (
        <Link href={destination} className="pink-pricing-plan__button">
            {children}
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </Link>
    );
}
