import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBlogById } from '../services/api';
import { Globe, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'it', name: 'Italian' },
];

const BlogDetail = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const lang = searchParams.get('lang') || '';

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [translating, setTranslating] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            setTranslating(true);
            try {
                // If lang is empty, backend returns original.
                const data = await getBlogById(id, lang);
                setBlog(data);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
            } finally {
                setLoading(false);
                setTranslating(false);
            }
        };
        fetchBlog();
    }, [id, lang]);

    const handleLanguageChange = (newLang) => {
        setSearchParams({ lang: newLang });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-blue-500" />
            </div>
        );
    }

    if (!blog) return <div className="pt-24 text-center">Blog not found</div>;

    return (
        <div className="pt-24 px-6 pb-20 max-w-4xl mx-auto">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} /> Back to stories
            </Link>

            <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                {/* Language Selector */}
                <div className="absolute top-6 right-6 z-10">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-colors border border-white/10">
                            <Globe size={16} className="text-blue-400" />
                            <span className="text-sm font-medium">
                                Read in: <span className="text-white">{LANGUAGES.find(l => l.code === (blog.language || 'en'))?.name || blog.language}</span>
                            </span>
                        </button>

                        <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-800 rounded-lg shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-20">
                            {LANGUAGES.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => handleLanguageChange(l.code)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${(blog.language === l.code) ? 'text-blue-400 bg-slate-700/50' : 'text-slate-300'
                                        }`}
                                >
                                    {l.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {translating && (
                    <div className="absolute inset-0 z-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={32} className="animate-spin text-blue-500" />
                            <span className="text-sm font-medium text-slate-300">Translating...</span>
                        </div>
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-200 mb-6 leading-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-10 border-b border-white/5 pb-6">
                    <span>Original Language: <span className="uppercase">{blog.originalLanguage || blog.language}</span></span>
                    <span>•</span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-300">
                        {blog.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
