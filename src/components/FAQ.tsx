import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  key?: React.Key;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(index === 0); // Default open first one

  return (
    <div
      id={`faq-item-${index}`}
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-indigo-600 transition-colors focus:outline-none cursor-pointer"
      >
        <span className="font-display text-sm md:text-base flex items-center gap-3">
          <HelpCircle className="h-5 w-5 shrink-0 text-indigo-600" />
          {question}
        </span>
        <span className="p-1 bg-slate-50 rounded-lg text-slate-400 shrink-0">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-50/50 animate-in fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: 'Berapa biaya berlangganan BAYARO POS?',
      answer:
        'Biaya berlangganan BAYARO POS adalah flat Rp 150.000 / bulan. Tidak ada biaya tambahan, tidak ada potongan komisi dari setiap transaksi penjualan Anda, dan tidak ada biaya instalasi di awal. Semua fitur siap Anda gunakan langsung.'
    },
    {
      question: 'Apakah ada batasan fitur untuk paket Rp 150.000 / bulan ini?',
      answer:
        'Sama sekali tidak ada batasan. Anda mendapatkan akses penuh ke seluruh fitur unggulan kami mulai dari manajemen meja, katalog produk, stok real-time, shift kasir, pencatatan pengeluaran, manajemen karyawan, hingga laporan performa keuangan harian yang komprehensif.'
    },
    {
      question: 'Apakah BAYARO POS mendukung cetak struk dan printer bluetooth?',
      answer:
        'Ya, Anda dapat langsung mengunduh struk digital berupa file gambar/PDF yang bisa dibagikan dengan mudah ke pelanggan via WhatsApp, serta mencetak langsung menggunakan printer thermal standar/Bluetooth yang terhubung ke peramban perangkat Anda.'
    },
    {
      question: 'Perangkat apa saja yang didukung oleh BAYARO POS?',
      answer:
        'BAYARO POS berbasis web cloud modern yang super ringan. Anda dapat mengaksesnya lewat peramban web (browser) di perangkat apa saja: iPad, Tablet Android, Handphone (Android & iOS), Laptop, iMac, maupun PC Windows tanpa perlu spesifikasi tinggi.'
    },
    {
      question: 'Apakah ada kontrak mengikat atau biaya tersembunyi?',
      answer:
        'Tidak ada sama sekali. Anda bebas berlangganan bulanan tanpa kontrak yang mengikat. Anda bisa berhenti berlangganan kapan pun tanpa biaya pembatalan. Kami berkomitmen memberikan layanan yang jujur, transparan, dan bersahabat bagi UMKM.'
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header FAQs */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            PERTANYAAN UMUM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">
            Ada Pertanyaan Mengenai BAYARO POS?
          </h2>
          <p className="text-slate-500 text-xs md:text-base">
            Kami menjawab segala keraguan Anda secara transparan dan jujur mengenai layanan sistem kasir kami.
          </p>
        </div>

        {/* FAQs List Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} index={idx} />
          ))}
        </div>

        {/* Interactive Question CTA */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-100 text-center shadow-sm">
          <p className="text-slate-600 text-sm">
            Punya pertanyaan lain yang belum terjawab di sini?
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20BAYARO%20POS,%20saya%20ingin%20bertanya%20lebih%20lanjut%20mengenai%20langganan%20sistem%20kasir..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Tanyakan Langsung ke WhatsApp Kami →
          </a>
        </div>

      </div>
    </section>
  );
}
