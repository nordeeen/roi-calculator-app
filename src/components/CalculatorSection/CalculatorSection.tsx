'use client';
import { useCalculatorStore } from '@/src/store/calculatorStores';
import ParameterPanel from '../ParameterPanel/ParameterPanel';
import ResultPanel from '../ResultPanel/ResultPanel';

export default function CalculatorSection() {
  const saveToHistory = useCalculatorStore((s) => s.saveToHistory);

  return (
    <section id="calculator" className="px-4 py-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ParameterPanel onSave={saveToHistory} />
        <ResultPanel />
      </div>
    </section>
  );
}
