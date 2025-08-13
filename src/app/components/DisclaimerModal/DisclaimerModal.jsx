'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from '../../../../public/images/pink-logo.png';

export default function DisclaimerModal() {
    const [show, setShow] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem('disclaimerAccepted');
        if (!hasAgreed) {
            setShow(true);
        }
        setHasMounted(true);
    }, []);

    const handleAgree = () => {
        localStorage.setItem('disclaimerAccepted', 'true');
        setShow(false);
    };

    // const handleDisagree = () => {
    //     alert("You must agree to continue using this site.");
    // };

    if (!hasMounted) return null; // 🛑 Don't render until client-side

    return (
        <>
            {show && (
                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <Link className="navbar-brand text-dd88cf" href="/">
                                        <img src={logo.src} alt="" className="" width={150} />
                                    </Link>
                                </div>
                                <h5 className="fw-semibold">
                                    By using
                                    <span className="text-dd88cf"> PinkSpot</span>,
                                    you confirm that you understand and agree to the following conditions:</h5>
                                <ol className="mt-3" style={{ fontSize: "0.95rem" }}>
                                    <li>
                                        I am 18 years of age or older, or I meet the age of majority required by the laws of my country or region.
                                    </li>
                                    <li>
                                        I will not upload, share, or promote any content that involves minors or supports, facilitates, or promotes human trafficking in any form.
                                    </li>
                                    <li>
                                        I will report any suspected illegal activity, including child exploitation and trafficking, to the appropriate law enforcement authorities in accordance with PinkSpot’s reporting procedures.
                                    </li>
                                    <li>
                                        I agree not to use explicit or inappropriate imagery (including genitalia or sexual acts, whether real or simulated) in areas where it is prohibited, such as profile photos or ad previews, in line with PinkSpot’s content policies.
                                    </li>
                                    <li>
                                        I have read, understood, and agree to follow PinkSpot’s Terms of Use, Privacy Policy, ad posting rules, and all other applicable guidelines.
                                    </li>
                                </ol>
                                <div className="d-flex justify-content-start mt-4 gap-3">
                                    <button className="bg-success text-white border-0 px-3 py-1 rounded-2" onClick={handleAgree}>I agree</button>
                                    {/* <button className="bg-white text-danger border-0" onClick={handleDisagree}>I disagree with the conditions</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
