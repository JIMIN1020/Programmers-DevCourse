import { createContext, useEffect, useState } from "react";
import { ThemeName, getTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyle";

const DEFAULT_THEME_NAME = "light";
const THEME_STORAGE_KEY = "book_store_theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state: State = {
  themeName: DEFAULT_THEME_NAME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    const theme = themeName === "light" ? "dark" : "light";
    setThemeName(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  // 초기화
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    setThemeName(savedTheme || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
