import { Trash } from 'lucide-react';
import { HistoryEntry } from '@/src/types/modelTypes';
import ButtonSecondary from '../Button/ButtonSecondary';
import { formatRoiLabel, formatRupiah } from '@/src/utils/calculation';

type Props = {
  entry: HistoryEntry;
  onDelete: () => void;
};

export default function HistoryRow({ entry, onDelete }: Props) {
  const { roi, roiStatus, results: res, revenue, profit } = entry.results;
  const { budget, cpr, aov } = entry.params;

  const statusColor = {
    excellent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    good: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    danger: 'text-red-600 bg-red-50 border-red-200',
  }[roiStatus];

  return (
    <section
      className="relative bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-indigo-100
     hover:shadow-sm transition-all duration-200">
      <div className="shrink-0 text-xs text-gray-400 font-medium w-auto sm:w-36">
        {entry.ts}
      </div>

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
            className={`font-semibold ${
              profit < 0 ? 'text-red-600' : 'text-emerald-600'
            }`}>
            {formatRupiah(profit)}
          </span>
        </span>
      </div>

      <div
        className={`text-sm font-bold tabular-nums px-3 py-1.5 rounded-lg border shrink-0 ${statusColor}`}>
        {formatRoiLabel(roi)}
      </div>

      <ButtonSecondary
        labelBtn=""
        variant="ghost"
        onClick={onDelete}
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-gray-100 sm:static sm:p-0">
        <Trash className="w-5 h-5 text-red-600" />
      </ButtonSecondary>
    </section>
  );
}
