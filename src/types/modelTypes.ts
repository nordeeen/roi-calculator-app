export interface CampaignParams {
  harga: number;
  budget: number;
  cpr: number;
  aov: number;
}

export interface CalculationResults {
  results: number;
  revenue: number;
  profit: number;
  roi: number;
  cprTarget: number;
  marginPerResult: number;
  revenuePerResult: number;
  isProfit: boolean;
  roiStatus: 'excellent' | 'good' | 'warning' | 'danger';
}

export interface HistoryEntry {
  id: number;
  ts: string;
  params: CampaignParams;
  results: CalculationResults;
}
