// // import ContactHeader from "@/app/components/contactheader/page";
// import React from "react";
// import Image from "next/image";
// import contactus from "../../../public/images/Contact us-rafiki.png"
// import Link from "next/link";
// import Header from "../components/header/Header";


// function ContactUs() {
//     return (
//         <div>
//             <div>
//                 <Header/>
//             </div>
//             <section className="h-100 contactbanner">
//                 <div className="container-fluid py-5 h-100">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="col-12 col-xl-10 ps-5">
//                             <div className="ps-5 card contactcard d-flex justify-content-center align-items-center">
//                                 <div className="row g-0">
//                                     {/* Image Section (Hidden on Small Screens) */}
//                                     <div className="col-md-6 d-none d-md-block">
//                                         <Image
//                                             src={contactus}
//                                             alt="Contact Us Illustration"
//                                             className="img-fluid contactimg"
//                                             layout="responsive"
//                                         />
//                                     </div>

//                                     {/* Contact Form Section */}
//                                     <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-center text-center p-4">
//                                         <h1 className="fw-bold">CONTACT US</h1>
//                                         <p className="fw-semibold">Concept Landing Page</p>

//                                         {/* Contact Button */}
//                                         <Link href="mailto:support@pinkspot.cc" className="btn bg-dd88cf text-white">
//                                             support@pinkspot.cc
//                                         </Link>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default ContactUs;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import contactus from "../../../public/images/Contact us-rafiki.png";

function ContactUs() {
    return (
        <div className="contact-us-page">
            {/* Header */}
            <Header />

            {/* Contact Section */}
            <section className="h-100 contact-banner py-5">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-10">
                            <div className="card contact-card shadow-lg p-4 border-0 rounded-4">
                                <div className="row g-0 align-items-center">
                                    {/* Image Section - Hidden on Small Screens */}
                                    <div className="col-md-6 d-none d-md-block">
                                        <Image
                                            src={contactus}
                                            alt="Contact Us Illustration"
                                            className="img-fluid contact-img"
                                            layout="responsive"
                                            priority
                                        />
                                    </div>

                                    {/* Contact Details Section */}
                                    <div className="col-md-6 col-12 d-flex flex-column text-center p-4">
                                        <h1 className="fw-bold text-primary">Contact Us</h1>
                                        <p className="fw-semibold text-muted">Concept Landing Page</p>

                                        {/* Contact Button */}
                                        <Link href="mailto:support@pinkspot.cc">
                                            <button className="btn btn-lg bg-dd88cf text-white rounded-pill shadow-sm px-4 py-2 mt-3">
                                                support@pinkspot.cc
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Optional Footer (if needed) */}
        </div>
    );
}

export default ContactUs;

