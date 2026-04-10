import { CampaignParams, CalculationResults } from '../types/modelTypes';

/**
 * Rumus inti ROI digital marketing:
 *
 * Results       = Budget ÷ CPR
 * Revenue       = Results × AOV
 * Profit        = Revenue − Budget
 * ROI           = (Profit ÷ Budget) × 100%
 * CPR Target    = AOV × 30%  (benchmark industri: CPR ideal ≤ 30% dari AOV)
 * Margin/Result = AOV − CPR
 */

export function calculate(params: CampaignParams): CalculationResults {
  const { budget, cpr, aov } = params;

  const results = cpr > 0 ? budget / cpr : 0;
  const revenue = results * aov;
  const profit = revenue - budget;
  const roi = budget > 0 ? (profit / budget) * 100 : 0;
  const cprTarget = aov * 0.3;
  const marginPerResult = aov - cpr;
  const revenuePerResult = aov;

  let roiStatus: CalculationResults['roiStatus'];
  if (roi >= 100) roiStatus = 'excellent';
  else if (roi >= 0) roiStatus = 'good';
  else if (roi >= -50) roiStatus = 'warning';
  else roiStatus = 'danger';

  return {
    results: Math.round(results),
    revenue: Math.round(revenue),
    profit: Math.round(profit),
    roi: parseFloat(roi.toFixed(1)),
    cprTarget: Math.round(cprTarget),
    marginPerResult: Math.round(marginPerResult),
    revenuePerResult: Math.round(revenuePerResult),
    isProfit: profit >= 0,
    roiStatus,
  };
}

export function generateInsights(
  params: CampaignParams,
  res: CalculationResults,
): string[] {
  const { budget, cpr, aov } = params;
  const { roi, results, marginPerResult, cprTarget } = res;
  const insights: string[] = [];

  if (roi >= 100)
    insights.push('ROI sangat baik! Kampanye Anda sangat menguntungkan.');
  else if (roi >= 0)
    insights.push('CPR Anda dalam kisaran sehat (30% dari harga produk).');
  else
    insights.push(
      'Kampanye perlu optimasi. Fokus pada pengurangan CPR atau peningkatan nilai pesanan.',
    );

  const cprRatio = aov > 0 ? (cpr / aov) * 100 : 0;
  if (cprRatio <= 30)
    insights.push(
      `CPR Anda dalam kisaran sehat (${cprRatio.toFixed(0)}% dari harga produk). Target CPR ideal: ${formatRupiah(cprTarget)}.`,
    );
  else
    insights.push(
      `Pertimbangkan untuk menurunkan CPR Anda untuk meningkatkan profitabilitas. Target CPR sebaiknya sekitar (${cprRatio.toFixed(0)}% dari AOV). Turunkan CPR mendekati ${formatRupiah(cprTarget)} (30% dari AOV).`,
    );

  const budgetDisplay =
    budget >= 1_000_000
      ? `Rp ${(budget / 1_000_000).toFixed(1)} juta`
      : formatRupiah(budget);
  insights.push(
    `Dengan budget ${budgetDisplay}, Anda menghasilkan ~${results} results. Setiap result: margin ${formatRupiah(marginPerResult)}.`,
  );

  return insights;
}

export function formatRupiah(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

export function formatRoiLabel(roi: number): string {
  return (roi >= 0 ? '+' : '') + roi.toFixed(1) + '%';
}
