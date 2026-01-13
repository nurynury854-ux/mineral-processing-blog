import { getSortedPostsData, getPostsByTag } from '@/lib/posts.server';
import { PostCard } from '@/components/PostCard';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  const allPosts = getSortedPostsData();
  const postsByTag = getPostsByTag();
  const tags = Object.keys(postsByTag).sort((a, b) => postsByTag[b].length - postsByTag[a].length);
  
  // Get most viewed posts (simulated for now)
  const popularPosts = [...allPosts].sort((a, b) => (b.views || 0) - (a.views || 0));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Ашигт малтмалын баяжуулалтын техник, технологи
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Mineral Processing Technology & Engineering
            </p>
          </div>

          <div className="space-y-6">
            {allPosts.length > 0 ? (
              allPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Одоогоор нийтлэл байхгүй байна.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  No posts available yet. Content is being migrated from the original blog.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Sidebar 
              recentPosts={allPosts.slice(0, 5)}
              popularPosts={popularPosts.slice(0, 5)}
              tags={tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
