import AllCategoryClient from "../../search-escorts/AllCategoryClient";
import { cityMeta } from "../../../utils/cityMeta";

// 🔥 SEO METADATA FUNCTION
export async function generateMetadata({ params }) {
  const { city } = await params;

  const meta = cityMeta[city];

  // fallback formatter
  const formatCity = (slug) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const formattedCity = formatCity(city);

  return {
    title: meta?.title || `Female Escorts in ${formattedCity}`,
    description:
      meta?.description ||
      `Browse Pinkspot’s female escort ads in ${formattedCity}`,
  };
}

// 🔥 PAGE
export default async function Page({ params }) {
  const { city } = await params;

  return <AllCategoryClient initialCity={city} />;
}