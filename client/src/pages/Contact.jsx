import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        toast.success('Message sent successfully!');
        reset();
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold text-center mb-12 text-gray-900"
                >
                    Get In Touch
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Let's Create Something Beautiful</h2>
                            <p className="text-gray-600 text-lg">
                                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-primary-100 p-3 rounded-full">
                                    <Mail className="text-primary-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email</h3>
                                    <p className="text-gray-600">info@sonalagritech.co.in</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-primary-100 p-3 rounded-full">
                                    <Phone className="text-primary-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Phone</h3>
                                    <p className="text-gray-600">+91 XXXXX XXXXX</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-primary-100 p-3 rounded-full">
                                    <MapPin className="text-primary-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Location</h3>
                                    <p className="text-gray-600">India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass p-8 rounded-2xl"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    {...register('message', { required: 'Message is required' })}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Tell us about your project..."
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary flex items-center justify-center"
                            >
                                Send Message <Send className="ml-2" size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
