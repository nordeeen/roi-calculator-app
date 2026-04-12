import { CampaignParams, CalculationResults } from '../types/modelTypes';

export function calculate(params: CampaignParams): CalculationResults {
  const { budget, cpr, aov, harga } = params;

  const results = cpr > 0 ? budget / cpr : 0;
  const revenue = results * aov;
  const profit = revenue - budget;
  const roi = budget > 0 ? (profit / budget) * 100 : 0;
  const cprTarget = harga * 0.3;
  const marginPerResult = aov - cpr;
  const revenuePerResult = aov;

  let roiStatus: CalculationResults['roiStatus'];
  if (roi >= 500) roiStatus = 'excellent';
  else if (roi >= 0) roiStatus = 'good';
  else if (roi >= -50) roiStatus = 'warning';
  else roiStatus = 'danger';

  return {
    results: Math.floor(results),
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
  const { budget, cpr, aov, harga } = params;
  const { roi, results, marginPerResult, cprTarget } = res;
  const insights: string[] = [];

  if (roi >= 100)
    insights.push(
      'ROI sangat baik! Kampanye Anda sangat menguntungkan. Pertimbangkan untuk scale up budget.',
    );
  else if (roi >= 0)
    insights.push(
      'ROI positif. Kampanye masih menguntungkan namun ada ruang untuk peningkatan.',
    );
  else
    insights.push(
      'Kampanye perlu optimasi. Fokus pada pengurangan CPR atau peningkatan nilai pesanan.',
    );

  const cprRatio = harga > 0 ? (cpr / harga) * 100 : 0;

  if (cprRatio <= 30) {
    insights.push(
      `CPR Anda dalam kisaran sehat (${cprRatio.toFixed(0)}% dari harga produk).`,
    );
  } else {
    insights.push(
      `Pertimbangkan untuk menurunkan CPR Anda untuk meningkatkan profitabilitas. Target CPR sebaiknya sekitar 30% dari harga produk.`,
    );
  }

  const budgetDisplay =
    budget >= 1_000_000
      ? `Rp ${(budget / 1_000_000).toFixed(1)} juta`
      : formatRupiah(budget);
  insights.push(
    `Dengan budget ${budgetDisplay}, Anda menghasilkan sekitar ${results} results.
      Setiap result menghasilkan margin ${formatRupiah(marginPerResult)}.`,
  );

  return insights;
}

export function formatRupiah(n: number): string {
  const abs = Math.abs(n).toLocaleString('id-ID');
  const sign = n < 0 ? '-' : '';

  return `${sign}Rp ${abs}`;
}

export function formatRoiLabel(roi: number): string {
  return (roi >= 0 ? '+ ' : '') + roi.toFixed(1) + ' %';
}
