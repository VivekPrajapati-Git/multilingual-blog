import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenSquare, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const location = useLocation();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (location.pathname === '/login') return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    MLBlog
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">
                        Read
                    </Link>

                    {user ? (
                        <>
                            <Link to="/create" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                <PenSquare size={18} />
                                <span>Write</span>
                            </Link>
                            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <User size={16} />
                                    <span>{user.email}</span>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
