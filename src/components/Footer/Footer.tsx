export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <div
          className="text-lg font-black text-gray-800 mb-1"
          style={{ fontFamily: 'var(--font-syne)' }}>
          AdForecast Pro
        </div>
        <p className="text-xs text-gray-400">
          Kalkulator ROI Iklan Real-Time untuk Produk Digital
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
          <span>Next.js 14</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>Zustand</span>
          <span>·</span>
          <span>Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
