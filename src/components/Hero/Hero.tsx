'use client';

import { TrendingUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('opacity-0');
    el.style.animation = 'fadeUp 0.7s ease forwards';
  }, []);

  return (
    <section className="relative overflow-hidden pt-16 pb-16 px-4 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-125 bg-indigo-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div ref={ref} className="relative opacity-0 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-600 text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Prediksi Kesuksesan Produk Digital Anda
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5 text-[#22232d] text-center max-w-3xl mx-auto">
          Hitung ROI Kampanye Iklan Anda Secara Real&#8209;Time
        </h1>

        <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto text-center">
          Buat keputusan berdasarkan data dengan kalkulator prediksi canggih
          kami. Prediksi pendapatan, optimalkan pengeluaran iklan, dan
          maksimalkan profitabilitas produk digital Anda.
        </p>
      </div>
    </section>
  );
}
