import { createContext, useContext, useState, type ReactNode } from "react";

type StatisticsContextType = {
  aiUsageCount: number;
  chatCountHistory: number[];
  loadingTimes: number[];
  incrementAIUsage: () => void;
  addChatCount: () => void;
  addLoadingTime: (time: number) => void;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export function StatisticsProvider({ children }: { children: ReactNode }) {
  const [aiUsageCount, setAIUsageCount] = useState(0);
  const [chatCountHistory, setChatCountHistory] = useState<number[]>([]);
  const [loadingTimes, setLoadingTimes] = useState<number[]>([]);

  const incrementAIUsage = () => {
    setAIUsageCount((prev) => prev + 1);
  };

  const addChatCount = () => {
    setChatCountHistory((prev) => [...prev, prev.length + 1]);
  };

  const addLoadingTime = (time: number) => {
    setLoadingTimes((prev) => [...prev, time]);
  };

  return (
    <StatisticsContext.Provider value={{ aiUsageCount, chatCountHistory, loadingTimes, incrementAIUsage, addChatCount, addLoadingTime }}>
      {children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error("useStatistics must be used within StatisticsProvider");
  }
  return context;
}
