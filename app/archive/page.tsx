import { getPostsByYear } from '@/lib/posts.server';
import Link from 'next/link';
import { Calendar, FileText } from 'lucide-react';

export const metadata = {
  title: 'Архив / Archive | Г.Даваацэрэн',
  description: 'Blog post archive organized by year',
};

export default function ArchivePage() {
  const postsByYear = getPostsByYear();
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Нийтлэлийн архив / Post Archive
          </h1>
          <p className="text-gray-600">
            Жилээр ангилсан бүх нийтлэлүүд
          </p>
        </div>

        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                {year}
                <span className="ml-3 text-sm font-normal text-gray-600">
                  ({postsByYear[year].length} нийтлэл)
                </span>
              </h2>

              <div className="space-y-3">
                {postsByYear[year].map((post) => (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    className="block p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(post.date).toLocaleDateString('mn-MN', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {years.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
              <p className="text-gray-600">
                Одоогоор нийтлэл байхгүй байна.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
