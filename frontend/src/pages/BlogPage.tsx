import React from 'react';
import { 
  BookOpenIcon,
  CalendarDaysIcon,
  UserIcon,
  TagIcon,
  ArrowRightIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const BlogPage: React.FC = () => {
  const featuredPost = {
    title: 'The Future of E-commerce: Trends Shaping 2024',
    author: 'Sarah Johnson',
    date: 'December 20, 2023',
    readTime: '8 min read',
    category: 'Industry Insights',
    excerpt: 'Discover the emerging trends that are revolutionizing online shopping and how ShopHub is leading the charge in creating the next generation of e-commerce experiences.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    views: '2.5K',
    likes: '145',
    color: 'blue'
  };

  const blogPosts = [
    {
      title: '10 Essential Tips for Holiday Shopping Success',
      author: 'Mike Chen',
      date: 'December 15, 2023',
      readTime: '5 min read',
      category: 'Shopping Tips',
      excerpt: 'Make your holiday shopping stress-free with these expert tips for finding the best deals and perfect gifts.',
      image: 'https://images.unsplash.com/photo-1607344645866-009c7d0f2e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      views: '1.8K',
      likes: '89',
      color: 'green'
    },
    {
      title: 'Sustainable Shopping: How to Make Eco-Friendly Choices',
      author: 'Emma Rodriguez',
      date: 'December 10, 2023',
      readTime: '6 min read',
      category: 'Sustainability',
      excerpt: 'Learn how to shop responsibly and reduce your environmental impact while still getting the products you love.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      views: '1.2K',
      likes: '156',
      color: 'emerald'
    },
    {
      title: 'Product Review: Top 5 Tech Gadgets of 2023',
      author: 'David Kim',
      date: 'December 5, 2023',
      readTime: '7 min read',
      category: 'Product Reviews',
      excerpt: 'Our comprehensive review of the year\'s most innovative tech gadgets that are worth your investment.',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      views: '3.1K',
      likes: '201',
      color: 'purple'
    },
    {
      title: 'Behind the Scenes: ShopHub\'s Customer Service Excellence',
      author: 'Lisa Thompson',
      date: 'November 30, 2023',
      readTime: '4 min read',
      category: 'Company Culture',
      excerpt: 'Take a peek behind the curtain to see how our customer service team delivers exceptional support.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      views: '956',
      likes: '67',
      color: 'orange'
    },
    {
      title: 'Mobile Shopping: Optimizing Your Experience',
      author: 'Alex Park',
      date: 'November 25, 2023',
      readTime: '5 min read',
      category: 'Mobile Tips',
      excerpt: 'Maximize your mobile shopping experience with these tips and tricks for shopping on the go.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      views: '1.4K',
      likes: '92',
      color: 'blue'
    },
    {
      title: 'Gift Guide: Perfect Presents for Every Budget',
      author: 'Rachel Green',
      date: 'November 20, 2023',
      readTime: '6 min read',
      category: 'Gift Guides',
      excerpt: 'Find the perfect gift for everyone on your list, no matter what your budget looks like.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      views: '2.3K',
      likes: '178',
      color: 'pink'
    }
  ];

  const categories = [
    { name: 'All Posts', count: 24, active: true },
    { name: 'Shopping Tips', count: 8, active: false },
    { name: 'Product Reviews', count: 6, active: false },
    { name: 'Industry Insights', count: 4, active: false },
    { name: 'Company Culture', count: 3, active: false },
    { name: 'Sustainability', count: 3, active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <BookOpenIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ShopHub <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover insights, tips, and stories from the world of e-commerce. 
              Stay informed with the latest trends and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-lg">
                Subscribe to Blog
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition duration-300">
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                  category.active
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="group cursor-pointer">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-2 transition duration-500 border border-gray-100">
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <div className="flex items-center text-gray-300 text-sm space-x-4">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-2" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-gray-500">
                    <div className="flex items-center">
                      <EyeIcon className="w-5 h-5 mr-2" />
                      <span>{featuredPost.views}</span>
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="w-5 h-5 mr-2" />
                      <span>{featuredPost.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <ShareIcon className="w-5 h-5 mr-2" />
                      <span>Share</span>
                    </div>
                  </div>
                  <button className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium group">
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest <span className="text-indigo-600">Articles</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our collection of insightful articles covering everything from shopping tips to industry trends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                emerald: 'from-emerald-500 to-emerald-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600',
                pink: 'from-pink-500 to-pink-600'
              };
              
              return (
                <article key={index} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`bg-gradient-to-r ${colorClasses[post.color as keyof typeof colorClasses]} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <UserIcon className="w-3 h-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="text-gray-400">{post.date}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-gray-400 text-xs">
                          <div className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center">
                            <HeartIcon className="w-4 h-4 mr-1" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                        <button className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm group">
                          Read More
                          <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transform hover:scale-105 transition duration-300 shadow-lg">
              Load More Articles
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <BookOpenIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Never Miss <span className="text-yellow-300">an Update</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Subscribe to our newsletter and get the latest articles, tips, and insights delivered directly to your inbox.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-l-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-r-full font-bold hover:bg-yellow-300 transition duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-gray-300 text-sm mt-4">
              Join 10,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
