import { FEATURES } from '@/src/constant/constant';
import { FeatureIcon } from '../FeatureIcon/FeatureIcon';

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
            className="cursor-pointer bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 sm:block">
              <FeatureIcon icon={f.icon} />
              <h3 className="text-sm font-bold text-gray-800 sm:mb-2 mb-0">
                {f.title}
              </h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-2 sm:mt-0">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
