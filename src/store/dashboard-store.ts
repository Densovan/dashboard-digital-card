// store/dashboard-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Metric {
  title: string;
  value: number;
  icon: string;
  changeType?: "increase" | "decrease";
  change?: string;
}

interface RevenueItem {
  date: string;
  count: number;
}

interface DashboardStore {
  summary: Metric[];
  revenue: RevenueItem[];
  setSummary: (data: Metric[]) => void;
  setRevenue: (data: RevenueItem[]) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  devtools((set) => ({
    summary: [],
    revenue: [],
    setSummary: (data) => set({ summary: data }),
    setRevenue: (data) => set({ revenue: data }),
  }))
);
