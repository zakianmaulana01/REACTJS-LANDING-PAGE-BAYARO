import React from 'react';
import {
  ArrowRight,
  Play,
  Sparkles,
  Receipt,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Wifi,
  Shield,
  ShieldCheck,
  Database,
  Gauge,
  WifiOff,
  Lock,
  Save
} from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#f8fafc] grid-bg"
    >
      {/* Decorative ambient background blur blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Banner Top Header Badges Row */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <Wifi className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-wider uppercase text-slate-900 leading-none">100% OFFLINE</p>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-none">Tanpa internet</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <ShieldCheck className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-wider uppercase text-slate-900 leading-none">DATA AMAN</p>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-none">Tersimpan lokal</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <Lock className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-wider uppercase text-slate-900 leading-none">AMAN & STABIL</p>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-none">Untuk semua usaha</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Main Title Headings & Subtitles */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-slate-950 leading-none tracking-tight">
                SISTEM KASIR <br />
                <span className="text-indigo-600 relative">UNTUK USAHA ANDA<span className="absolute bottom-1.5 left-0 w-full h-2 bg-indigo-100 -z-10 rounded-full"></span></span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-semibold leading-normal">
                Kelola usaha lebih mudah, cepat, dan terkontrol dengan <span className="text-indigo-600 font-black">Bayaro POS</span>
              </p>
            </div>

            {/* The 4 pillars of the banner (Left sidebar equivalent) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-left">
              {/* Pillar 1 */}
              <div className="flex items-start gap-4 p-4 bg-white/60 border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <WifiOff className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase text-indigo-600">100% OFFLINE</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Tetap berjalan lancar tanpa internet</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-4 p-4 bg-white/60 border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase text-emerald-600">DATA AMAN & TERSIMPAN LOKAL</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Tidak terkirim ke cloud atau pihak manapun</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-4 p-4 bg-white/60 border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Save className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase text-purple-600">AUTO-SAVE & BACKUP</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Data tersimpan otomatis & bisa di-backup lokal</p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-start gap-4 p-4 bg-white/60 border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Gauge className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase text-amber-600">MUDAH & CEPAT</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Antarmuka sederhana, siap digunakan siapa saja</p>
                </div>
              </div>
            </div>

            {/* Call to Actions buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onScrollToSection('demo')}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/10 active:scale-98 flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
              >
                Coba Simulator Live
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onScrollToSection('registration')}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl active:scale-98 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-base"
              >
                <Play className="h-4 w-4 fill-slate-700 text-slate-700" />
                Langganan Rp 150k/bln
              </button>
            </div>
          </div>

        {/* Right Column: Interactive Quick-Look Mockup */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-100/80 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Visual Header representing Tablet/iPad style */}
            <div className="w-16 h-4 bg-slate-100 rounded-full mx-auto mb-4"></div>
            
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner bg-slate-50">
              {/* Mock App Screen Header */}
              <div className="bg-slate-900 text-white p-3 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span>BAYARO POS</span>
                </div>
                <span className="text-[10px] text-slate-300">Shift: Bambang</span>
              </div>

              {/* Mock App Screen Body */}
              <div className="p-3 space-y-3">
                {/* Visual statistics row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-medium leading-none">Penjualan Hari Ini</p>
                      <p className="text-xs font-bold text-slate-700">Rp 1.422.000</p>
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-indigo-500 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-medium leading-none">Transaksi Hari Ini</p>
                      <p className="text-xs font-bold text-slate-700">32 Trx</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Order List */}
                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Antrean Pesanan</p>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-700">1x Kopi Susu Gula Aren</span>
                    <span className="text-slate-500">Rp 24.000</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-700">1x Croissant Butter</span>
                    <span className="text-slate-500">Rp 25.000</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 pt-1">
                    <span>Total Pembayaran</span>
                    <span className="text-indigo-600">Rp 56.840</span>
                  </div>
                </div>

                {/* Interactive Simulation Notice Badge */}
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] p-2.5 rounded-xl text-center flex items-center justify-center gap-1.5">
                  <BarChart3 className="h-3 w-3 shrink-0 text-indigo-500 animate-bounce" />
                  <span>Simulasi Laporan Terupdate secara Real-Time!</span>
                </div>
              </div>
            </div>

            {/* Float Badge: Locked Price */}
            <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white rounded-2xl p-3 shadow-lg border-2 border-white max-w-[160px] animate-bounce">
              <div className="flex items-center gap-1 mb-0.5">
                <CheckCircle className="h-3.5 w-3.5 fill-white text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Harga Kunci</span>
              </div>
              <p className="text-xs text-emerald-100 font-medium leading-tight">Tak akan pernah naik!</p>
              <p className="text-base font-black">Rp 150k<span className="text-[10px] font-normal">/bln</span></p>
            </div>

            {/* Float Badge: Best Seller */}
            <div className="absolute -top-6 -right-6 bg-slate-900 text-white rounded-2xl p-3 shadow-lg border-2 border-slate-900 text-center">
              <p className="text-[9px] uppercase font-bold text-cyan-400">🔥 SLOT BULAN INI</p>
              <p className="text-lg font-black leading-none mt-1">Sisa 14</p>
              <p className="text-[8px] text-slate-400 mt-1">UMKM Cepat Mengamankan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
