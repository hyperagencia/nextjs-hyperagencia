'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'

export default function Home() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Cuando el centro del video está en el centro de la pantalla
        const videoCenter = rect.top + rect.height / 2
        const screenCenter = windowHeight / 2
        const threshold = 100 // pixels de margen
        
        if (Math.abs(videoCenter - screenCenter) < threshold) {
          setIsVideoExpanded(true)
        } else {
          setIsVideoExpanded(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clients = [
    { name: 'RYCHIGER', logo: '🚀' },
    { name: 'National Breast Cancer Foundation', logo: '🎗️' },
    { name: 'Curtin University', logo: '🎓' },
    { name: 'Seven West Media', logo: '📺' },
    { name: 'Cocos Keeling Islands', logo: '🌴' }
  ]

  return (
    <div className="bg-[#f3f2e9] min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight text-black">
            <span className="block">Bold Brands,</span>
            <span className="block">inspiring growth</span>
          </h1>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="relative py-20">
        <div className={`transition-all duration-700 ease-in-out ${
          isVideoExpanded ? 'px-0' : 'px-6'
        }`}>
          <div className={`relative overflow-hidden transition-all duration-700 ${
            isVideoExpanded 
              ? 'rounded-none max-w-none' 
              : 'rounded-3xl max-w-7xl mx-auto'
          }`}>
            <div className="relative aspect-video bg-black">
              {/* Placeholder para el video - reemplaza con tu video */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/tu-showreel.mp4" type="video/mp4" />
                {/* Fallback image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-2xl font-bold">Showreel 2024</p>
                  </div>
                </div>
              </video>
              
              {/* Overlay con botón de play (opcional) */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-6">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-32 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] mb-20 max-w-5xl">
            We design, build and ship world-class digital products for forward-thinking brands.
          </h2>
          
          {/* Client Logos */}
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-70">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center gap-3 text-white">
                <span className="text-3xl">{client.logo}</span>
                <span className="text-lg font-medium">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-32 bg-[#1a3a2e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-white text-[clamp(3rem,5vw,6rem)] font-bold leading-[0.9] mb-8">
                PIQUE
              </h3>
              <p className="text-gray-300 text-xl mb-8">
                Una experiencia digital revolucionaria que transforma la manera en que las personas se conectan con su bienestar.
              </p>
              <Link 
                href="/proyectos" 
                className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors text-lg font-medium"
              >
                Ver proyecto completo
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-lime-400 to-green-600 rounded-3xl p-8 aspect-[4/5]">
                {/* Aquí puedes poner una imagen del proyecto */}
                <div className="bg-white/20 rounded-2xl h-full flex items-center justify-center">
                  <span className="text-6xl">📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-8">
            ¿Listo para hacer crecer tu marca?
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            Trabajemos juntos para crear experiencias digitales extraordinarias.
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-lime-400 text-black px-8 py-4 rounded-full hover:bg-lime-300 transition-colors text-lg font-bold"
          >
            Empezar proyecto
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}