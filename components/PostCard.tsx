import Link from 'next/link';
import { Calendar, Clock, Tag as TagIcon } from 'lucide-react';
import { PostMetadata } from '@/types/post';
import { formatDate } from '@/lib/utils';

export function PostCard({ post }: { post: PostMetadata }) {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
      <Link href={`/post/${post.slug}`}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1.5" />
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>
        {post.readingTime && (
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{post.readingTime} минут</span>
          </div>
        )}
      </div>

      {post.excerpt && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <TagIcon className="w-3 h-3 mr-1" />
              {tag}
            </Link>
          ))}
        </div>
      )}

      <Link
        href={`/post/${post.slug}`}
        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        Унших →
      </Link>
    </article>
  );
}
