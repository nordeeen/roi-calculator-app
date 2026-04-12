import { useCalculatorStore } from '@/src/store/calculatorStores';
import SliderField from '../SliderField/SliderField';
import { FIELDS } from '@/src/constant/constant';
import ButtonSave from '../Button/Button';
import { Target } from 'lucide-react';

interface ParameterPanelProps {
  onSave: () => void;
}

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
