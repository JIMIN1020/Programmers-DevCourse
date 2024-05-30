import React from "react";
import styled from "styled-components";
import { ColorKey, HeadingSize } from "../../styles/theme";

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

function Title({ children, size, color }: Props) {
  return (
    <StyledTitle size={size} color={color}>
      {children}
    </StyledTitle>
  );
}

export default Title;

const StyledTitle = styled.h1<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size]};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.primary};
`;
