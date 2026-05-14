import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleTheme: () => {},
});


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para usar o tema em qualquer componente
export function useTheme() {
  return useContext(ThemeContext);
}