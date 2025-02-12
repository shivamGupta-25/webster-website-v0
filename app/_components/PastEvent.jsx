"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Autoplay } from "swiper/modules"
import Image from "next/image"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/effect-cards"

const slides = [
  {
    title: "Workshop Event",
    imageUrl: "/assets/WorkshopBanner.png",
  },
  {
    title: "Neon Lights",
    imageUrl: "/assets/WorkshopBanner.png",
  },
  {
    title: "Cyberpunk Streets",
    imageUrl: "/assets/WorkshopBanner.png",
  },
  {
    title: "Holographic Interface",
    imageUrl: "/assets/WorkshopBanner.png",
  },
  {
    title: "AI Robotics",
    imageUrl: "/assets/WorkshopBanner.png",
  },
]

const StackedCarousel = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[16/9] rounded-lg shadow-xl overflow-hidden"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={800}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="rounded-xl shadow-lg overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative w-full h-full">
              <Image src={slide.imageUrl || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold">{slide.title}</h2>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

const PastEvent = () => {
  return (
    <div className="container mx-auto overflow-hidden mt-12">
      <motion.section
        id="pastevent"
        className="text-white py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl sm:text-5xl lg:text-8xl font-bold mb-8 sm:mb-12 lg:mb-16 leading-tight text-black">
            Past Events
          </h1>
          <StackedCarousel />
        </div>
      </motion.section>
    </div>
  )
}

export default PastEvent