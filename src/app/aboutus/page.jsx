import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Link from "next/link";

const canonicalUrl = "https://pinkspot.cc/aboutus/";
const OG_IMAGE = "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png";

export async function generateMetadata() {
    return {
        title: "About Pinkspot.cc | Get Seen. Get Booked.",
        description: "Learn how Pinkspot.cc helps independent providers and agencies advertise across Canada with affordable pricing, genuine listings, and reliable support.",
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: "About Pinkspot.cc | Get Seen. Get Booked.",
            description: "A trusted Canadian marketplace for independent providers, agencies, and clients.",
            url: canonicalUrl,
            images: [{ url: OG_IMAGE }],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "About Pinkspot.cc | Get Seen. Get Booked.",
            description: "A trusted Canadian marketplace for independent providers, agencies, and clients.",
            images: [OG_IMAGE],
        },
    };
}

export default function AboutUsPage() {
    return (
        <div className="pink-about-page">
            <Header />

            <main className="pink-about-simple">
                <div className="pink-about-simple__inner">
                    <nav className="pink-about-breadcrumb" aria-label="Breadcrumb">
                        <Link href="/" aria-label="Home">
                            <i className="fa-solid fa-house" aria-hidden="true"></i>
                            <span>Home</span>
                        </Link>
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                        <span aria-current="page">About Us</span>
                    </nav>

                    <article className="pink-about-copy">
                        <header className="pink-about-copy__header">
                            <h1>About Pinkspot.cc</h1>
                            <span className="pink-about-copy__line" aria-hidden="true"></span>
                            <h2>Get Seen. Get Booked.</h2>
                        </header>

                        <div className="pink-about-copy__body">
                            <p>
                                Pinkspot.cc is a Canadian <strong>escort classifieds</strong> platform that helps
                                independent providers and agencies advertise their services and connect with more
                                clients through affordable advertising, genuine listings, and reliable support.
                            </p>

                            <p>
                                Our goal is simple: provide a <strong>trusted marketplace</strong> where advertisers
                                can promote their services with confidence while clients can browse verified listings
                                across Canada.
                            </p>

                            <p>
                                We work to keep Pinkspot.cc clean, easy to use, and fairly priced by actively removing
                                fake listings, improving visibility for genuine advertisers, and providing transparent
                                pricing with no hidden fees.
                            </p>

                            <p>
                                Whether you&apos;re posting your first ad or managing multiple listings, we&apos;re committed
                                to providing a professional experience backed by responsive customer support.
                            </p>
                        </div>

                        <aside className="pink-about-support" aria-label="Pinkspot support">
                            <div className="pink-about-support__icon" aria-hidden="true">
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div>
                                <h3>Questions, support or feedback?</h3>
                                <p>Contact us anytime:</p>
                                <Link href="mailto:support@pinkspot.cc">support@pinkspot.cc</Link>
                            </div>
                        </aside>
                    </article>
                </div>

                <div className="pink-about-simple__wave" aria-hidden="true"></div>
            </main>

            <Footer />
        </div>
    );
}
