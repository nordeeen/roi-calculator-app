'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/src/store/calculatorStores';
import { formatRupiah, formatRoiLabel } from '@/src/utils/calculation';
import { HistoryEntry } from '@/src/types/modelTypes';

function HistoryRow({
  entry,
  onDelete,
}: {
  entry: HistoryEntry;
  onDelete: () => void;
}) {
  const { roi, roiStatus, results: res, revenue, profit } = entry.results;
  const { budget, cpr, aov } = entry.params;

  const statusColor = {
    excellent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    good: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    danger: 'text-red-600 bg-red-50 border-red-200',
  }[roiStatus];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-indigo-100 hover:shadow-sm transition-all duration-200">
      {/* Timestamp */}
      <div className="shrink-0 text-xs text-gray-400 font-medium w-36">
        {entry.ts}
      </div>

      {/* Params summary */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>
          Budget:{' '}
          <span className="font-semibold text-gray-700">
            {formatRupiah(budget)}
          </span>
        </span>
        <span>
          CPR:{' '}
          <span className="font-semibold text-gray-700">
            {formatRupiah(cpr)}
          </span>
        </span>
        <span>
          AOV:{' '}
          <span className="font-semibold text-gray-700">
            {formatRupiah(aov)}
          </span>
        </span>
        <span>
          Results:{' '}
          <span className="font-semibold text-gray-700">
            {res.toLocaleString('id-ID')}
          </span>
        </span>
        <span>
          Revenue:{' '}
          <span className="font-semibold text-gray-700">
            {formatRupiah(revenue)}
          </span>
        </span>
        <span>
          Profit:{' '}
          <span
            className={`font-semibold ${profit < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            {formatRupiah(profit)}
          </span>
        </span>
      </div>

      {/* ROI Badge */}
      <div
        className={`text-sm font-bold tabular-nums px-3 py-1.5 rounded-lg border shrink-0 ${statusColor}`}>
        {formatRoiLabel(roi)}
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        aria-label="Hapus riwayat"
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors duration-150">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1.75 3.5h10.5M5.25 3.5V2.625a.875.875 0 0 1 .875-.875h1.75a.875.875 0 0 1 .875.875V3.5M11.375 3.5l-.656 7.656a.875.875 0 0 1-.872.844H4.153a.875.875 0 0 1-.872-.844L2.625 3.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function HistorySection() {
  const history = useCalculatorStore((s) => s.history);
  const deleteHistory = useCalculatorStore((s) => s.deleteHistory);
  const clearHistory = useCalculatorStore((s) => s.clearHistory);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section id="history" className="px-4 py-4 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📋</span> Riwayat Perhitungan
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Data tersimpan secara otomatis di browser Anda
            {history.length > 0 && ` — ${history.length} entri`}
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            {showConfirm ? (
              <>
                <span className="text-xs text-gray-500">
                  Yakin hapus semua?
                </span>
                <button
                  onClick={() => {
                    clearHistory();
                    setShowConfirm(false);
                  }}
                  className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                  Hapus
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="text-xs font-medium text-gray-400 hover:text-red-500 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-150">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1.75 3.5h10.5M5.25 3.5V2.625a.875.875 0 0 1 .875-.875h1.75a.875.875 0 0 1 .875.875V3.5M11.375 3.5l-.656 7.656a.875.875 0 0 1-.872.844H4.153a.875.875 0 0 1-.872-.844L2.625 3.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Hapus Semua
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {history.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
          <div className="text-4xl mb-3">📂</div>
          <div className="text-sm font-medium text-gray-400">
            Belum ada riwayat tersimpan
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Klik &quot;Simpan Hasil&quot; pada kalkulator untuk menyimpan
            perhitungan
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {history.map((entry: any) => (
            <HistoryRow
              key={entry.id}
              entry={entry}
              onDelete={() => deleteHistory(entry.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
