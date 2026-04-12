'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/src/store/calculatorStores';
import { History, Trash2 } from 'lucide-react';
import HistoryRow from '../HistoryRow';
import ButtonSecondary from '../Button/ButtonSecondary';

export default function HistorySection() {
  const history = useCalculatorStore((s) => s.history);
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteHistory = useCalculatorStore((s) => s.deleteHistory);
  const clearHistory = useCalculatorStore((s) => s.clearHistory);

  if (history.length === 0) return null;
  return (
    <section id="history" className="px-4 py-4 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-600" />
            Riwayat Perhitungan
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Data tersimpan secara otomatis di browser Anda
            {history.length > 0 && ` — ${history.length} data tersimpan`}
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {showConfirm ? (
              <>
                <span className="text-xs text-gray-500">
                  Yakin hapus semua?
                </span>

                <ButtonSecondary
                  onClick={() => {
                    clearHistory();
                    setShowConfirm(false);
                  }}
                  variant="danger"
                  labelBtn="Hapus"
                />

                <ButtonSecondary
                  onClick={() => setShowConfirm(false)}
                  variant="ghost"
                  labelBtn="Batal"
                />
              </>
            ) : (
              <ButtonSecondary
                onClick={() => setShowConfirm(true)}
                variant="danger"
                labelBtn="Hapus Semua">
                <Trash2 className="w-5 h-5 text-red-600" />
              </ButtonSecondary>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {history.map((entry: any) => (
          <HistoryRow
            key={entry.id}
            entry={entry}
            onDelete={() => deleteHistory(entry.id)}
          />
        ))}
      </div>
    </section>
  );
}
