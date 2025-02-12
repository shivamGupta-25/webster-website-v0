"use client";

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation"

const Banner = () => {
    const [isExiting, setIsExiting] = useState(false)
    const router = useRouter()
    const handleExit = () => {
        setIsExiting(true);
        window.open("/techelons", "_self");
        setIsExiting(false);
    }
    return (
        <div className="container px-4 mx-auto">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false }}
            >
                <motion.div
                    className="flex flex-col items-center justify-center text-center w-full md:pl-10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: false }}
                >
                    <h1 className='text-6xl md:text-8xl lg:text-9xl font-bold'>Webster's</h1>
                    <h2 className='text-sm md:text-2xl font-normal'>The Computer Science Society of Shivaji College</h2>
                    <h3 className='text-xl md:text-2xl font-normal'>University of Delhi</h3>
                    <p className='py-6 text-base md:text-lg'>
                        Webster's established in 1984, the Department of Computer Science is dedicated to fostering academic excellence and intellectual growth. It strives to enhance the cognitive aspect of education, ensuring a strong foundation for its students.
                    </p>
                    <motion.div
                        className="flex flex-col md:flex-row gap-4 md:gap-8 py-4 justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: false }}
                    >
                        <Button className="p-6 md:p-6 rounded-[30px] shadow-lg hover:scale-105 transition-all text-lg md:text-lg font-bold tracking-wide"
                            onClick={handleExit}>
                            Techelons - 25
                        </Button>
                        {/* <Button variant="outline" className="p-6 md:p-6 rounded-[30px] shadow-lg hover:scale-105 transition-all text-lg md:text-lg font-bold tracking-wide">
                            Techelons - 25
                        </Button> */}
                    </motion.div>
                </motion.div>
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: false }}
                >
                    <Image
                        alt="Websterlogo"
                        src="/assets/webstersLogo.png"
                        width={350}
                        height={350}
                        className='drop-shadow-[0px_8px_10px_rgba(0,0,0,0.9)]'
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Banner;
