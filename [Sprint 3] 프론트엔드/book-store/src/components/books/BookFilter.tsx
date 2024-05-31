import React from "react";
import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

function BookFilter() {
  const category = useCategory();
  const [params, setParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newParams = new URLSearchParams(params);

    if (id === null) {
      newParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setParams(newParams);
  };

  const handleNew = () => {
    const newParams = new URLSearchParams(params);

    if (newParams.get(QUERYSTRING.NEWLY)) {
      newParams.delete(QUERYSTRING.NEWLY);
    } else {
      newParams.set(QUERYSTRING.NEWLY, "true");
    }

    setParams(newParams);
  };

  return (
    <BookFilterStyle>
      <Category>
        {category.map((data) => (
          <Button
            size="md"
            scheme={data.isActive ? "primary" : "normal"}
            key={data.category_id}
            onClick={() => handleCategory(data.category_id)}
          >
            {data.category_name}
          </Button>
        ))}
      </Category>
      <Button
        size="md"
        scheme={params.get(QUERYSTRING.NEWLY) ? "primary" : "normal"}
        onClick={() => handleNew()}
      >
        신간
      </Button>
    </BookFilterStyle>
  );
}

export default BookFilter;

const BookFilterStyle = styled.div`
  display: flex;
  gap: 24px;
`;

const Category = styled.div`
  display: flex;
  gap: 8px;
`;
