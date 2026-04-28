// SERVER COMPONENT – handles SEO
import AllCategory from "./AllCategory";
import { redirect } from "next/navigation";

const OG_IMAGE = "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png";

export async function generateMetadata({ params }) {
    const city = params.city?.toLowerCase();

    const formattedCity =
        city?.charAt(0).toUpperCase() + city?.slice(1);

    const seoTitle = `Female Escorts in ${formattedCity}`;
    const seoDescription = `Browse Pinkspot’s female escort ads in ${formattedCity}`;

    const urlpath = `https://pinkspot.cc/female-escorts/${city}`;

    return {
        title: seoTitle,
        description: seoDescription,
        alternates: { canonical: urlpath },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: urlpath,
            type: "website",
            images: [{ url: OG_IMAGE }]
        },
        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description: seoDescription,
            images: [OG_IMAGE]
        }
    };
}

export default function Page({ params }) {
    return <AllCategory params={params} />;
}
