'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from "next/navigation"

const Workshop = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isExiting, setIsExiting] = useState(false)
    const router = useRouter()
    const handleExit = () => {
        setIsExiting(true);
        // window.open("/registration", "_blank");
        window.open("/registrationclosed", "_self");
        setIsExiting(false);
    }

    useEffect(() => {
        if (inView) {
            setHasAnimated(true);
        } else {
            setHasAnimated(false);
        }
    }, [inView]);

    return (
        <div id='workshop' ref={ref} className="container px-6 sm:px-10 lg:px-16 mt-12 flex flex-col items-center">
            <motion.h1
                className="text-6xl sm:text-6xl lg:text-9xl font-extrabold text-gray-900 dark:text-white mb-8 sm:mb-10"
                initial={{ opacity: 0, y: -50 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                Workshop
            </motion.h1>

            <motion.div
                className="w-full max-w-3xl sm:max-w-4xl lg:max-w-6xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
            >
                <Image
                    src="/assets/WorkshopBanner.png"
                    alt="Workshop"
                    width={2048}
                    height={1152}
                    className="w-full object-cover"
                />
                <div className="p-6 sm:p-8 lg:p-10 text-center">
                    <motion.h2
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-5"
                        initial={{ opacity: 0, y: 40 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
                    >
                        Unlock Your Potential
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
                    >
                        Join us for an immersive workshop where you'll gain valuable insights and hands-on experience from industry experts.
                    </motion.p>
                    <motion.div
                        className="text-left text-gray-700 dark:text-gray-300 mb-6 space-y-2 sm:space-y-3 border-l-4 border-blue-500 pl-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
                    >
                        <p><strong className="text-gray-900 dark:text-white">📅 Date:</strong> March 15, 2025</p>
                        <p><strong className="text-gray-900 dark:text-white">📍 Location:</strong> Delhi, India</p>
                        <p><strong className="text-gray-900 dark:text-white">🏛️ Venue:</strong> Conference Hall, Delhi University</p>
                        <p><strong className="text-gray-900 dark:text-white">📖 Description:</strong> This workshop will cover essential topics in data science, machine learning, and modern web development with hands-on sessions led by industry professionals.</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                    >
                        <Button className="px-4 py-3 sm:p-6 rounded-[30px] font-bold shadow-lg hover:scale-105 transition-all text-base sm:text-lg font-lg tracking-wide"
                            onClick={handleExit}>
                            Register
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Workshop;
