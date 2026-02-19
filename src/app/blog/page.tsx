import { Metadata } from "next";
import { client } from "@/sanity/client";
import { allPostsQuery, allCategoriesQuery } from "@/sanity/queries";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Digitally Next",
  description:
    "Insights, strategies, and thought leadership from Digitally Next — your full-stack digital marketing partner.",
};

// Revalidate every 60 seconds
export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  excerpt?: string;
  publishedAt?: string;
  categories?: { _id: string; title: string }[];
  author?: { name: string; image?: { asset: { _ref: string } } };
}

interface Category {
  _id: string;
  title: string;
}

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    client.fetch(allPostsQuery),
    client.fetch(allCategoriesQuery),
  ]);

  return <BlogPageClient posts={posts} categories={categories} />;
}
