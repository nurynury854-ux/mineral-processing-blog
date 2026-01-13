'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const allPosts = getAllPosts();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [query, allPosts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      {/* Back Button */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Хайлт / Search
        </h1>
        
        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Нийтлэл, түлхүүр үг хайх / Search posts and tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results */}
      <div>
        {query.trim() && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {results.length} {results.length === 1 ? 'үр дүн / result' : 'үр дүн / results'} найдсан
          </p>
        )}

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString('mn-MN')}</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Үр дүн олдсонгүй / No results found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Өөр хайлт оролдоно уу / Try a different search
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Хайлтын үг оруулна уу / Enter a search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
