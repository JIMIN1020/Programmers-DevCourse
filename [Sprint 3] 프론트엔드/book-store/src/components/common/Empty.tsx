import React from "react";

import styled from "styled-components";
import Title from "../common/Title";

interface Props {
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function Empty({ icon, title, description }: Props) {
  return (
    <EmptyStyle>
      {icon && <Icon>{icon}</Icon>}
      <Title size="lg" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </EmptyStyle>
  );
}

export default Empty;

const EmptyStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 120px 0;
`;

const Icon = styled.div`
  svg {
    font-size: 4rem;
    fill: #ccc;
  }
`;
