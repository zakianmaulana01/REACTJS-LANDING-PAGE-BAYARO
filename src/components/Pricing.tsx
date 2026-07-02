import React from 'react';
import { Check, ShieldCheck, Heart } from 'lucide-react';

interface PricingProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Pricing({ onScrollToSection }: PricingProps) {
  const includedFeatures = [
    'Manajemen Meja (Kelola meja, status, dan pesanan)',
    'Katalog Produk & Stok (Atur menu, kategori, opsi)',
    'Keranjang & Modifier (Tambah item, opsi, catatan)',
    'Pembayaran Lengkap (Tunai, QRIS, PPN 11%, Service 5%)',
    'Shift & Kasir (Buka/tutup shift, modal kas & monitoring)',
    'Riwayat Transaksi (Lihat & cari transaksi mudah)',
    'Laporan Keuangan (Ringkasan harian lengkap, export)',
    'Manajemen Karyawan (Atur karyawan, role, PIN akses)',
    'Pengeluaran (Catat pengeluaran & cash flow otomatis)',
    'Manajemen Stok (Stok real-time, auto deduksi & adjustment)',
    'Performa Usaha (Pantau produk terlaris & omset)',
    'Mudah Digunakan (Tampilan sederhana & cepat)'
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-white -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            STRUKTUR HARGA TRANSPARAN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
            Satu Layanan, Semua Fitur Lengkap!
          </h2>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed">
            Tidak ada komisi potongan per transaksi, tidak ada biaya tersembunyi, dan tidak ada batasan fitur. Satu harga terjangkau untuk kelancaran bisnis Anda.
          </p>
        </div>

        {/* Pricing Layout Container - centering a large premium card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-12 shadow-2xl border-4 border-indigo-500/20 overflow-hidden">
            {/* Visual shine details */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Segment: Offer & Price */}
              <div className="md:col-span-5 space-y-5 text-center md:text-left">
                <span className="text-cyan-400 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center md:justify-start gap-1">
                  <ShieldCheck className="h-4 w-4" /> FULL ACCESS LICENSE
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display leading-none">
                  Langganan Bayaro POS
                </h3>
                
                <div className="pt-2">
                  <div className="flex items-baseline justify-center md:justify-start gap-1">
                    <span className="text-4xl md:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                      Rp 150.000
                    </span>
                    <span className="text-slate-300 text-sm">/ bulan</span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  Dapatkan akses tak terbatas ke seluruh modul sistem kasir offline mandiri di seluruh perangkat Anda tanpa pusing kuota transaksi.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onScrollToSection('registration')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-xs md:text-sm cursor-pointer"
                  >
                    Daftar Sekarang & Mulai
                  </button>
                </div>
              </div>

              {/* Right Segment: Features list checkmark */}
              <div className="md:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Fitur Lengkap Yang Anda Dapatkan:
                </h4>
                
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {includedFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-100">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locked Pricing Honest Statement */}
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-3.5">
          <Heart className="h-6 w-6 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-indigo-950 text-sm">
              Investasi Hemat untuk UMKM Indonesia
            </h5>
            <p className="text-slate-600 text-xs md:text-sm mt-1 leading-relaxed">
              Kami percaya efisiensi bisnis tidak harus mahal. Bayaro POS didesain dengan biaya flat Rp 150.000 / bulan agar setiap pengusaha mikro, kecil, dan menengah di Indonesia dapat mengontrol penuh laporan usahanya tanpa terbebani biaya langganan yang mencekik.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
