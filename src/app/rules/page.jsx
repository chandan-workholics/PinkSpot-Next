// /src/app/rules/page.jsx
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Link from "next/link";

const canonicalUrl = "https://pinkspot.cc/rules/";
const OG_IMAGE = "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png";

// Optional: fetch SEO dynamically
async function getSeoData() {
  try {
    const res = await fetch(
      "https://pinkspot.cc/api/v1/pages/getPageById/653281cdefe8c2f29fdcecaf"
    );
    const data = await res.json();
    return data?.data || {};
  } catch (err) {
    console.error("SEO fetch error:", err);
    return {};
  }
}

export async function generateMetadata() {
  const seo = await getSeoData();
  const title = seo?.seotitle || "Official Rules & Posting Guidelines | PinkSpot";
  const description =
    seo?.seodescription ||
    "Read PinkSpot's official rules & posting guidelines to ensure safe and respectful ad posting.";

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

export default function RulesPage() {
  return (
    <div>
      <div className="container-fluid p-0">
        <div className="rules-page">
          <div className="home-banner">
            <Header className="position-absolute w-100" />
          </div>

          <div className="mt-5">
            <button

              className="btn btn-light shadow-sm m-3"
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Back
            </button>
          </div>

          <div className="py-5">
            <div className="container mt-3">
              <p className="text-responsive">
                These Official Rules apply to every user or member who posts ads on our website. Users must behave in a peaceful, civil, prudent, and respectful manner at all times.
              </p>

              <h4>RESTRICTED CONTENT:</h4>
              <p className="text-responsive">
                Ads content must not infringe intellectual property or privacy rights, and cannot include defamatory, fraudulent, abusive, threatening, offensive, obscene, or illegal content.
              </p>

              <h4>AD RULES:</h4>
              <p className="text-responsive">
                Free users may post one ad per day. Paid users can post multiple ads. All users agree to:
              </p>
              <ul>
                <li>Post ads in the correct category.</li>
                <li>Avoid spammy or frequent posts.</li>
                <li>Free users: only one account; multiple accounts are prohibited.</li>
                <li>Paid users: multiple paid accounts allowed.</li>
                <li>No promotion of illegal goods, services, or content.</li>
                <li>No solicitation of illegal services, including sexual services for money.</li>
              </ul>

              <h4>REPORTING:</h4>
              <p className="text-responsive">
                Report violations to <Link href="mailto:support@pinkspot.cc">support@pinkspot.cc</Link>. For suspected criminal activity, report immediately to law enforcement. We cooperate fully with authorities.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
