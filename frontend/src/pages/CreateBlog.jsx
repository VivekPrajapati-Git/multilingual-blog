import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../services/api';
import { Loader2, Send } from 'lucide-react';

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

const CreateBlog = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        language: 'en'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createBlog(formData);
            navigate('/blogs');
        } catch (error) {
            console.error('Failed to create blog:', error);
            alert('Failed to publish blog. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl glass-card space-y-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Share Your Story
                </h1>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Title</label>
                    <input
                        type="text"
                        required
                        className="input-field text-lg font-semibold"
                        placeholder="Enter a captivating title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Original Language</label>
                        <select
                            className="input-field appearance-none"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code} className="bg-slate-800">
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Content</label>
                    <textarea
                        required
                        rows={12}
                        className="input-field resize-none leading-relaxed"
                        placeholder="Start writing here..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Publishing...
                            </>
                        ) : (
                            <>
                                <Send size={18} /> Publish Story
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
