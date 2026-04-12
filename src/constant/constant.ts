import { CampaignParams } from '../types/modelTypes';

export const ROI_CONFIG = {
  excellent: {
    gradient: 'from-emerald-500 to-teal-600',
    status: 'Kampanye Sangat Menguntungkan',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  good: {
    gradient: 'from-indigo-500 to-purple-600',
    status: 'Kampanye Menguntungkan',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  warning: {
    gradient: 'from-amber-500 to-orange-600',
    status: 'Perlu Optimasi',
    badge: 'bg-amber-100 text-amber-700',
  },
  danger: {
    gradient: 'from-red-500 to-rose-600',
    status: 'Perlu Optimasi',
    badge: 'bg-red-100 text-red-700',
  },
};

export const SLIDER_MAX: Record<string, number> = {
  budget: 100_000_000,
  cpr: 50_000_000,
};
export const bgColors = ['#f7f6ff', '#f1fbfc', '#f7f6ff'];
export const bulletColors = ['#818cf8', '#05b0c0', '#818cf8'];

export const FEATURES = [
  {
    icon: '/icons/icon-calculate.svg',
    color: 'bg-indigo-100',
    title: 'Perhitungan Real-Time',
    desc: 'Lihat secara langsung bagaimana perubahan parameter kampanye Anda mempengaruhi pendapatan, keuntungan, dan ROI dengan kalkulator dinamis kami.',
  },
  {
    icon: '/icons/icon-basis-data.svg',
    color: 'bg-purple-100',
    title: 'Wawasan Berbasis Data',
    desc: 'Dapatkan rekomendasi yang dapat ditindaklanjuti berdasarkan metrik kampanye Anda untuk mengoptimalkan kinerja dan memaksimalkan profitabilitas.',
  },
  {
    icon: '/icons/icon-optimaze.svg',
    color: 'bg-blue-100',
    title: 'Optimalkan Pengeluaran Iklan',
    desc: 'Temukan keseimbangan sempurna antara pengeluaran iklan dan hasil. Identifikasi CPR optimal untuk bisnis Anda.',
  },
];

export const FIELDS: {
  label: string;
  key: keyof CampaignParams;
  min: number;
  max: number;
  step: number;
  hasSlider?: boolean;
}[] = [
  {
    label: 'Harga Produk',
    key: 'harga',
    min: 0,
    max: 10_000_000,
    step: 1000,
    hasSlider: false,
  },
  {
    label: 'Pengeluaran Iklan Bulanan',
    key: 'budget',
    min: 0,
    max: 50_000_000,
    step: 100_000,
  },
  {
    label: 'Cost per Results (CPR)',
    key: 'cpr',
    min: 0,
    max: 5_000_000,
    step: 1_000,
  },
  {
    label: 'Nilai Pesanan Rata-rata',
    key: 'aov',
    min: 0,
    max: 10_000_000,
    step: 1_000,
    hasSlider: false,
  },
];
