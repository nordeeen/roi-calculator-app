'use client';
import Image from 'next/image';

const FEATURES = [
  {
    icon: '/icons/icon-calculate.svg',
    color: 'bg-indigo-100',
    title: 'Perhitungan Real-Time',
    desc: 'Lihat secara langsung bagaimana perubahan parameter kampanye Anda mempengaruhi pendapatan, keuntungan, dan ROI dengan kalkulator dinamis kami.',
  },
  {
    icon: '/icons/icon-basis-data.svg',
    color: 'bg-purple-100',
    title: 'Wawasan Berbasis Data',
    desc: 'Dapatkan rekomendasi yang dapat ditindaklanjuti berdasarkan metrik kampanye Anda untuk mengoptimalkan kinerja dan memaksimalkan profitabilitas.',
  },
  {
    icon: '/icons/icon-optimaze.svg',
    color: 'bg-blue-100',
    title: 'Optimalkan Pengeluaran Iklan',
    desc: 'Temukan keseimbangan sempurna antara pengeluaran iklan dan hasil. Identifikasi CPR optimal untuk bisnis Anda.',
  },
];

function FeatureIcon({ icon, color }: { icon: string; color: string }) {
  const isSvgPath = icon.startsWith('/');
  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-200`}>
      {isSvgPath ? (
        <Image src={icon} alt="feature icon" width={32} height={32} />
      ) : (
        <span>{icon}</span>
      )}
    </div>
  );
}

export default function WhySection() {
  return (
    <section id="why" className="px-4 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-5 text-[#22232d]">
          Mengapa Menggunakan AdForecast Pro?
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto">
          Buat keputusan yang tepat dengan prediksi real-time dan wawasan yang
          dapat ditindaklanjuti untuk kampanye produk digital Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ animationDelay: `${i * 80}ms` }}>
            <FeatureIcon icon={f.icon} color={f.color} />
            <h3 className="text-sm font-bold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
