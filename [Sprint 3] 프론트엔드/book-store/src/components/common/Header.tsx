import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderBar>
      <h1>Header</h1>
    </HeaderBar>
  );
}

export default Header;

const HeaderBar = styled.header`
  width: 500px;
`;
