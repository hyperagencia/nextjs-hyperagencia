'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const navItems = [
  { label: 'Inicio', href: '/', mobileLabel: 'Home' },
  { label: 'Proyectos', href: '/proyectos', mobileLabel: 'Work' },
  { 
    label: 'Servicios', 
    href: '/servicios',
    mobileLabel: 'Expertise',
    dropdown: [
      { name: 'Branding', icon: '🎨', href: '/servicios#branding' },
      { name: 'Identidad Visual', icon: '👁', href: '/servicios#identidad' },
      { name: 'Animación de Identidad', icon: '✨', href: '/servicios#animacion' },
      { name: 'Web Design', icon: '🌐', href: '/servicios#web' },
      { name: 'UI/UX', icon: '📱', href: '/servicios#uiux' },
      { name: 'Motion Graphics', icon: '🎬', href: '/servicios#motion' }
    ]
  },
  { label: 'Agencia', href: '/agencia', mobileLabel: 'About' },
  { label: 'Contacto', href: '/contacto', mobileLabel: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [activeStyle, setActiveStyle] = useState({ opacity: 0, width: 0, left: 0 })
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, width: 0, left: 0 })
  const [activeIndex, setActiveIndex] = useState(-1)

  // Detectar scroll con debounce suave
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 60)
      }, 10)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Encuentra el índice del item activo basado en la ruta actual
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => {
      if (item.href === '/') {
        return pathname === '/'
      }
      return pathname.startsWith(item.href)
    })
    setActiveIndex(currentIndex)
  }, [pathname])

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, index: number) => {
    // Solo mostrar hover si no es el item activo
    if (index !== activeIndex) {
      const element = event.currentTarget
      const rect = element.getBoundingClientRect()
      const navRect = navRef.current?.getBoundingClientRect()
      
      if (navRect) {
        setHoverStyle({
          opacity: 1,
          width: rect.width,
          left: rect.left - navRect.left
        })
      }
    }
  }

  const handleMouseLeave = () => {
    setHoverStyle({ opacity: 0, width: 0, left: 0 })
  }

  // Establecer la posición del item activo (solo desktop)
  useEffect(() => {
    if (activeIndex >= 0 && navRef.current && window.innerWidth >= 768) {
      setTimeout(() => {
        const activeElement = navRef.current?.children[activeIndex + 2] as HTMLElement
        if (activeElement) {
          const rect = activeElement.getBoundingClientRect()
          const navRect = navRef.current?.getBoundingClientRect()
          if (navRect) {
            setActiveStyle({
              opacity: 1,
              width: rect.width,
              left: rect.left - navRect.left
            })
          }
        }
      }, 100)
    } else {
      setActiveStyle({ opacity: 0, width: 0, left: 0 })
    }
  }, [activeIndex, pathname])

  return (
    <>
      {/* HEADER DESKTOP */}
      <header className={clsx(
        'hidden md:block fixed top-0 left-0 w-full z-50 transition-colors duration-700',
        isScrolled ? 'bg-transparent py-4' : 'bg-[#f3f2e9] py-4'
      )}>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-3 items-center">
            
            {/* LOGO - Columna izquierda */}
            <div className={clsx(
              'justify-self-start transition-all duration-500 ease-in-out transform',
              isScrolled 
                ? 'opacity-0 scale-90 translate-y-2 pointer-events-none' 
                : 'opacity-100 scale-100 translate-y-0'
            )}>
              <Link href="/">
                <img src="/hyper-logo-dark.svg" alt="Logo" className="h-6 md:h-8" />
              </Link>
            </div>

            {/* MENÚ DESKTOP */}
            <nav 
              ref={navRef}
              className={clsx(
                'relative rounded-full px-2 py-2 flex gap-2 transition-all duration-700 justify-self-center',
                isScrolled 
                  ? 'backdrop-blur-xl bg-white/70 shadow-lg' 
                  : 'backdrop-blur-md bg-white/80'
              )}
              onMouseLeave={handleMouseLeave}
            >
              {/* Active Background */}
              <div 
                className="absolute top-2 h-[calc(100%-16px)] bg-black rounded-full transition-all duration-300 ease-out"
                style={{
                  opacity: activeStyle.opacity,
                  width: `${activeStyle.width}px`,
                  left: `${activeStyle.left}px`,
                }}
              />
              
              {/* Hover Background */}
              <div 
                className="absolute top-2 h-[calc(100%-16px)] bg-black/10 rounded-full transition-all duration-200 ease-out"
                style={{
                  opacity: hoverStyle.opacity,
                  width: `${hoverStyle.width}px`,
                  left: `${hoverStyle.left}px`,
                }}
              />

              {navItems.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                
                if (item.dropdown) {
                  return (
                    <div key={item.href} ref={dropdownRef} className="relative">
                      <button
                        onMouseEnter={(e) => handleMouseEnter(e, index)}
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={clsx(
                          'relative z-10 px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1',
                          isActive
                            ? 'text-lime-400'
                            : 'text-black hover:text-gray-700'
                        )}
                      >
                        {item.label}
                        <ChevronDown 
                          className={clsx(
                            'h-4 w-4 transition-transform duration-200',
                            isServicesOpen ? 'rotate-180' : ''
                          )}
                        />
                      </button>

                      {/* Dropdown Desktop */}
                      <div className={clsx(
                        'absolute top-full left-0 mt-4 transition-all duration-300',
                        isServicesOpen 
                          ? 'opacity-100 translate-y-0 pointer-events-auto' 
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}>
                        <div className="bg-white rounded-2xl shadow-2xl p-6 min-w-[300px]">
                          <div className="grid grid-cols-2 gap-4">
                            {item.dropdown.map((service, idx) => (
                              <Link
                                key={idx}
                                href={service.href}
                                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                <span className="text-2xl">{service.icon}</span>
                                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                                  {service.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={(e) => handleMouseEnter(e, index)}
                    className={clsx(
                      'relative z-10 px-4 py-2 rounded-full font-medium transition-colors',
                      isActive
                        ? 'text-lime-400'
                        : 'text-black hover:text-gray-700'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* SELECTOR DE IDIOMA */}
            <div className={clsx(
              'text-sm font-medium flex gap-1 items-center border-2 rounded-full px-2 text-black transition-all duration-500 ease-in-out justify-self-end transform',
              isScrolled 
                ? 'opacity-0 scale-90 translate-y-2 pointer-events-none' 
                : 'opacity-100 scale-100 translate-y-0'
            )}>
              <span className="cursor-pointer hover:underline">es</span>
              <span>/</span>
              <span className="cursor-pointer hover:underline">en</span>
            </div>
          </div>
        </div>
      </header>

      {/* HEADER MÓVIL - Top para logo */}
      <header className="md:hidden fixed top-0 left-0 w-full z-40 bg-[#f3f2e9] py-4">
        <div className="px-4">
          <Link href="/" className="inline-block">
            <img src="/hyper-logo-dark.svg" alt="Logo" className="h-6" />
          </Link>
        </div>
      </header>

      {/* MENÚ MÓVIL - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200">
        <div className="flex justify-around items-center py-2">
          {navItems.filter(item => item.label !== 'Tendencias').map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            
            if (item.dropdown) {
              return (
                <div key={item.href} ref={dropdownRef} className="relative">
                  {/* Dropdown Móvil - Se abre hacia arriba */}
                  <div className={clsx(
                    'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300',
                    isServicesOpen 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  )}>
                    <div className="bg-white rounded-2xl shadow-2xl p-4 min-w-[280px]">
                      <div className="grid grid-cols-2 gap-3">
                        {item.dropdown.map((service, idx) => (
                          <Link
                            key={idx}
                            href={service.href}
                            className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            <span className="text-xl">{service.icon}</span>
                            <span className="text-sm text-gray-700">
                              {service.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={clsx(
                      'relative px-3 py-3 rounded-full text-xs font-medium transition-all flex flex-col items-center gap-1',
                      isActive
                        ? 'bg-black text-lime-400'
                        : 'text-gray-600 hover:text-black'
                    )}
                  >
                    <ChevronUp 
                      className={clsx(
                        'h-4 w-4 transition-transform duration-200',
                        isServicesOpen ? '' : 'rotate-180'
                      )}
                    />
                    {item.mobileLabel}
                  </button>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-3 py-3 rounded-full text-xs font-medium transition-all flex flex-col items-center gap-1',
                  isActive
                    ? 'bg-black text-lime-400'
                    : 'text-gray-600 hover:text-black'
                )}
              >
                {item.mobileLabel}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}