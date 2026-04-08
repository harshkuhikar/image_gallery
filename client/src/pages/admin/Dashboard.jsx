import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
    Image as ImageIcon,
    FolderOpen,
    Upload,
    LogOut,
    Trash2,
    Plus,
    X,
    Loader,
    Edit2
} from 'lucide-react';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
    const { user, logout, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ images: 0, categories: 0 });
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        // Only redirect if auth is loaded and user is not present
        if (!authLoading) {
            if (!user) {
                navigate('/admin');
            } else {
                fetchData();
            }
        }
    }, [user, authLoading, navigate]);

    const fetchData = async () => {
        setDataLoading(true);
        try {
            const [imagesRes, categoriesRes] = await Promise.all([
                api.get('/images?limit=100'),
                api.get('/categories'),
            ]);
            setImages(imagesRes.data.images);
            setCategories(categoriesRes.data);
            setStats({
                images: imagesRes.data.images.length,
                categories: categoriesRes.data.length,
            });
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setDataLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const handleImageUpload = async (data) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);
            formData.append('title', data.title);
            formData.append('description', data.description || '');
            formData.append('category', data.category);
            formData.append('tags', data.tags || '');

            await api.post('/images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Image uploaded successfully!');
            setShowUploadModal(false);
            reset();
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (id) => {
        if (!confirm('Delete this image?')) return;

        try {
            await api.delete(`/images/${id}`);
            toast.success('Image deleted');
            fetchData();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleAddCategory = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description || '');
            if (data.logo && data.logo[0]) {
                formData.append('logo', data.logo[0]);
            }

            if (editingCategory) {
                // Update existing category
                await api.put(`/categories/${editingCategory._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('Company updated!');
            } else {
                // Create new category
                await api.post('/categories', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('Company added!');
            }

            setShowCategoryModal(false);
            setEditingCategory(null);
            reset();
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save company');
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        reset({
            name: category.name,
            description: category.description || '',
        });
        setShowCategoryModal(true);
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('Delete this company?')) return;

        try {
            await api.delete(`/categories/${id}`);
            toast.success('Company deleted');
            fetchData();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader className="animate-spin text-primary-500" size={48} />
            </div>
        );
    }

    // Don't render if no user (will redirect)
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                Portfolio Dashboard
                            </h1>
                            <p className="text-sm text-gray-600">Welcome, {user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                        >
                            <LogOut size={20} className="mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 font-medium">Total Images</p>
                                <p className="text-4xl font-bold text-primary-600">{stats.images}</p>
                            </div>
                            <ImageIcon size={48} className="text-primary-500 opacity-50" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 font-medium">Companies</p>
                                <p className="text-4xl font-bold text-primary-600">{stats.categories}</p>
                            </div>
                            <FolderOpen size={48} className="text-primary-500 opacity-50" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex items-center justify-center"
                    >
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="btn-primary w-full flex items-center justify-center"
                        >
                            <Upload size={20} className="mr-2" />
                            Upload Image
                        </button>
                    </motion.div>
                </div>

                {/* Companies Management */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Companies / Clients</h2>
                        <button
                            onClick={() => setShowCategoryModal(true)}
                            className="btn-primary flex items-center"
                        >
                            <Plus size={20} className="mr-2" />
                            Add Company
                        </button>
                    </div>

                    {dataLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader className="animate-spin text-primary-500" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categories.map((cat) => (
                                <motion.div
                                    key={cat._id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    {cat.logoUrl && (
                                        <img src={cat.logoUrl} alt={cat.name} className="w-16 h-16 object-contain mx-auto mb-2" />
                                    )}
                                    <p className="font-semibold text-center text-sm mb-2">{cat.name}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditCategory(cat)}
                                            className="flex-1 text-blue-500 hover:text-blue-700 text-xs flex items-center justify-center gap-1 py-1 rounded hover:bg-blue-50 transition-colors"
                                        >
                                            <Edit2 size={14} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(cat._id)}
                                            className="flex-1 text-red-500 hover:text-red-700 text-xs flex items-center justify-center gap-1 py-1 rounded hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Images Grid */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Recent Images</h2>
                    {dataLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader className="animate-spin text-primary-500" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {images.map((image) => (
                                <motion.div
                                    key={image._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={image.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold mb-1 truncate">{image.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{image.category?.name}</p>
                                        <button
                                            onClick={() => handleDeleteImage(image._id)}
                                            className="text-red-500 hover:text-red-700 flex items-center text-sm gap-1"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/95 backdrop-blur-sm max-w-md w-full p-6 rounded-2xl shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Upload Image</h2>
                            <button onClick={() => setShowUploadModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleImageUpload)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Image *</label>
                                <input
                                    {...register('image', { required: 'Image is required' })}
                                    type="file"
                                    accept="image/*"
                                    className="w-full"
                                />
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Title *</label>
                                <input
                                    {...register('title', { required: 'Title is required' })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Project name"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    {...register('description')}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    rows={3}
                                    placeholder="Optional description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Company *</label>
                                <select
                                    {...register('category', { required: 'Company is required' })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="">Select company</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tags</label>
                                <input
                                    {...register('tags')}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="project, design, landscape"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <Loader className="animate-spin" size={20} />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload Image'
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/95 backdrop-blur-sm max-w-md w-full p-6 rounded-2xl shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingCategory ? 'Edit Company' : 'Add Company'}
                            </h2>
                            <button onClick={() => {
                                setShowCategoryModal(false);
                                setEditingCategory(null);
                                reset();
                            }}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleAddCategory)} className="space-y-4">
                            {editingCategory && editingCategory.logoUrl && (
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={editingCategory.logoUrl}
                                        alt="Current logo"
                                        className="w-24 h-24 object-contain border rounded-lg p-2"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Company Logo {editingCategory && '(Upload new to replace)'}
                                </label>
                                <input
                                    {...register('logo')}
                                    type="file"
                                    accept="image/*"
                                    className="w-full"
                                />
                                <p className="text-xs text-gray-500 mt-1">Upload logo for tabs and rain animation</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Company Name *</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="YMCA, Gujarat Tourism, etc."
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    {...register('description')}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    rows={3}
                                    placeholder="Optional description"
                                />
                            </div>
                            <button type="submit" className="w-full btn-primary">
                                {editingCategory ? 'Update Company' : 'Add Company'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
