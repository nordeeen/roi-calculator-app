import { act, renderHook } from '@testing-library/react';
import { useCalculatorStore } from '../calculatorStores';

let mockTime = 1_000_000;
beforeEach(() => {
  mockTime = 1_000_000;
  jest.spyOn(Date, 'now').mockImplementation(() => mockTime++);
  act(() => {
    useCalculatorStore.getState().clearHistory();
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useCalculatorStore', () => {
  it('saveToHistory menambah entry dengan struktur lengkap dan urutan terbaru di atas', () => {
    const { result } = renderHook(() => useCalculatorStore());

    act(() => { result.current.saveToHistory(); });
    act(() => { result.current.saveToHistory(); });

    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0]).toHaveProperty('params');
    expect(result.current.history[0]).toHaveProperty('results');
    expect(result.current.history[0]).toHaveProperty('id');
    expect(result.current.history[0]).toHaveProperty('ts');
    expect(result.current.history[0].id).toBeGreaterThanOrEqual(result.current.history[1].id);
  });

  it('saveToHistory membatasi maksimal 30 entry', () => {
    const { result } = renderHook(() => useCalculatorStore());

    act(() => {
      for (let i = 0; i < 35; i++) result.current.saveToHistory();
    });

    expect(result.current.history.length).toBeLessThanOrEqual(30);
  });

  it('deleteHistory menghapus entry target dan mempertahankan entry lain', () => {
    const { result } = renderHook(() => useCalculatorStore());

    act(() => { result.current.saveToHistory(); });
    act(() => { result.current.saveToHistory(); });

    const [keep, remove] = result.current.history;
    act(() => { result.current.deleteHistory(remove.id); });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].id).toBe(keep.id);
  });

  it('clearHistory mengosongkan semua history; deleteHistory dengan id tidak valid tidak error', () => {
    const { result } = renderHook(() => useCalculatorStore());

    act(() => {
      result.current.saveToHistory();
      result.current.saveToHistory();
      result.current.clearHistory();
    });
    expect(result.current.history).toHaveLength(0);

    expect(() => {
      act(() => { result.current.deleteHistory(999999); });
    }).not.toThrow();
  });
});
