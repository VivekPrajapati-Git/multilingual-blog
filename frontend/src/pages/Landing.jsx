import { Link } from 'react-router-dom';
import { Globe, BookOpen, PenTool } from 'lucide-react';

const Landing = () => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="z-10 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-blue-300 mb-4">
                    <Globe size={16} />
                    <span>Break the language barrier</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Blogging Without Borders
                    </span>
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Write deeply in your native tongue. Let the world read in theirs.
                    The first AI-powered multilingual blogging platform.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <Link to="/blogs" className="btn-primary flex items-center gap-2 text-lg px-8 py-3">
                        <BookOpen size={20} />
                        Start Reading
                    </Link>
                    <Link to="/create" className="px-8 py-3 rounded-lg glass hover:bg-white/10 transition-all font-semibold flex items-center gap-2 text-lg">
                        <PenTool size={20} />
                        Write a Story
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
