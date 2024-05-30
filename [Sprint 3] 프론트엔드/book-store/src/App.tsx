import React from "react";
import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";
import { BookStoreThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BookStoreThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
