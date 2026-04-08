import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import LogoRain from '../components/LogoRain';
// import logo from "..//client/public/SA-logo.png"
import logo from "..//../public/SA-logo.png"

const Portfolio = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [companyLogo, setCompanyLogo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchImages();
    }, [selectedCategory]);

    const fetchData = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
            // Get company logo from first category with logo
            const logoCategory = data.find(cat => cat.logoUrl);
            if (logoCategory) {
                setCompanyLogo(logoCategory.logoUrl);
            }
            fetchImages();
        } catch (error) {
            console.error('Failed to load');
        }
    };

    const fetchImages = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/images', {
                params: {
                    category: selectedCategory,
                    limit: 100,
                },
            });
            setImages(data.images);
        } catch (error) {
            console.error('Failed to load images');
        } finally {
            setLoading(false);
        }
    };

    const scrollCategories = (direction) => {
        const container = document.getElementById('categories-scroll');
        if (container) {
            const scrollAmount = 200;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-white">
            {/* iOS-style gradient background */}
            <div className="fixed inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.03),transparent_50%)]" />
            </div>

            {/* Subtle Logo Rain */}
            <LogoRain logos={categories.filter(c => c.logoUrl).map(c => c.logoUrl)} />

            {/* iOS-style Header */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 pt-safe"
            >
                {/* Company Logo - Centered */}
                <div className="flex justify-center pt-12 pb-6">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.3,
                            type: 'spring',
                            stiffness: 200,
                            damping: 20
                        }}
                        className="relative"
                    >
                        {companyLogo ? (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-96 h-36 rounded-3xl bg-white shadow-2xl shadow-black/10 p-4 flex items-center justify-center overflow-hidden"
                            >
                                <img
                                    src={logo}
                                    alt="Company Logo"
                                    className="w-full h-full "
                                />
                            </motion.div>
                            // <motion.div
                            //     whileHover={{ scale: 1.05 }}
                            //     className="w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-black/10 p-4 flex items-center justify-center overflow-hidden"
                            // >
                            //     <img
                            //         src={logo}
                            //         alt="Company Logo"
                            //         className="w-full h-full object-contain"
                            //     />
                            // </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl shadow-primary-500/30 flex items-center justify-center"
                            >
                                <span className="text-white font-bold text-4xl">S</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-gray-500 text-sm font-medium tracking-wide mb-8"
                >
                    OUR PORTFOLIO
                </motion.p>
            </motion.div>

            {/* iOS-style Category Pills with Scroll */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative z-10 mb-8 px-4"
            >
                <div className="max-w-7xl mx-auto relative">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scrollCategories('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                    >
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() => scrollCategories('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                    >
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>

                    {/* Scrollable Categories */}
                    <div
                        id="categories-scroll"
                        className="flex gap-2 overflow-x-auto scrollbar-hide px-10 py-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory('')}
                            className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${selectedCategory === ''
                                ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </motion.button>

                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat._id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.7 + idx * 0.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(cat._id)}
                                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${selectedCategory === cat._id
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.logoUrl && (
                                    <img
                                        src={cat.logoUrl}
                                        alt={cat.name}
                                        className="w-8 h-8 object-contain"
                                    />
                                )}
                                {cat.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* iOS-style Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full"
                        />
                    </div>
                ) : images.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📷</span>
                        </div>
                        <p className="text-gray-500 font-medium">No projects yet</p>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                    >
                        {images.map((image, idx) => (
                            <motion.div
                                key={image._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: idx * 0.03,
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 25
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedImage(image)}
                                className="cursor-pointer group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square"
                            >
                                <motion.img
                                    src={image.imageUrl}
                                    alt=""
                                    layoutId={`image-${image._id}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />

                                {/* iOS-style hover overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/5"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* iOS-style Full-Screen Viewer */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                    >
                        {/* iOS-style Close Button */}
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center z-10 hover:bg-white/20 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </motion.button>

                        <motion.div
                            layoutId={`image-${selectedImage._id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-7xl w-full h-full flex items-center justify-center p-4"
                        >
                            <img
                                src={selectedImage.imageUrl}
                                alt=""
                                className="max-w-full max-h-full object-contain rounded-xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Admin Access - Press Logo 5 times */}
            <div className="fixed top-0 left-0 w-20 h-20 z-50">
                <a
                    href="/admin"
                    className="block w-full h-full opacity-0"
                    aria-label="Admin"
                />
            </div>
        </div>
    );
};

export default Portfolio;
