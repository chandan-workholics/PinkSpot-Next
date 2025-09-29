// /src/app/contactus/page.jsx
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import contactus from "../../../public/images/Contact us-rafiki.png";
import Footer from "../components/footer/Footer";

const canonicalUrl = "https://pinkspot.cc/contactus/";
const OG_IMAGE = "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png"; // fallback

// Optional: fetch SEO dynamically from API
async function getSeoData() {
  try {
    const res = await fetch(
      "https://pinkspot.cc/api/v1/pages/getPageById/653274eaefe8c2f29fdcea88",
      { next: { revalidate: 60 } } // cache for 60 seconds
    );
    const data = await res.json();
    return data?.data || {};
  } catch (err) {
    console.error("SEO fetch error:", err);
    return {};
  }
}

// Next.js 13+ metadata
export async function generateMetadata() {
  const seo = await getSeoData();
  const title = seo?.seotitle || "Contact Us | Pink Spot";
  const description =
    seo?.seodescription ||
    "Get in touch with Pink Spot for support, inquiries, and assistance. We're here to help you with any questions you may have.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: seo?.seoimageurl || OG_IMAGE }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seo?.seoimageurl || OG_IMAGE],
    },
    metadataBase: new URL(canonicalUrl),
  };
}

export default async function ContactUsPage() {
  const seo = await getSeoData();

  return (
    <div className="contact-us-page">
      {/* Header */}
      <Header />

      {/* Contact Section */}
      <section className="h-100 contact-banner bg-ffdef7">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-10" data-aos="zoom-in" data-aos-duration="2000">
              <div className="card contact-card shadow-lg p-4 border-0 rounded-5">
                <div className="row g-0 align-items-center">
                  {/* Image Section */}
                  <div className="col-md-6">
                    <Image
                      src={contactus}
                      alt="Contact Us Illustration"
                      className="img-fluid contact-img"
                      layout="responsive"
                      priority
                    />
                  </div>

                  {/* Contact Details Section */}
                  <div className="col-md-6 col-12 d-flex flex-column text-center p-0 pt-0 pt-lg-4">
                    <h1 className="fw-bold text-primary">Contact Us</h1>
                    <p className="fw-semibold text-muted">
                      For any support related issues please contact
                    </p>

                    <Link href="mailto:support@pinkspot.cc">
                      <button className="btn btn-lg bg-dd88cf text-white rounded-4 shadow-sm mx-auto px-3 py-2 mt-3">
                        <span>support@pinkspot.cc</span>
                        <i className="fa-solid fa-paper-plane ms-2"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
