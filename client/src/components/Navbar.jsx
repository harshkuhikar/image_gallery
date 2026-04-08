import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 glass"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-2xl font-bold text-primary-500">Sonal AgriTech</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-lg font-medium transition-colors ${location.pathname === link.path
                                        ? 'text-primary-500'
                                        : 'text-gray-700 hover:text-primary-500'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/admin"
                            className="text-lg font-medium text-gray-700 hover:text-primary-500 transition-colors"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden pb-4"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-lg font-medium text-gray-700 hover:text-primary-500"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-lg font-medium text-gray-700 hover:text-primary-500"
                        >
                            Admin
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
