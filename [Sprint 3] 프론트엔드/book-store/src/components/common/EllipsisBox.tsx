import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  lineLimit: number;
}

function EllipsisBox({ children, lineLimit }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Box $lineLimit={lineLimit} $isExpanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="sm"
          scheme="normal"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "접기" : "펼치기"}
          <FaAngleDown />
        </Button>
      </div>
    </Box>
  );
}

export default EllipsisBox;

const Box = styled.div<{ $lineLimit: number; $isExpanded: boolean }>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ $lineLimit, $isExpanded }) =>
      $isExpanded ? "none" : $lineLimit};
    -webkit-box-orient: vertical;
  }

  .toggle {
    width: fit-content;
    align-self: end;

    & svg {
      transform: ${({ $isExpanded }) =>
        $isExpanded ? "rotate(180deg)" : "rotate(0)"};
    }
  }
`;
