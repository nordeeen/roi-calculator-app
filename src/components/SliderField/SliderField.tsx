'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { formatRupiah } from '@/src/utils/calculation';
import { SLIDER_MAX } from '@/src/constant/constant';

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
  const [inputVal, setInputVal] = useState(String(value));
  const isFocusedRef = useRef(false);

  const sliderMax = SLIDER_MAX[fieldKey] ?? 50_000_000;
  const sliderValue = Math.min(value, sliderMax);
  const pct = hasSlider ? ((sliderValue - min) / (sliderMax - min)) * 100 : 0;

  // Sync the input display from the store, but skip it if the user is focused (typing)
  useEffect(() => {
    if (!isFocusedRef.current) {
      setInputVal(String(value));
    }
  }, [value]);

  const handleSliderChange = useCallback(
    (raw: string) => {
      const parsed = Number(raw);
      setInputVal(String(parsed));
      onChange(parsed);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (raw: string) => {
      setInputVal(raw);
      const parsed = parseFloat(raw);
      if (raw === '' && isNaN(parsed)) {
        onChange(0);
      } else {
        onChange(Math.max(min, parsed));
      }
    },
    [min, onChange],
  );

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
    if (inputVal === '' || isNaN(parseFloat(inputVal))) {
      onChange(0);
      setInputVal('0');
    }
  }, [inputVal, onChange]);

  return (
    <div className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor={fieldKey}
          className="text-sm font-medium text-gray-800 group-focus-within:text-indigo-600 transition-colors">
          {label}
        </label>
        <span className="text-sm font-bold text-indigo-600 tabular-nums">
          {formatRupiah(parseFloat(inputVal) || 0)}
        </span>
      </div>

      {hasSlider && (
        <div className="relative mb-2.5">
          <input
            id={`${fieldKey}-slider`}
            type="range"
            min={min}
            max={sliderMax}
            step={step}
            value={sliderValue}
            aria-label={`${label} slider`}
            onChange={(e) => handleSliderChange(e.target.value)}
            style={{
              background: `linear-gradient(to right, #4f46e5 ${pct}%, #e0e0f5 ${pct}%)`,
            }}
          />
        </div>
      )}

      <input
        id={fieldKey}
        type="number"
        min={min}
        step={step}
        value={inputVal}
        onFocus={() => (isFocusedRef.current = true)}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleBlur}
        aria-label={`${label} input`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        onWheel={(e) => {
          // to prevent scrolling when the input field is in focus
          if (document.activeElement === e.currentTarget)
            e.currentTarget.blur();
        }}
        className="w-full bg-gray-50 border border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 
        focus:ring-indigo-100 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 outline-none transition-all duration-200"
      />
    </div>
  );
}
