import React from 'react';
import {
  Table2,
  Package,
  ShoppingCart,
  Wallet,
  Clock,
  History,
  TrendingUp,
  Users,
  TrendingDown,
  Boxes,
  LineChart,
  Hand,
  ArrowRight,
  WifiOff
} from 'lucide-react';

interface FeaturesProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Features({ onScrollToSection }: FeaturesProps) {
  const featureList = [
    {
      icon: <Table2 className="h-5 w-5 text-indigo-600" />,
      title: 'Manajemen Meja',
      description: 'Kelola meja, status, dan pesanan dengan mudah'
    },
    {
      icon: <Package className="h-5 w-5 text-indigo-600" />,
      title: 'Katalog Produk & Stok',
      description: 'Atur menu, kategori, opsi, & stok real-time'
    },
    {
      icon: <ShoppingCart className="h-5 w-5 text-indigo-600" />,
      title: 'Keranjang & Modifier',
      description: 'Tambah item, opsi, catatan, dan edit pesanan cepat'
    },
    {
      icon: <Wallet className="h-5 w-5 text-indigo-600" />,
      title: 'Pembayaran Lengkap',
      description: 'Tunai, QRIS, PPN 11%, Service 5% (bisa diatur)'
    },
    {
      icon: <Clock className="h-5 w-5 text-indigo-600" />,
      title: 'Shift & Kasir',
      description: 'Buka/tutup shift, modal kas & monitoring real-time'
    },
    {
      icon: <History className="h-5 w-5 text-indigo-600" />,
      title: 'Riwayat Transaksi',
      description: 'Lihat & cari transaksi dengan mudah'
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      title: 'Laporan Keuangan',
      description: 'Ringkasan harian lengkap, export laporan'
    },
    {
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      title: 'Manajemen Karyawan',
      description: 'Atur karyawan, role, & akses dengan PIN'
    },
    {
      icon: <TrendingDown className="h-5 w-5 text-indigo-600" />,
      title: 'Pengeluaran',
      description: 'Catat pengeluaran & update cash flow otomatis'
    },
    {
      icon: <Boxes className="h-5 w-5 text-indigo-600" />,
      title: 'Manajemen Stok',
      description: 'Stok real-time, auto deduksi & adjustment manual'
    },
    {
      icon: <LineChart className="h-5 w-5 text-indigo-600" />,
      title: 'Performa Usaha',
      description: 'Pantau penjualan, produk terlaris & ringkasan usaha'
    },
    {
      icon: <Hand className="h-5 w-5 text-indigo-600" />,
      title: 'Mudah Digunakan',
      description: 'Tampilan sederhana, cepat dipelajari & dioperasikan'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Banner Pill Title style matching the exact image banner look */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-4 bg-indigo-600 text-white font-black text-xs sm:text-sm md:text-base px-6 py-3 rounded-2xl uppercase tracking-wider shadow-md">
            <span>⇌</span>
            <span>FITUR LENGKAP UNTUK USAHA ANDA</span>
            <span>⇋</span>
          </div>
          <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            BAYARO POS menyediakan fitur komprehensif penunjang usaha kuliner, ritel, dan UMKM demi efisiensi operasional dan perkembangan omset bisnis Anda.
          </p>
        </div>

        {/* Feature List layout: Clean 3-column grid, compact space, just like the banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm">
          {featureList.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-2 rounded-2xl hover:bg-slate-50/50 transition-colors duration-200 group"
            >
              <div className="h-11 w-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                {feat.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Prompt CTA below features */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                <WifiOff className="h-3.5 w-3.5" /> SISTEM MANDIRI OFFLINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black leading-tight">
                Butuh Solusi Kasir Handal Tanpa Bergantung Internet?
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Bayaro POS berjalan sepenuhnya secara offline tanpa butuh koneksi internet stabil. Data transaksi tersimpan aman secara lokal di perangkat Anda, bebas dari resiko server down atau kebocoran data. Nikmati kenyamanan penuh mengelola usaha dengan biaya berlangganan tetap Rp 150.000 / bulan tanpa potongan komisi sepeser pun!
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <button
                onClick={() => onScrollToSection('demo')}
                className="w-full lg:w-auto bg-white text-slate-900 hover:bg-indigo-50 hover:text-indigo-700 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-xs md:text-sm"
              >
                Buka Simulator Kasir
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
