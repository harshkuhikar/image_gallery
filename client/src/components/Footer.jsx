import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-primary-400 mb-4">Sonal AgriTech</h3>
                        <p className="text-gray-400">
                            Transforming spaces with nature. Premium landscaping and plant installation services.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail size={18} />
                                <span className="text-gray-400">info@sonalagritech.co.in</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={18} />
                                <span className="text-gray-400">+91 XXXXX XXXXX</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={18} />
                                <span className="text-gray-400">India</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Landscaping</li>
                            <li>Indoor Plants</li>
                            <li>Outdoor Gardens</li>
                            <li>Vertical Gardens</li>
                            <li>Terrace Gardens</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Sonal AgriTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
