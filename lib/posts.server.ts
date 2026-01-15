// lib/posts.server.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetadata } from "@/types/post";
import type { Post } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostData(slug);
    });
  return allPostsData;
}

export function getPostData(slug: string): PostMetadata {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Ensure excerpt has a value
  const excerpt = (data.excerpt as string) || content.substring(0, 200);

  return {
    slug,
    excerpt,
    title: (data.title as string) || slug,
    date: (data.date as string) || new Date().toISOString(),
    tags: (data.tags as string[]) || [],
    language: (data.language as "mn" | "en" | "mixed") || "en",
    readingTime: (data.readingTime as number) || Math.ceil(content.split(" ").length / 200),
    views: (data.views as number) || 0,
  };
}

export function getFullPostData(slug: string): Post | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure excerpt has a value
    const excerpt = (data.excerpt as string) || content.substring(0, 200);

    return {
      slug,
      excerpt,
      content,
      title: (data.title as string) || slug,
      date: (data.date as string) || new Date().toISOString(),
      tags: (data.tags as string[]) || [],
      language: (data.language as "mn" | "en" | "mixed") || "en",
      readingTime: (data.readingTime as number) || Math.ceil(content.split(" ").length / 200),
      views: (data.views as number) || 0,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostData(slug);
    });
}

export function getSortedPostsData(): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getPostsByTag(): Record<string, PostMetadata[]> {
  const allPosts = getAllPosts();
  const postsByTag: Record<string, PostMetadata[]> = {};

  allPosts.forEach((post) => {
    const tags = post.tags || [];
    tags.forEach((tag) => {
      if (!postsByTag[tag]) {
        postsByTag[tag] = [];
      }
      postsByTag[tag].push(post);
    });
  });

  return postsByTag;
}

export function getPostsByYear(): Record<string, PostMetadata[]> {
  const allPosts = getAllPosts();
  const postsByYear: Record<string, PostMetadata[]> = {};

  allPosts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  return postsByYear;
}
