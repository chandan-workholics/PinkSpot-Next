import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export const metadata = {
    title: "Get Verified | Pinkspot.cc",
    description: "Follow Pinkspot's simple photo verification steps to build trust and receive a verified badge.",
    alternates: { canonical: "https://pinkspot.cc/get-verified/" },
};

const verificationSteps = [
    {
        icon: "fa-regular fa-pen-to-square",
        title: "Write on a paper",
        description: "Today's date and the word “PINKSPOT”",
    },
    {
        icon: "fa-solid fa-camera",
        title: "Take a clear selfie",
        description: "Hold the paper where all details are visible.",
    },
    {
        icon: "fa-solid fa-paper-plane",
        title: "Send the photo to",
        description: "info@pinkspot.cc",
    },
];

export default function GetVerifiedPage() {
    return (
        <div className="get-verified-page">
            <Header />

            <main className="get-verified-main">
                <section className="get-verified-card" aria-labelledby="get-verified-title">
                    <header className="get-verified-heading">
                        <span aria-hidden="true"><i className="fa-solid fa-shield-heart"></i></span>
                        <h1 id="get-verified-title">Get Verified</h1>
                        <p>A quick photo helps build trust and keeps Pinkspot safe.</p>
                    </header>

                    <div className="get-verified-illustration">
                        <Image
                            src="/images/get-verified.jpeg"
                            alt="Woman holding a Pinkspot verification sign"
                            width={1600}
                            height={879}
                            priority
                        />
                    </div>

                    <ol className="get-verified-steps">
                        {verificationSteps.map((step, index) => (
                            <li key={step.title}>
                                <span className="get-verified-steps__number">{index + 1}</span>
                                <i className={step.icon} aria-hidden="true"></i>
                                <div>
                                    <strong>{step.title}</strong>
                                    {index === 2 ? (
                                        <Link href="mailto:info@pinkspot.cc">{step.description}</Link>
                                    ) : (
                                        <p>{step.description}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>

                    <Link
                        className="get-verified-send"
                        href="mailto:info@pinkspot.cc?subject=Pinkspot%20Verification%20Photo"
                    >
                        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                        Send Photo
                    </Link>

                    <Link className="get-verified-help" href="/contactus">
                        <i className="fa-regular fa-circle-question" aria-hidden="true"></i>
                        Need help?
                    </Link>

                    <p className="get-verified-review-note">
                        <i className="fa-solid fa-lock" aria-hidden="true"></i>
                        Verification is usually reviewed within a few hours.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}
