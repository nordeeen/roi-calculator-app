import CalculatorSection from '../components/CalculatorSection/CalculatorSection';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import HistorySection from '../components/HistorySection/HistorySection';
import WhySection from '../components/WhySection/WhySection';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <CalculatorSection />
      <HistorySection />
      <WhySection />
      {/* <Footer /> */}
    </main>
  );
}
