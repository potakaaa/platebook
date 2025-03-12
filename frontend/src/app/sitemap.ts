import axios from "axios";
import { Metadata, MetadataRoute } from "next";

const fetchRecipeIds = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}recipe-ids`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while fetching recipe ids:", err);

    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nextUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetchRecipeIds();

  const recipe_ids = res?.recipe_ids ?? [];

  const postEntries: MetadataRoute.Sitemap = recipe_ids.map((id: number) => ({
    url: `${nextUrl}/post/${id}`,
  }));

  return [
    {
      url: `${nextUrl}/`,
      lastModified: "2025-03-11",
      changeFrequency: "yearly",
    },
    {
      url: `${nextUrl}/home`,
      lastModified: "2025-03-11",
      changeFrequency: "daily",
    },
    {
      url: `${nextUrl}/terms-policy`,
      lastModified: "2025-03-11",
      changeFrequency: "yearly",
    },
    {
      url: `${nextUrl}/login`,
      lastModified: "2025-03-11",
      changeFrequency: "yearly",
    },
    {
      url: `${nextUrl}/signup`,
      lastModified: "2025-03-11",
      changeFrequency: "yearly",
    },
    ...postEntries,
  ];
}

// [
//     { loc: "/", lastmod: "2025-03-11", changefreq: "yearly", priority: "1.0" },
//     {
//       loc: "/home",
//       lastmod: "2025-03-11",
//       changefreq: "daily",
//       priority: "0.8",
//     },
//     {
//       loc: "/terms-policy",
//       lastmod: "2025-03-11",
//       changefreq: "yearly",
//       priority: "1.0",
//     },
//     {
//       loc: "/login",
//       lastmod: "2025-03-11",
//       changefreq: "yearly",
//       priority: "1.0",
//     },
//     {
//       loc: "/signup",
//       lastmod: "2025-03-11",
//       changefreq: "yearly",
//       priority: "1.0",
//     },
//   ];
