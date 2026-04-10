'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/src/store/calculatorStores';
import ParameterPanel from '../ParameterPanel/ParameterPanel';
import ResultPanel from '../ResultPanel/ResultPanel';
import Toast from '../Toast/Toast';

export default function CalculatorSection() {
  const saveToHistory = useCalculatorStore((s) => s.saveToHistory);
  const [toast, setToast] = useState(false);

  const handleSave = () => {
    saveToHistory();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <section id="calculator" className="px-4 py-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ParameterPanel onSave={handleSave} />
        <ResultPanel />
      </div>
      <Toast visible={toast} message="Hasil berhasil disimpan ke riwayat!" />
    </section>
  );
}
