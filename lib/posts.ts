import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { Post, PostMetadata } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getSortedPostsData(): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        // Calculate reading time (average 200 words per minute)
        const words = fileContents.split(/\s+/).length;
        const readingTime = Math.ceil(words / 200);

        return {
          slug,
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || '',
          tags: matterResult.data.tags || [],
          language: matterResult.data.language || 'mn',
          readingTime,
          views: matterResult.data.views || 0,
        } as PostMetadata;
      });

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostData(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    const words = fileContents.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString(),
      excerpt: matterResult.data.excerpt || '',
      content: contentHtml,
      tags: matterResult.data.tags || [],
      language: matterResult.data.language || 'mn',
      readingTime,
      views: matterResult.data.views || 0,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          slug: fileName.replace(/\.md$/, ''),
        };
      });
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
}

export function getPostsByYear(): Record<string, PostMetadata[]> {
  const posts = getSortedPostsData();
  const postsByYear: Record<string, PostMetadata[]> = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  return postsByYear;
}

export function getPostsByTag(): Record<string, PostMetadata[]> {
  const posts = getSortedPostsData();
  const postsByTag: Record<string, PostMetadata[]> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!postsByTag[tag]) {
        postsByTag[tag] = [];
      }
      postsByTag[tag].push(post);
    });
  });

  return postsByTag;
}
