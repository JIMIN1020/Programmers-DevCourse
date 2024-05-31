import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

const viewOptions = [
  { value: "list", icon: <FaList /> },
  { value: "grid", icon: <FaTh /> },
];

function BookViewSwitcher() {
  const [params, setParams] = useSearchParams();

  const handleSwitch = (value: string) => {
    const newParam = new URLSearchParams(params);

    newParam.set(QUERYSTRING.VIEW, value);
    setParams(newParam);
  };

  useEffect(() => {
    if (!params.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, []);

  return (
    <Container>
      {viewOptions.map((option) => (
        <Button
          size="md"
          scheme={
            params.get(QUERYSTRING.VIEW) === option.value ? "primary" : "normal"
          }
          onClick={() => handleSwitch(option.value)}
        >
          {option.icon}
        </Button>
      ))}
    </Container>
  );
}

export default BookViewSwitcher;

const Container = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: #fff;
  }
`;
