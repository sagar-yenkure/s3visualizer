import { MetadataRoute } from "next";

const BaseUrl = "https://storage.sagaryenkure.pro";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${BaseUrl}`,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BaseUrl}/gallery`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BaseUrl}/credentials`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
