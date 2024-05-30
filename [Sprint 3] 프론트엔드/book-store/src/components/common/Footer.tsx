import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterStyle>
      <Logo>Book Store</Logo>
      <Copyright>copyright(c). 2024, book store.</Copyright>
    </FooterStyle>
  );
}

export default Footer;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 22px;
  color: orange;
`;

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.lg};
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;

  display: flex;
  justify-content: space-between;
`;

const Copyright = styled.div`
  font-size: 0.75rem;
  ${({ theme }) => theme.color.text};
`;
