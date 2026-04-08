import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, Award } from 'lucide-react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    useEffect(() => {
        gsap.fromTo(
            '.hero-text',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
        );

        gsap.fromTo(
            '.feature-card',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.features-section',
                    start: 'top 80%',
                },
            }
        );
    }, []);

    const features = [
        {
            icon: <Leaf size={40} />,
            title: 'Premium Quality',
            description: 'Handpicked plants and materials for lasting beauty',
        },
        {
            icon: <Users size={40} />,
            title: 'Expert Team',
            description: 'Experienced professionals dedicated to your vision',
        },
        {
            icon: <Award size={40} />,
            title: 'Award Winning',
            description: 'Recognized for excellence in landscaping design',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-900/20" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920)',
                        filter: 'brightness(0.7)',
                    }}
                />

                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <motion.h1
                        className="hero-text text-5xl md:text-7xl font-bold mb-6"
                        initial={{ opacity: 0 }}
                    >
                        Transforming Spaces with Nature
                    </motion.h1>
                    <motion.p
                        className="hero-text text-xl md:text-2xl mb-8 text-gray-200"
                        initial={{ opacity: 0 }}
                    >
                        Premium landscaping, plant installations, and outdoor design solutions
                    </motion.p>
                    <motion.div
                        className="hero-text flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0 }}
                    >
                        <Link to="/gallery" className="btn-primary inline-flex items-center">
                            View Gallery <ArrowRight className="ml-2" size={20} />
                        </Link>
                        <Link to="/contact" className="btn-secondary">
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                        Why Choose Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="feature-card glass p-8 rounded-2xl text-center hover:shadow-2xl transition-shadow"
                                whileHover={{ y: -10 }}
                            >
                                <div className="text-primary-500 flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
                    <p className="text-xl mb-8">
                        Let's create something beautiful together
                    </p>
                    <Link to="/contact" className="btn-secondary bg-white text-primary-500 hover:bg-gray-100">
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
