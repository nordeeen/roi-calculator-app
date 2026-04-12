'use client';

import { useCalculatorStore } from '@/src/store/calculatorStores';
import {
  formatRupiah,
  formatRoiLabel,
  calculate,
} from '@/src/utils/calculation';
import {
  Calculator,
  ChartColumn,
  DollarSign,
  Target,
  TrendingUp,
} from 'lucide-react';
import MetricCard from '../MetricCard/MetricCard';

const ROI_CONFIG = {
  excellent: {
    gradient: 'from-emerald-500 to-teal-600',
    status: 'Kampanye Sangat Menguntungkan',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  good: {
    gradient: 'from-indigo-500 to-purple-600',
    status: 'Kampanye Menguntungkan',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  warning: {
    gradient: 'from-amber-500 to-orange-600',
    status: 'Perlu Optimasi',
    badge: 'bg-amber-100 text-amber-700',
  },
  danger: {
    gradient: 'from-red-500 to-rose-600',
    status: 'Perlu Optimasi',
    badge: 'bg-red-100 text-red-700',
  },
};

// Insight colors
const bgColors = ['#f7f6ff', '#f1fbfc', '#f7f6ff'];
const bulletColors = ['#818cf8', '#05b0c0', '#818cf8'];

export default function ResultPanel() {
  const results = useCalculatorStore((s) => s.results);
  const insights = useCalculatorStore((s) => s.insights);
  const params = useCalculatorStore((s) => s.params);
  const cfg = ROI_CONFIG[results.roiStatus];
  const allEmpty =
    params.budget === 0 &&
    params.cpr === 0 &&
    params.aov === 0 &&
    params.harga === 0;

  return (
    <section className="gap-4">
      <div className="bg-[#e9f0f9] rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <ChartColumn className="h-5 w-5 text-[#5dc7d6]" />
            <h2 className="text-base font-bold text-gray-800">
              Hasil Prediksi
            </h2>
          </div>
          <p className="text-xs text-[#adadb3]">
            Berdasarkan parameter kampanye Anda
          </p>
        </div>

        <div className="bg-custom-gradient rounded-2xl p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium opacity-80 mb-1.5">
                Laba atas Investasi (ROI)
              </p>
              <h3 className="text-4xl md:text-5xl font-semibold tabular-nums leading-tight tracking-tight mb-2">
                {formatRoiLabel(results.roi)}
              </h3>
              <p className="text-sm opacity-90 font-medium">
                {results.roi === 0 ? '' : cfg.status}
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Pendapatan"
            value={formatRupiah(results.revenue)}
            icon={<DollarSign className="w-5 h-5 text-[#5dc7d6]" />}
          />
          <MetricCard
            label="Keuntungan"
            value={formatRupiah(results.profit)}
            icon={<TrendingUp className="h-5 w-5 text-indigo-600" />}
            isNegative={results.profit < 0}
            isProfit
          />
          <MetricCard
            label="Jumlah Results"
            value={results.results.toLocaleString('id-ID')}
            icon={<Target className="w-5 h-5 text-indigo-600" />}
          />
          <MetricCard
            label="CPR Target"
            value={formatRupiah(results.cprTarget)}
            icon={<Calculator className="w-5 h-5 text-[#5dc7d6]" />}
          />
        </div>

        <div className="bg-white rounded-xl p-4 flex justify-between items-center border border-gray-100">
          <div>
            <div className="text-xs text-gray-400 mb-1">
              Pendapatan per Result
            </div>
            <div className="text-2xl font-bold text-gray-800 tabular-nums">
              {formatRupiah(results.revenuePerResult)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Margin per Result</div>
            <div
              className={`text-base font-bold tabular-nums ${
                results.marginPerResult < 0 ? 'text-red-600' : 'text-[#3bc1cd]'
              }`}>
              {formatRupiah(results.marginPerResult)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-4 mt-7">
        <div className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          Wawasan Utama
        </div>

        {!allEmpty && (
          <ul className="space-y-2.5">
            {insights.map((insight, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 p-2 rounded-lg transition"
                style={{
                  backgroundColor: bgColors[i % bgColors.length],
                }}>
                <div
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: bulletColors[i % bulletColors.length],
                  }}
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  {insight}
                </span>
              </li>
            ))}
          </ul>
        )}

        {allEmpty && (
          <p className="text-xs text-gray-400">
            Masukkan parameter kampanye untuk melihat wawasan
          </p>
        )}
      </div>
    </section>
  );
}
