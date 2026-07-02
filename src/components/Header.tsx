import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header id="bayaro-header-root" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Promo Bar */}
      <div id="promo-announcement-bar" className="bg-[#0f172a] text-white py-2 px-4 text-xs md:text-sm text-center relative flex items-center justify-center gap-2 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-cyan-400/20 to-indigo-600/20 animate-pulse"></div>
        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full text-[10px] md:text-xs border border-amber-400/30 animate-bounce">
          <Sparkles className="h-3 w-3" /> PROMO PERKENALAN
        </span>
        <span className="font-medium relative z-10">
          Kunci Harga Spesial <strong className="text-emerald-400">Rp 150.000/bulan</strong> Selamanya Sebelum Fitur Lengkap Dirilis!
        </span>
        <span className="hidden lg:inline-flex items-center gap-1 text-slate-300 text-xs border-l border-slate-700 pl-2 ml-1">
          <ShieldCheck className="h-3 w-3 text-emerald-400" /> Slot Promo Terbatas
        </span>
      </div>

      {/* Main Navbar */}
      <nav
        id="main-navigation-navbar"
        className={`transition-all duration-300 px-4 md:px-8 py-3 md:py-4 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}>
            <Logo size="sm" />
          </a>

          {/* Desktop Navigation Links */}
          <div id="desktop-menu-links" className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleLinkClick('features')}
              className="font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer text-sm"
            >
              Fitur Utama
            </button>
            <button
              onClick={() => handleLinkClick('demo')}
              className="font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer text-sm flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              Demo Kasir
            </button>
            <button
              onClick={() => handleLinkClick('pricing')}
              className="font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer text-sm"
            >
              Harga Promo
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className="font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer text-sm"
            >
              FAQ
            </button>
          </div>

          {/* Desktop Call to Action */}
          <div id="desktop-cta-actions" className="hidden md:flex items-center gap-4">
            <div className="text-right hidden lg:block">
              <p className="text-[10px] text-slate-400 font-medium leading-none uppercase">Langganan Sekarang</p>
              <p className="text-sm font-bold text-indigo-600">Hanya Rp150rb/bln</p>
            </div>
            <button
              onClick={() => handleLinkClick('registration')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              Daftar Promo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-dropdown-panel" className="md:hidden bg-white border-t border-slate-100 mt-3 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col p-4 gap-4">
              <button
                onClick={() => handleLinkClick('features')}
                className="w-full text-left font-medium text-slate-700 hover:text-indigo-600 py-2 transition-colors border-b border-slate-50"
              >
                Fitur Utama
              </button>
              <button
                onClick={() => handleLinkClick('demo')}
                className="w-full text-left font-medium text-slate-700 hover:text-indigo-600 py-2 transition-colors border-b border-slate-50 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Demo Kasir Interaktif
              </button>
              <button
                onClick={() => handleLinkClick('pricing')}
                className="w-full text-left font-medium text-slate-700 hover:text-indigo-600 py-2 transition-colors border-b border-slate-50"
              >
                Harga Promo (150k)
              </button>
              <button
                onClick={() => handleLinkClick('faq')}
                className="w-full text-left font-medium text-slate-700 hover:text-indigo-600 py-2 transition-colors border-b border-slate-50"
              >
                FAQ
              </button>
              
              <div className="pt-2">
                <button
                  onClick={() => handleLinkClick('registration')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-1.5"
                >
                  Ambil Promo Sekarang (150k/bln)
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                  🔥 Tersisa 14 lisensi promo untuk hari ini!
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
