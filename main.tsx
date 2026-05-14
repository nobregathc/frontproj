import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { StatisticsProvider } from "./context/StatisticsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <StatisticsProvider>
        <App />
      </StatisticsProvider>
    </ThemeProvider>
  </StrictMode>
);
