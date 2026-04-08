import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const phoneNumber = '919XXXXXXXXX'; // Replace with actual number
    const message = 'Hello! I am interested in your services.';

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors z-40"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle size={28} />
        </motion.button>
    );
};

export default WhatsAppButton;
