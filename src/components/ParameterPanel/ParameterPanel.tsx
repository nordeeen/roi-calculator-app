'use client';

import { useCalculatorStore } from '@/src/store/calculatorStores';
import SliderField from '../SliderField/SliderField';
import { CampaignParams } from '@/src/types/modelTypes';
import { Target } from 'lucide-react';

interface ParameterPanelProps {
  onSave: () => void;
}

const FIELDS: {
  label: string;
  key: keyof CampaignParams;
  min: number;
  max: number;
  step: number;
  hasSlider?: boolean;
}[] = [
  {
    label: 'Harga Produk',
    key: 'harga',
    min: 1000,
    max: 10_000_000,
    step: 1000,
    hasSlider: false,
  },
  {
    label: 'Pengeluaran Iklan Bulanan',
    key: 'budget',
    min: 100_000,
    max: 50_000_000,
    step: 100_000,
  },
  {
    label: 'Cost per Results (CPR)',
    key: 'cpr',
    min: 1_000,
    max: 5_000_000,
    step: 1_000,
  },
  {
    label: 'Nilai Pesanan Rata-rata',
    key: 'aov',
    min: 1_000,
    max: 10_000_000,
    step: 1_000,
    hasSlider: false,
  },
];

export default function ParameterPanel({ onSave }: ParameterPanelProps) {
  const params = useCalculatorStore((s) => s.params);
  const updateParam = useCalculatorStore((s) => s.updateParam);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
      <div className="flex items-center gap-2.5 mb-1">
        <Target className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-gray-800">
          Parameter Kampanye
        </h2>
      </div>
      <p className="text-xs text-[#adadb3] mb-6">
        Sesuaikan parameter kampanye Anda untuk melihat hasil prediksi
      </p>

      {/* Fields */}
      <div className="flex-1">
        {FIELDS.map((f) => (
          <SliderField
            key={f.key}
            label={f.label}
            fieldKey={f.key}
            value={params[f.key]}
            min={f.min}
            max={f.max}
            step={f.step}
            hasSlider={f.hasSlider ?? true}
            onChange={(val) => updateParam(f.key, val)}
          />
        ))}
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={onSave}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center gap-2">
        Simpan
      </button>
    </div>
  );
}
