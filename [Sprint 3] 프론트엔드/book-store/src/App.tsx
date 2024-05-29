import React from "react";
import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";
import ThemeSwitcher from "./components/common/ThemeSwitcher";
import { BookStoreThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
