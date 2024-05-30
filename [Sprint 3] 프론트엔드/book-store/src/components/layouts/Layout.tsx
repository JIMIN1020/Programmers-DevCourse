import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import styled from "styled-components";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
}

export default Layout;

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.lg};
  padding: 20px 0;
`;
