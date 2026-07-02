import React from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';

export default function ClientSection() {
  // Array 11 client logos
  const clients = [
    { id: 1, name: 'Client 1', logo: '/assets/client/client-1.jpeg' },
    { id: 2, name: 'Client 2', logo: '/assets/client/client-2.jpeg' },
    { id: 3, name: 'Client 3', logo: '/assets/client/client-3.jpeg' },
    { id: 4, name: 'Client 4', logo: '/assets/client/client-4.jpeg' },
    { id: 5, name: 'Client 5', logo: '/assets/client/client-5.jpeg' },
    { id: 6, name: 'Client 6', logo: '/assets/client/client-6.jpeg' },
    { id: 7, name: 'Client 7', logo: '/assets/client/client-7.jpeg' },
    { id: 8, name: 'Client 8', logo: '/assets/client/client-8.jpeg' },
    { id: 9, name: 'Client 9', logo: '/assets/client/client-9.jpeg' },
    { id: 10, name: 'Client 10', logo: '/assets/client/client-10.jpeg' },
    { id: 11, name: 'Client 11', logo: '/assets/client/client-11.jpeg' }
  ];

  return (
    <section id="clients" className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold px-4 py-2 rounded-full">
            <Briefcase className="h-4 w-4" />
            <span className="uppercase tracking-wider">Dipercaya UMKM Indonesia</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight tracking-tight">
            Mereka Sudah Percaya <br />
            <span className="text-indigo-600">BAYARO POS</span>
          </h2>
          
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Kami terus berkembang bersama UMKM Indonesia. Jadilah bagian dari ekosistem kami yang terus bertumbuh!
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-8 md:p-12">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Klien Kami Yang Telah Dipercaya
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-center hover:border-indigo-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 max-h-20"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Additional Client Count Badge */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-xs md:text-sm font-medium">
              Bergabunglah dengan <strong className="text-indigo-600 font-bold">klien kami yang terus bertambah</strong> untuk mengelola bisnis lebih efisien dengan BAYARO POS.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
