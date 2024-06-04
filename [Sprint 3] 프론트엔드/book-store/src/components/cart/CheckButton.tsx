import React from "react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

function CheckButton({ isChecked, onCheck }: Props) {
  return (
    <ButtonStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </ButtonStyle>
  );
}

export default CheckButton;

const ButtonStyle = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;
