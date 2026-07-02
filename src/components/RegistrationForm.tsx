import React, { useState } from 'react';
import { Send, CheckCircle2, ShoppingBag, ShieldCheck, HelpCircle, ArrowRight, PhoneCall } from 'lucide-react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    businessCategory: 'F&B (Kafe, Resto, Warung)',
    whatsapp: '',
    city: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'F&B (Kafe, Resto, Warung)',
    'Ritel (Toko kelontong, Butik, Minimarket)',
    'Jasa (Salon, Laundry, Cuci Mobil)',
    'Gerobak / Street Food',
    'Usaha Kreatif / Kerajinan',
    'Lainnya'
  ];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.ownerName.trim()) tempErrors.ownerName = 'Nama pemilik wajib diisi';
    if (!formData.businessName.trim()) tempErrors.businessName = 'Nama bisnis/toko wajib diisi';
    if (!formData.whatsapp.trim()) {
      tempErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.whatsapp.replace(/[\s-]/g, ''))) {
      tempErrors.whatsapp = 'Nomor WhatsApp tidak valid (misal: 08123456789)';
    }
    if (!formData.city.trim()) tempErrors.city = 'Kota asal wajib diisi';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error if user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Helper to generate custom Whatsapp URL with filled-in fields
  const getWhatsappUrl = () => {
    const adminPhone = '6281234567890'; // Mock admin number
    const message = `Halo BAYARO POS! Saya ingin konfirmasi pendaftaran langganan Rp 150k/bulan.

Berikut rincian pendaftaran saya:
- Nama Pemilik: ${formData.ownerName}
- Nama Bisnis: ${formData.businessName}
- Kategori Usaha: ${formData.businessCategory}
- Nomor WhatsApp: ${formData.whatsapp}
- Kota/Alamat: ${formData.city}

Mohon bantuannya untuk setup akun kasir BAYARO POS saya. Terima kasih!`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="registration" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left segment: Promo booking copy */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
            <ShieldCheck className="h-4 w-4" /> Slot Terjamin & Aman
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight tracking-tight">
            Mulai Berlangganan Bayaro POS Rp 150k/Bulan!
          </h2>

          <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
            Hanya butuh 1 menit untuk melakukan registrasi. Setelah mendaftar, tim kami akan segera menghubungi Anda untuk penyiapan akun kasir secara gratis.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold font-display shrink-0">1</span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">Isi Formulir Pendaftaran</h4>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Tuliskan nama pemilik, nama toko, kategori, nomor WA, dan kota usaha Anda.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold font-display shrink-0">2</span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">Klaim Lewat WhatsApp Onboarding</h4>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Selesai mengisi, klik tombol WhatsApp untuk langsung terhubung dengan admin setup gratis kami.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold font-display shrink-0">3</span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">Biaya Flat Rp 150k / Bulan</h4>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Akun Anda siap dalam 15 menit. Selamat menggunakan kasir handal dengan laporan real-time lengkap!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right segment: Form panel */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 to-cyan-500"></div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center md:text-left space-y-1 pb-2">
                  <h3 className="text-xl md:text-2xl font-black font-display text-slate-900">
                    Formulir Berlangganan
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm">
                    Mohon lengkapi data usaha Anda dengan benar di bawah ini.
                  </p>
                </div>

                {/* Owner Name */}
                <div className="space-y-1.5">
                  <label htmlFor="ownerName" className="text-xs md:text-sm font-bold text-slate-700 block">
                    Nama Lengkap Pemilik <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Rifan Hardiyan"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                      errors.ownerName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.ownerName && (
                    <p className="text-rose-500 text-xs font-semibold">{errors.ownerName}</p>
                  )}
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label htmlFor="businessName" className="text-xs md:text-sm font-bold text-slate-700 block">
                    Nama Bisnis / Toko <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kopi Susu Mantap"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                      errors.businessName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-rose-500 text-xs font-semibold">{errors.businessName}</p>
                  )}
                </div>

                {/* Business Category Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="businessCategory" className="text-xs md:text-sm font-bold text-slate-700 block">
                    Kategori Bisnis <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1.5">
                  <label htmlFor="whatsapp" className="text-xs md:text-sm font-bold text-slate-700 block">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Contoh: 08123456789"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                      errors.whatsapp ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-rose-500 text-xs font-semibold">{errors.whatsapp}</p>
                  )}
                </div>

                {/* City of Business */}
                <div className="space-y-1.5">
                  <label htmlFor="city" className="text-xs md:text-sm font-bold text-slate-700 block">
                    Kota / Kabupaten Lokasi Usaha <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jakarta Selatan"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                      errors.city ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-rose-500 text-xs font-semibold">{errors.city}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 text-xs md:text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Mendaftarkan Slot...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Daftar Berlangganan Sekarang <Send className="h-4 w-4" />
                    </span>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center">
                  🔐 Data Anda dilindungi. Tidak ada komitmen kontrak atau pembatalan berbayar.
                </p>
              </form>
            ) : (
              /* Success visual state */
              <div className="text-center space-y-6 py-6 md:py-10 animate-in fade-in duration-300">
                <div className="inline-flex p-3 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100">
                  <CheckCircle2 className="h-14 w-14" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-display text-slate-900">
                    PENDAFTARAN BERHASIL!
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    Selamat, pendaftaran langganan <strong>Rp 150.000 / bulan</strong> berhasil diproses atas nama <strong>{formData.businessName}</strong>!
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                  <p className="text-slate-400 uppercase tracking-widest font-extrabold text-[9px]">RINCIAN PENDAFTARAN:</p>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500 font-medium">Pemilik:</span>
                    <span className="text-slate-800 font-bold">{formData.ownerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500 font-medium">Nama Toko:</span>
                    <span className="text-slate-800 font-bold">{formData.businessName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-500 font-medium">Nomor WhatsApp:</span>
                    <span className="text-slate-800 font-mono font-bold">{formData.whatsapp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Biaya Langganan:</span>
                    <span className="text-indigo-600 font-bold">Rp 150.000 / bln</span>
                  </div>
                </div>

                {/* Call WhatsApp to confirm */}
                <div className="space-y-3 max-w-sm mx-auto pt-2">
                  <a
                    href={getWhatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs md:text-sm"
                  >
                    <PhoneCall className="h-4.5 w-4.5 shrink-0" />
                    Hubungi WhatsApp Admin Setup
                  </a>
                  <p className="text-[10px] text-slate-400">
                    Satu langkah lagi! Klik tombol di atas untuk mengirim pesan verifikasi ke WhatsApp admin kami agar akun kasir Anda segera dibuat.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
