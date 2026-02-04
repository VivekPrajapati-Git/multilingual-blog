import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { Clock, ArrowRight } from 'lucide-react';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="pt-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="pt-24 px-6 pb-12 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Latest Stories</h1>
                <Link to="/create" className="btn-primary">Write New</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <Link key={blog.id} to={`/blog/${blog.id}`} className="glass-card group flex flex-col h-full hover:-translate-y-1">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <span className="uppercase tracking-wider text-xs font-semibold px-2 py-1 rounded bg-white/5">
                                    {blog.language || 'English'}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold group-hover:text-blue-400 transition-colors line-clamp-2">
                                {blog.title}
                            </h2>

                            <p className="text-slate-400 line-clamp-3">
                                {blog.content}
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center text-blue-400 font-semibold group-hover:gap-2 transition-all">
                            Read Article <ArrowRight size={16} className="ml-1" />
                        </div>
                    </Link>
                ))}

                {blogs.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-500">
                        No blogs yet. Be the first to write one!
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
