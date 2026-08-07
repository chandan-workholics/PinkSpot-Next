import Profile from "./Profile";
import { apiUrl } from "../../../../config/api";

async function getPostBySlug(slug) {
    try {
        const res = await fetch(apiUrl("/postad/getpostadby_single_slug"), {
            method: "POST",
            body: JSON.stringify({ slug }),
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const apiResponse = await res.json();
        return apiResponse?.data || {};
    } catch (err) {
        console.error("Error fetching post by slug:", err);
        return {};
    }
}

export async function generateMetadata({ params }) {
    const { slug, city } = await params;
    const post = await getPostBySlug(slug);

    const seoTitle = post.title ? `${post.title} - ${post.city || ""} | Pink Spot` : "Profile | Pink Spot";
    const seoDescription = post.description || "Discover amazing profiles on Pink Spot.";
    const seoImage = post.image || post.image1 || "/pink-logo.png";
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
            images: [{ url: seoImage }],
        },
        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description: seoDescription,
            images: [seoImage],
        },
    };
}

export default async function ProfilePage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return <Profile post={post} />;
}
