// components/footer.tsx - Versión mejorada
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white">
      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            {/* Left side - Heading */}
            <div>
              <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] text-black">
                Hagamos{' '}
                <span className="inline-block">
                  <ArrowUpRight className="w-[0.7em] h-[0.7em] text-lime-400 inline -rotate-45" />
                </span>
                <br />
                algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-lime-400">extraordinario</span>
              </h2>
            </div>

            {/* Right side - Contact Info */}
            <div className="space-y-6">
              <p className="text-gray-600 text-lg mb-8">
                Trabajamos con marcas visionarias para crear experiencias digitales que inspiran y transforman.
              </p>
              
              <Link 
                href="/contacto" 
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:gap-4 text-lg font-medium"
              >
                Iniciar proyecto
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              <div className="pt-8 space-y-3">
                <a 
                  href="mailto:contacto@hyperagencia.com" 
                  className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors group"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-lime-500 transition-colors" />
                  <span>contacto@hyperagencia.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <address className="not-italic">
                    Av. Pdte. Kennedy 5600, Vitacura
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo and Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/" className="group">
                <img 
                  src="/hyper-logo-dark.svg" 
                  alt="Hyper" 
                  className="h-6 transition-transform group-hover:scale-105"
                />
              </Link>
              <span className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Hyper™. Todos los derechos reservados.
              </span>
            </div>

            {/* Social Links */}
            <nav className="flex items-center gap-8">
              <Link 
                href="https://linkedin.com/company/hyperagencia" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                LinkedIn
              </Link>
              <Link 
                href="https://instagram.com/hyperagencia" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                Instagram
              </Link>
              <Link 
                href="https://tiktok.com/@hyperagencia" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                TikTok
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}