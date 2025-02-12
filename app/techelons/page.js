"use client";
import { motion } from "framer-motion";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation"
import { useState } from "react";

const TechelonsHero = ({
    events = [
        { title: "Dark Coding", desc: "A competitive coding challenge testing problem-solving skills under time constraints.", img: "/assets/Poster.png", date: "March 15, 2025", venue: "Hall A", time: "10:00 AM - 12:00 PM" },
        { title: "Googler", desc: "An event assessing search efficiency and information retrieval capabilities.", img: "/assets/Poster.png", date: "March 15, 2025", venue: "Lab 1", time: "1:00 PM - 3:00 PM" },
        { title: "Web Hive", desc: "A web designing competition encouraging creativity and technical expertise.", img: "/assets/Poster.png", date: "March 16, 2025", venue: "Hall B", time: "11:00 AM - 1:00 PM" },
        { title: "Whatzapper", desc: "An event emphasizing rapid texting and effective communication.", img: "/assets/Poster.png", date: "March 16, 2025", venue: "Lab 2", time: "2:00 PM - 4:00 PM" },
        { title: "AI Artistry", desc: "A competition exploring AI-generated art and creativity.", img: "/assets/Poster.png", date: "March 17, 2025", venue: "Hall C", time: "12:00 PM - 2:00 PM" },
        { title: "E-Lafda", desc: "A LAN gaming competition for gaming enthusiasts.", img: "/assets/Poster.png", date: "March 17, 2025", venue: "Gaming Zone", time: "3:00 PM - 5:00 PM" }
    ]
}) => {
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
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-gray-900"
                    >
                        Techelons '25
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-4 text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto"
                    >
                        Techelons is the annual technical festival organized by Webster's, the Computer Science Society of Shivaji College, University of Delhi. It has grown into a national platform for students to showcase their technical skills and creativity.
                    </motion.p>

                    <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mt-12 flex justify-center">
                        <div className="bg-white p-2 shadow-md rounded-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
                            <img src="/assets/Poster2.jpg" alt="Techelons 25 Poster" className="w-full rounded-md" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl sm:text-6xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 mt-16"
                    >
                        Events
                    </motion.h1>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white p-4 shadow-lg hover:shadow-xl transition-all rounded-lg text-left"
                            >
                                <img src={event.img} alt={event.title} className="w-full rounded-md" />
                                <div className="p-3">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{event.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{event.desc}</p>
                                    <p className="text-gray-500 text-xs"><strong>Date:</strong> {event.date}</p>
                                    <p className="text-gray-500 text-xs"><strong>Venue:</strong> {event.venue}</p>
                                    <p className="text-gray-500 text-xs"><strong>Time:</strong> {event.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-16 text-center">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Join Us</h2>
                        <p className="text-lg sm:text-xl text-gray-900 max-w-lg mx-auto mt-4 mb-6">
                            Be part of an inspiring journey into the world of technology and innovation at Techelons'25.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-900 text-white py-3 px-8 sm:px-10 text-lg font-bold rounded-full shadow-md"
                            onClick={handleExit}
                        >
                                Register Now
                            {/* <a href="/registration" target="_blank"> */}
                            <a href="/registrationclosed">
                            </a>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default TechelonsHero;
