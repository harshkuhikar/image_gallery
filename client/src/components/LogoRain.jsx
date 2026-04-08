import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LogoRain = ({ logos }) => {
    const [rainDrops, setRainDrops] = useState([]);

    useEffect(() => {
        if (!logos || logos.length === 0) return;

        // Create more visible floating logos with company logos
        const drops = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            logo: logos[Math.floor(Math.random() * logos.length)],
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 15 + Math.random() * 10,
            size: 40 + Math.random() * 60,
            opacity: 0.12 + Math.random() * 0.15, // More visible
            rotateSpeed: 20 + Math.random() * 20,
        }));

        setRainDrops(drops);
    }, [logos]);

    if (!logos || logos.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {rainDrops.map((drop) => (
                <motion.div
                    key={drop.id}
                    initial={{ y: -150, opacity: 0, rotate: 0, x: 0 }}
                    animate={{
                        y: ['0vh', '110vh'],
                        opacity: [0, drop.opacity, drop.opacity, 0],
                        rotate: [0, 360],
                        x: [0, Math.sin(drop.id) * 50, 0],
                    }}
                    transition={{
                        duration: drop.duration,
                        delay: drop.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{
                        position: 'absolute',
                        left: `${drop.left}%`,
                        width: `${drop.size}px`,
                        height: `${drop.size}px`,
                    }}
                >
                    <div className="w-full h-full rounded-2xl bg-white/80 backdrop-blur-md shadow-lg p-3 flex items-center justify-center border border-gray-200/50">
                        <img
                            src={drop.logo}
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default LogoRain;
