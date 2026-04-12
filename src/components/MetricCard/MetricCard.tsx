export default function MetricCard({
  label,
  value,
  icon,
  isNegative,
  isProfit,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  isNegative?: boolean;
  isProfit?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-sm">{icon}</span>
        <span className="text-xs text-gray-400 font-medium">{label}</span>
      </div>

      <div
        className={`text-lg font-bold tabular-nums ${
          isProfit
            ? isNegative
              ? 'text-red-600'
              : 'text-[#3bc1cd]'
            : 'text-gray-800'
        }`}>
        {value}
      </div>
    </div>
  );
}
