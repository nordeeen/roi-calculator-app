'use client';

import { useCalculatorStore } from '@/src/store/calculatorStores';
import SliderField from '../SliderField/SliderField';
import { CampaignParams } from '@/src/types/modelTypes';
import { Target } from 'lucide-react';
import ButtonSave from '../Button/Button';

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
    min: 0,
    max: 10_000_000,
    step: 1000,
    hasSlider: false,
  },
  {
    label: 'Pengeluaran Iklan Bulanan',
    key: 'budget',
    min: 0,
    max: 50_000_000,
    step: 100_000,
  },
  {
    label: 'Cost per Results (CPR)',
    key: 'cpr',
    min: 0,
    max: 5_000_000,
    step: 1_000,
  },
  {
    label: 'Nilai Pesanan Rata-rata',
    key: 'aov',
    min: 0,
    max: 10_000_000,
    step: 1_000,
    hasSlider: false,
  },
];

export default function ParameterPanel({ onSave }: ParameterPanelProps) {
  const params = useCalculatorStore((s) => s.params);
  const updateParam = useCalculatorStore((s) => s.updateParam);
  const allEmpty =
    params.budget === 0 &&
    params.cpr === 0 &&
    params.aov === 0 &&
    params.harga === 0;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
      <div className="flex items-center gap-2.5 mb-1">
        <Target className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-gray-800">
          Parameter Kampanye
        </h2>
      </div>
      <p className="text-xs text-[#adadb3] mb-6">
        Sesuaikan parameter kampanye Anda untuk melihat hasil prediksi
      </p>

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
      <ButtonSave allEmpty={allEmpty} onSave={onSave} labelBtn="Simpan" />
    </section>
  );
}
