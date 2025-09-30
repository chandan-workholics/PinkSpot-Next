// SERVER COMPONENT – handles SEO
import AllCategory from "./AllCategory";

const OG_IMAGE = "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png";

export async function generateMetadata({ params }) {
    const { city } = params; // dynamic city from URL

    const seoTitle = `${city ? city : "Search"} Escorts | Pinkspot.cc – Canada's Sex Worker-Owned Escort Directory`;

    const seoDescription = `Discover top escorts in ${city} on Pinkspot.cc. Browse verified profiles and find your ideal match.`;

    const urlpath = `https://pinkspot.cc/${city}-escorts`;

    return {
        title: seoTitle,
        description: seoDescription,
        alternates: { canonical: urlpath },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: urlpath,
            type: "profile",
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
    return <AllCategory params={params}/>;
}
