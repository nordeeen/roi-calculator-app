import { calculate, formatRupiah, formatRoiLabel } from '../calculation';

// calculate
describe('calculate()', () => {
  const baseParams = {
    harga: 500_000,
    budget: 5_000_000,
    cpr: 100_000,
    aov: 500_000,
  };

  it('menghitung semua metrik inti dengan benar (results, revenue, profit, roi, cprTarget)', () => {
    const res = calculate(baseParams);
    expect(res.results).toBe(50);
    expect(res.revenue).toBe(25_000_000);
    expect(res.profit).toBe(20_000_000);
    expect(res.roi).toBe(400.0);
    expect(res.cprTarget).toBe(150_000);
  });

  it('isProfit benar sesuai kondisi untung dan rugi', () => {
    expect(calculate(baseParams).isProfit).toBe(true);
    expect(calculate({ ...baseParams, cpr: 1_000_000 }).isProfit).toBe(false);
  });

  it('roiStatus sesuai semua threshold (excellent, good, warning, danger)', () => {
    expect(calculate({ ...baseParams, budget: 1_000_000, cpr: 10_000 }).roiStatus).toBe('excellent');
    expect(calculate(baseParams).roiStatus).toBe('good');
    expect(calculate({ harga: 500_000, budget: 100_000, cpr: 10_000, aov: 8_000 }).roiStatus).toBe('warning');
    expect(calculate({ harga: 500_000, budget: 100_000, cpr: 10_000, aov: 1_000 }).roiStatus).toBe('danger');
  });

  it('menangani edge case: cpr = 0 dan budget = 0 tanpa error', () => {
    expect(calculate({ ...baseParams, cpr: 0 }).results).toBe(0);
    expect(calculate({ ...baseParams, budget: 0 }).roi).toBe(0);
  });

  it('menghitung cprTarget sebesar 30% dari harga produk', () => {
    const res = calculate({ ...baseParams, harga: 1_000_000 });
    expect(res.cprTarget).toBe(300_000);
  });
});

// formatRupiah
describe('formatRupiah()', () => {
  it('memformat angka positif, nol, dan jutaan dengan prefix Rp', () => {
    expect(formatRupiah(500_000)).toBe('Rp 500.000');
    expect(formatRupiah(0)).toBe('Rp 0');
    expect(formatRupiah(1_000_000)).toBe('Rp 1.000.000');
  });

  it('memformat angka negatif dengan tanda minus di depan Rp', () => {
    expect(formatRupiah(-100_000)).toBe('-Rp 100.000');
  });
});

// formatRoiLabel()
describe('formatRoiLabel()', () => {
  it('menampilkan tanda + untuk ROI positif dan nol', () => {
    expect(formatRoiLabel(400)).toBe('+ 400.0 %');
    expect(formatRoiLabel(0)).toBe('+ 0.0 %');
  });

  it('tidak menampilkan tanda + untuk ROI negatif', () => {
    expect(formatRoiLabel(-20)).toBe('-20.0 %');
  });
});
