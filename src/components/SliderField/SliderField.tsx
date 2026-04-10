'use client';

import { useCallback } from 'react';
import { formatRupiah } from '@/src/utils/calculation';

interface SliderFieldProps {
  label: string;
  fieldKey: string;
  value: number;
  min: number;
  max: number;
  step: number;
  hasSlider?: boolean;
  onChange: (value: number) => void;
}

export default function SliderField({
  label,
  fieldKey,
  value,
  min,
  max,
  step,
  hasSlider = true,
  onChange,
}: SliderFieldProps) {
  const handleChange = useCallback(
    (raw: string) => {
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) onChange(Math.max(min, Math.min(max, parsed)));
    },
    [min, max, onChange],
  );

  // Compute slider fill % for styling
  const pct = hasSlider ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor={fieldKey}
          className="text-sm font-medium text-gray-800 group-focus-within:text-indigo-600 transition-colors">
          {label}
        </label>
        <span className="text-sm font-bold text-indigo-600 tabular-nums">
          {formatRupiah(value)}
        </span>
      </div>

      {hasSlider && (
        <div className="relative mb-2.5">
          <input
            id={`${fieldKey}-slider`}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            style={{
              background: `linear-gradient(to right, #4f46e5 ${pct}%, #e0e0f5 ${pct}%)`,
            }}
            aria-label={`${label} slider`}
          />
        </div>
      )}

      <input
        id={fieldKey}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 
        focus:ring-indigo-100 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 outline-none transition-all duration-200"
        aria-label={`${label} input`}
      />
    </div>
  );
}
