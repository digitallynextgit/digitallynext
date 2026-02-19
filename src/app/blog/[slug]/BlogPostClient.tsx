"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  excerpt?: string;
  publishedAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  categories?: { _id: string; title: string }[];
  author?: {
    name: string;
    slug?: { current: string };
    image?: { asset: { _ref: string } };
    bio?: string;
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="blog-content-image">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog image"}
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          {value.caption && (
            <figcaption className="blog-content-caption">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href?.startsWith("/")
        ? "noopener noreferrer"
        : undefined;
      const target = !value.href?.startsWith("/") ? "_blank" : undefined;
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          style={{ color: "var(--accent)", textDecoration: "underline" }}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code
        style={{
          background: "var(--bg-surface)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: "0.9em",
        }}
      >
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          marginTop: 48,
          marginBottom: 16,
          color: "var(--text-primary)",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
          fontWeight: 700,
          marginTop: 36,
          marginBottom: 12,
          color: "var(--text-primary)",
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="blog-content-quote">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "var(--text-secondary)",
          marginBottom: 20,
        }}
      >
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="blog-content-list">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="blog-content-list blog-content-list-numbered">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="blog-content-list-item">{children}</li>
    ),
    number: ({ children }) => (
      <li className="blog-content-list-item">{children}</li>
    ),
  },
};

export default function BlogPostClient({ post }: { post: Post }) {
  return (
    <article
      style={{ background: "var(--bg-primary)", minHeight: "100vh" }}
    >
      {/* Hero Image */}
      <div className="blog-post-hero">
        {post.mainImage?.asset ? (
          <Image
            src={urlFor(post.mainImage).width(1600).height(600).url()}
            alt={post.mainImage.alt || post.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, var(--bg-surface) 0%, #E5393522 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 120,
                fontWeight: 900,
                color: "rgba(255,255,255,0.03)",
              }}
            >
              DN
            </span>
          </div>
        )}
        <div className="blog-post-hero-overlay" />
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: -80, position: "relative", zIndex: 2 }}
        >
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              color: "var(--text-secondary)",
              marginBottom: 24,
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              {post.categories.map((cat) => (
                <span key={cat._id} className="blog-card-category" style={{ position: "static" }}>
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {post.author && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {post.author.image?.asset ? (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--bg-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    <User size={18} />
                  </div>
                )}
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {post.author.name}
                </span>
              </div>
            )}
            {post.publishedAt && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 14,
                  color: "var(--text-muted)",
                }}
              >
                <Calendar size={14} />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "var(--border)",
              marginBottom: 40,
            }}
          />

          {/* Body */}
          {post.body && (
            <div className="blog-content">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* Bottom divider + back link */}
          <div
            style={{
              height: 1,
              background: "var(--border)",
              margin: "60px 0 30px",
            }}
          />
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              color: "var(--accent)",
              fontWeight: 600,
              marginBottom: 80,
              transition: "gap 0.2s",
            }}
          >
            <ArrowLeft size={14} /> Back to all posts
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
