import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import ImageModal from '../components/ImageModal';
import { Search, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchImages();
    }, [selectedCategory, searchTerm, page]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
        }
    };

    const fetchImages = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/images', {
                params: {
                    category: selectedCategory,
                    search: searchTerm,
                    page,
                    limit: 12,
                },
            });
            setImages(data.images);
        } catch (error) {
            toast.error('Failed to load images');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold text-center mb-8 text-gray-900"
                >
                    Our Gallery
                </motion.h1>

                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`px-6 py-2 rounded-full transition-all ${selectedCategory === ''
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => setSelectedCategory(cat._id)}
                                className={`px-6 py-2 rounded-full transition-all ${selectedCategory === cat._id
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Images Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-primary-500" size={48} />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-500">No images found</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {images.map((image, idx) => (
                            <motion.div
                                key={image._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedImage(image)}
                                className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                            >
                                <img
                                    src={image.imageUrl}
                                    alt={image.title}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="text-lg font-bold">{image.title}</h3>
                                        {image.category && (
                                            <p className="text-sm text-gray-300">{image.category.name}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
};

export default Gallery;
