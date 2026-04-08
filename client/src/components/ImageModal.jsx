import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageModal = ({ image, onClose }) => {
    if (!image) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                >
                    <X size={32} />
                </button>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-5xl w-full"
                >
                    <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    />
                    <div className="mt-4 text-white">
                        <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
                        {image.description && (
                            <p className="text-gray-300 mb-2">{image.description}</p>
                        )}
                        {image.category && (
                            <span className="inline-block bg-primary-500 px-3 py-1 rounded-full text-sm">
                                {image.category.name}
                            </span>
                        )}
                        {image.tags && image.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {image.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-700 px-2 py-1 rounded text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageModal;
