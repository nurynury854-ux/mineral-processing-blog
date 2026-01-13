'use client';

import Link from 'next/link';
import { Calendar, TrendingUp, Tag } from 'lucide-react';
import { PostMetadata } from '@/types/post';

export function Sidebar({ 
  recentPosts, 
  popularPosts, 
  tags 
}: { 
  recentPosts: PostMetadata[];
  popularPosts: PostMetadata[];
  tags: string[];
}) {
  return (
    <aside className="space-y-6">
      {/* Author Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src="/profile.png" 
            alt="Г.Даваацэрэн"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-900">Г.Даваацэрэн</h3>
            <p className="text-sm text-gray-600">G.Davaatseren</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          MSc, Mineral Processing Engineer
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Comminution Technology | METSIM & JKSimMet | Python & R Programming
        </p>
        <Link 
          href="/about"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Дэлгэрэнгүй үзэх →
        </Link>
      </div>

      {/* Metal Prices Widget */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Металлын үнэ / Metal Prices
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Gold (Au)</span>
            <span className="font-medium text-gray-900">$2,650/oz</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Silver (Ag)</span>
            <span className="font-medium text-gray-900">$30.50/oz</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Copper (Cu)</span>
            <span className="font-medium text-gray-900">$4.15/lb</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Zinc (Zn)</span>
            <span className="font-medium text-gray-900">$1.20/lb</span>
          </div>
          <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
            Source: Kitco.com
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Сүүлийн нийтлэл / Recent Posts
        </h3>
        <div className="space-y-3">
          {recentPosts.slice(0, 5).map((post) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="block group"
            >
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString('mn-MN')}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Түлхүүр үг / Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Donation */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-2">
          Дэмжлэг үзүүлэх / Support
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          ХААН Банк / Khan Bank
        </p>
        <p className="text-sm font-mono font-medium text-gray-900 bg-white px-3 py-2 rounded border border-gray-200">
          5128026371
        </p>
      </div>
    </aside>
  );
}
