"use client";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="mt-24"
        >
            <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-10">
                <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                        className="flex-shrink-0 flex justify-center md:justify-start"
                    >
                        <a href="/" className="flex items-center gap-2">
                            <Image
                                alt="logo"
                                src="/assets/logo.png"
                                className="h-12 w-auto brightness-110 hover:brightness-125 transition"
                                width={140}
                                height={90}
                            />
                        </a>
                    </motion.div>

                    {/* Contact Email */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: false }}
                        className="text-lg text-white font-bold flex flex-col md:flex-row items-center gap-1"
                    >
                        <span>Contact:</span>
                        <a
                            href="mailto:websters@shivaji.du.ac.in"
                            aria-label="Email us"
                            className="hover:underline transition text-blue-400"
                        >
                            websters@shivaji.du.ac.in
                        </a>
                    </motion.div>

                    {/* Social Media Icons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: false }}
                        className="flex space-x-6 text-2xl justify-center md:justify-start"
                    >
                        <a
                            href="https://instagram.com/yourbrand"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition transform hover:scale-110 duration-300"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com/in/yourbrand"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition transform hover:scale-110 duration-300"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: false }}
                    className="text-center text-sm mt-8 border-t border-gray-700 pt-4 text-gray-500"
                >
                    <p className="text-lg">&copy; {new Date().getFullYear()} Webster's. All rights reserved.</p>
                    <p className="mt-4 text-gray-400 text-lg">
                        Designed & Developed by: {" "}
                        <a
                            href="https://www.linkedin.com/in/yourbrand"
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Shivam Raj Gupta
                        </a>
                    </p>
                </motion.div>
            </footer>
        </motion.div>
    );
};

export default Footer;
