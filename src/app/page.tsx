import Hero from '../components/Hero/Hero';
import CalculatorSection from '../components/CalculatorSection/CalculatorSection';
import HistorySection from '../components/HistorySection/HistorySection';
import WhySection from '../components/WhySection/WhySection';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <CalculatorSection />
      <HistorySection />
      <WhySection />
    </main>
  );
}
