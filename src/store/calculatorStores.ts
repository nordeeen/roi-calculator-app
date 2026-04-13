import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  CampaignParams,
  CalculationResults,
  HistoryEntry,
} from '../types/modelTypes';
import { calculate, generateInsights } from '../utils/calculation';

interface CalculatorState {
  params: CampaignParams;
  results: CalculationResults;
  insights: string[];
  history: HistoryEntry[];

  updateParam: (key: keyof CampaignParams, value: number) => void;
  saveToHistory: () => void;
  deleteHistory: (id: number) => void;
  clearHistory: () => void;
}

const DEFAULT_PARAMS: CampaignParams = {
  harga: 500000,
  budget: 5000000,
  cpr: 100000,
  aov: 500000,
};

const deriveResults = (params: CampaignParams) => {
  const results = calculate(params);
  const insights = generateInsights(params, results);
  return { results, insights };
};

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      params: DEFAULT_PARAMS,
      ...deriveResults(DEFAULT_PARAMS),
      history: [],

      updateParam: (key, value) => {
        const safeVal = Math.max(0, value);
        const newParams = { ...get().params, [key]: safeVal };
        const derived = deriveResults(newParams);
        set({ params: newParams, ...derived });
      },

      saveToHistory: () => {
        const { params, results } = get();
        const entry: HistoryEntry = {
          id: Date.now(),
          ts: new Date().toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          params: { ...params },
          results: { ...results },
        };
        set((state) => ({
          history: [entry, ...state.history].slice(0, 10),
        }));
      },

      deleteHistory: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'roi-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : ({} as Storage),
      ),
      partialize: (state) => ({ history: state.history }),
    },
  ),
);
