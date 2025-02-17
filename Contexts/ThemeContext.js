import { createContext, useState } from "react";
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [IsDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("IsDarkMode"))
  );
  console.log(ThemeProvider.children)
  return (
    <ThemeContext.Provider value={[IsDark, setIsDark]}>
      {children}
    </ThemeContext.Provider>
  );
}
