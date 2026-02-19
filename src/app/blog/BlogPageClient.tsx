"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { urlFor } from "@/sanity/image";

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

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPageClient({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((p) =>
        p.categories?.some((c) => c._id === activeCategory)
      )
    : posts;

  return (
    <div className="mt-20" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="blog-hero-label">OUR BLOG</span>
            <h1 className="blog-hero-title">
              Insights & Ideas
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p className="blog-hero-subtitle">
              Strategies, trends, and thought leadership from the Digitally Next
              team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container" style={{ paddingBottom: 16 }}>
        <div className="blog-filters">
          <button
            className={`blog-filter-btn ${activeCategory === null ? "blog-filter-btn-active" : ""}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`blog-filter-btn ${activeCategory === cat._id ? "blog-filter-btn-active" : ""}`}
              onClick={() => setActiveCategory(cat._id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="container section" style={{ paddingTop: 24 }}>
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="blog-empty"
          >
            <p style={{ fontSize: 64, marginBottom: 16, lineHeight: 1 }}>📝</p>
            <h3
              style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}
            >
              No posts yet
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
              We&apos;re cooking up some great content. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="blog-card"
                >
                  {/* Image */}
                  <div className="blog-card-image-wrapper">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(340)
                          .url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="blog-card-image-placeholder">
                        <span>DN</span>
                      </div>
                    )}
                    {/* Category badge */}
                    {post.categories?.[0] && (
                      <span className="blog-card-category">
                        {post.categories[0].title}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      {post.author && (
                        <span className="blog-card-meta-item">
                          <User size={13} />
                          {post.author.name}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="blog-card-meta-item">
                          <Calendar size={13} />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                    )}
                    <span className="blog-card-link">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
