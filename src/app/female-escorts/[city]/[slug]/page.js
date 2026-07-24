import Profile from "./Profile";
import { apiUrl } from "../../../../config/api";

export async function generateMetadata({ params }) {
    const { slug, city } = params; // ✅ destructure params first

    let post = {};

    try {
        const res = await fetch(apiUrl("/postad/getpostadby_single_slug"), {
            method: "POST",
            body: JSON.stringify({ slug }),
            headers: { "Content-Type": "application/json" },
            cache: "no-store"
        });

        const apiResponse = await res.json();
        post = apiResponse?.data || {};
    } catch (err) {
        console.error("Error fetching post for metadata:", err);
    }

    const seoTitle = post.title ? `${post.title} - ${post.city || ""} | Pink Spot` : "Profile | Pink Spot";
    const seoDescription = post.description || "Discover amazing profiles on Pink Spot.";
    const seoImage = post.image || "/pink-logo.png";
    const urlpath = `https://pinkspot.cc/female-escorts/${city}/${slug}`;

    return {
        title: seoTitle,
        description: seoDescription,
        alternates: { canonical: urlpath },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: urlpath,
            type: "profile",
            images: [{ url: seoImage }]
        },
        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description: seoDescription,
            images: [seoImage]
        }
    };
}


export default async function ProfilePage({ params }) {
    try {
        const res = await fetch(apiUrl("/postad/getpostadby_single_slug"), {
            method: "POST",
            body: JSON.stringify({ slug: params.slug }),
            headers: { "Content-Type": "application/json" },
            cache: "no-store"
        });

        const apiResponse = await res.json();
        const post = apiResponse?.data || {};

        return <Profile post={post} />;
    } catch (err) {
        console.error(err);
        return <Profile post={{}} />;
    }
}
