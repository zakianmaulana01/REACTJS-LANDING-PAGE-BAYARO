import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PosSimulator from './components/PosSimulator';
import TrustSection from './components/TrustSection';
import ClientSection from './components/ClientSection';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import RegistrationForm from './components/RegistrationForm';
import Logo from './components/Logo';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
  ArrowUp
} from 'lucide-react';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div id="app-landing-root" className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-indigo-600 selection:text-white antialiased">

      {/* Navigation Header */}
      <Header onScrollToSection={scrollToSection} />

      {/* Main Sections */}
      <main className="flex-1">

        {/* HERO SECTION */}
        <Hero onScrollToSection={scrollToSection} />

        {/* FEATURES SECTION */}
        <Features onScrollToSection={scrollToSection} />

        {/* INTERACTIVE POS SIMULATOR SECTION */}
        <PosSimulator />

        {/* TRUST ACCREDITATION SECTION */}
        <TrustSection onScrollToSection={scrollToSection} />

        {/* CLIENT SECTION */}
        <ClientSection />

        {/* PRICING PLANS SECTION */}
        <Pricing onScrollToSection={scrollToSection} />

        {/* REGISTRATION FORM SECTION */}
        <RegistrationForm />

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <FAQ />

      </main>

      {/* PREMIUM FOOTER */}
      <footer id="main-footer" className="bg-white text-slate-700 border-t border-slate-200 relative overflow-hidden pt-16 pb-8">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 border-b border-slate-200 pb-12 mb-10">

          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-4 space-y-4">
            <Logo size="sm" />
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              BAYARO POS adalah solusi sistem manajemen kasir modern dan laporan keuangan real-time yang didedikasikan untuk memberdayakan UMKM Indonesia menuju digitalisasi usaha yang mandiri, cerdas, dan efisien.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest font-display">
              Akses Cepat
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-500 font-medium">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-[#4f46e5] transition-colors cursor-pointer text-left">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-[#4f46e5] transition-colors cursor-pointer text-left">
                  Fitur Utama
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('demo')} className="hover:text-[#4f46e5] transition-colors cursor-pointer text-left">
                  Demo Simulator
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-[#4f46e5] transition-colors cursor-pointer text-left">
                  Penawaran Harga
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Information */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest font-display">
              Dukungan Onboarding
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-500 font-medium">
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-[#4f46e5] transition-colors cursor-pointer text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <a href="https://wa.me/6285174160310" target="_blank" rel="noopener noreferrer" className="hover:text-[#4f46e5] transition-colors">
                  Hubungi Admin WhatsApp
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('registration')} className="hover:text-[#4f46e5] transition-colors cursor-pointer text-left">
                  Booking Lisensi Promo
                </button>
              </li>
              <li className="text-slate-400 italic text-[11px] leading-tight">
                *Setup akun kasir baru diselesaikan maksimal 15 menit setelah verifikasi WA.
              </li>
            </ul>
          </div>

          {/* Col 4: Contact details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest font-display">
              Hubungi Kami
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-500">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#4f46e5] shrink-0" />
                <span>+62 851-7416-0310</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom metadata credits */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {currentYear} BAYARO POS. All rights reserved. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#4f46e5] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#4f46e5] transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>

      </footer>

      {/* Back to Top floating dynamic button */}
      <button
        onClick={() => scrollToSection('app-landing-root')}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        title="Scroll to Top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

    </div>
  );
}
