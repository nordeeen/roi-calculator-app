import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#FEFCF9',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'AdForecast Pro — Kalkulator ROI Iklan Real-Time',
  description:
    'Prediksi ROI kampanye iklan digital Anda secara real-time. Hitung pendapatan, profit, dan optimalkan pengeluaran iklan.',
  keywords: ['ROI', 'kalkulator iklan', 'digital marketing', 'CPR', 'ROAS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.className}>
      <body className="min-h-screen bg-[#f8f7ff]">{children}</body>
    </html>
  );
}
