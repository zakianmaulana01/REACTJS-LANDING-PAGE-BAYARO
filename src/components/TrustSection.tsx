import React from 'react';
import { Shield, Check, Store } from 'lucide-react';

interface TrustSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function TrustSection({ onScrollToSection }: TrustSectionProps) {
  const trustPoints = [
    '100% Offline – Tetap jalan tanpa internet',
    'Data tersimpan lokal di perangkat Anda',
    'Auto-save setiap perubahan',
    'Backup & restore data mudah',
    'Privasi terjaga, data tidak keluar perangkat'
  ];

  return (
    <section id="trust-section" className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Card: Aman, Stabil & Terpercaya */}
        <div id="trust-card" className="bg-white rounded-[32px] border border-slate-200 p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left Side: Shield Emblem */}
          <div className="flex items-center gap-6 md:w-1/3 text-center md:text-left">
            <div className="relative shrink-0 mx-auto md:mx-0">
              {/* Outer Blue shield decoration */}
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-[28px] bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600 shadow-inner">
                <Shield className="h-10 w-10 md:h-12 md:w-12 stroke-[1.5]" />
              </div>
              {/* Floating padlock badge */}
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md">
                ✓
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-display font-black text-slate-950 leading-tight">
                Aman, Stabil & Terpercaya
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Jaminan keamanan data lokal maksimal untuk kelancaran bisnis Anda.</p>
            </div>
          </div>

          {/* Right Side: Checkmarks */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-semibold text-slate-700 leading-tight">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Banner: Dirancang untuk UMKM Indonesia */}
        <div id="umkm-banner" className="bg-white rounded-[32px] border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            {/* Shop/Stall Vector Illustration */}
            <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Store className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-lg font-display font-black text-slate-950">
                Dirancang untuk UMKM Indonesia
              </h4>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                Satu aplikasi untuk semua kebutuhan usaha Anda.
              </p>
            </div>
          </div>

          {/* CTA Button matching exactly the banner's bottom CTA text */}
          <button
            onClick={() => onScrollToSection('registration')}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-md shadow-indigo-500/10 active:scale-95 text-xs md:text-sm cursor-pointer"
          >
            Mudah. Cepat. Aman. Semua dalam Bayaro POS
          </button>
        </div>

      </div>
    </section>
  );
}
