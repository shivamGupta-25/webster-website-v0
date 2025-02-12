'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from "next/navigation"

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Workshop', href: '/#workshop' },
    { name: 'Past Event', href: '/#pastevent' },
    { name: 'Council', href: '/#council' },
    { name: 'Techelons - 25', href: '/techelons' },
];

const Header = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false)
    const router = useRouter()
    const handleExit = () => {
        setIsExiting(true);
        // window.open("/registration", "_blank");
        window.open("/registrationclosed", "_self");
        setIsExiting(false);
    }

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white container mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6 lg:py-8"
            >
                <nav className="flex items-center justify-between w-full">
                    <a href="/" className="flex-shrink-0 z-10">
                        <Image
                            alt="logo"
                            src="/assets/logo.png"
                            width={120}
                            height={80}
                            className="h-10 w-auto"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex md:items-center md:gap-6 lg:gap-8 mx-auto"
                    >
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-md font-semibold text-gray-900 hover:underline">
                                {link.name}
                            </a>
                        ))}
                    </motion.div>

                    {/* Register Button - Desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="hidden md:flex"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-900 text-white py-2 px-4 font-bold rounded-full shadow-md"
                            onClick={handleExit}
                        >
                            Register Now
                        </motion.button>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 text-gray-700 z-10"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="fixed inset-0 z-20">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-gray-900 bg-opacity-50"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="fixed inset-y-0 right-0 w-64 sm:w-72 bg-white px-6 py-6 shadow-lg z-30"
                            >
                                <div className="flex items-center justify-between">
                                    <a href="/" className="flex-shrink-0">
                                        <Image
                                            alt="logo"
                                            src="/assets/logo.png"
                                            width={100}
                                            height={60}
                                            className="h-8 w-auto"
                                        />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 text-gray-700"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {navLinks.map((link) => (
                                        <a key={link.name} href={link.href} className="block text-lg font-semibold text-gray-900 hover:underline">
                                            {link.name}
                                        </a>
                                    ))}
                                    <hr className="border-gray-300 my-4" />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-gray-900 text-white font-bold py-3 rounded-full shadow-md"
                                        onClick={handleExit}
                                    >
                                        Register Now
                                    </motion.button>
                                </div>
                            </motion.div>
                        </Dialog>
                    )}
                </AnimatePresence>
            </motion.header>
            {children}
        </>
    );
};

export default Header;
