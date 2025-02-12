'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const councilMembers = [
    {
        name: "Shivani Singh",
        role: "President",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Manish Pathak",
        role: "Vice-President",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Jai Solanki",
        role: "Vice-President",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Shivam Raj Gupta",
        role: "Technical Head",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Keshav",
        role: "Creative Head",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Yugal",
        role: "Secretary",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Prateek",
        role: "PR & Social Media Head",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    },
    {
        name: "Gaurav",
        role: "PR & Social Media Head",
        image: "/assets/My pic.jpg",
        linkedin: "https://www.linkedin.com/in/"
    }
];

const Council = () => {
    return (
        <motion.div
            id="council"
            className="container mx-auto px-4 mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
        >
            <motion.div
                className="w-full flex justify-center py-4"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <h1 className="text-7xl sm:text-4xl md:text-5xl lg:text-8xl font-bold text-black text-center">Council</h1>
            </motion.div>
            <motion.div
                className="w-full flex flex-col items-center py-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Swiper
                    modules={[Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    coverflowEffect={{
                        rotate: 20,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    breakpoints={{
                        480: { slidesPerView: 1, centeredSlides: true },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 }
                    }}
                    className="w-full max-w-6xl flex justify-center"
                >
                    {councilMembers.map((member, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <motion.div
                                className="flex justify-center w-full"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: false, amount: 0.2 }}
                            >
                                <Card className="w-full max-w-[300px] sm:max-w-[250px] overflow-hidden shadow-lg flex flex-col items-center">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-72 sm:h-72"
                                    />
                                    <CardContent className="p-4 text-center w-full">
                                        <h1 className="text-lg sm:text-xl font-bold mb-1">{member.name}</h1>
                                        <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-blue-500 hover:text-blue-700"
                                        >
                                            <Linkedin size={24} />
                                        </a>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </motion.div>
    );
};

export default Council;
