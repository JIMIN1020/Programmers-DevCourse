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

    if (newParams.get(QUERYSTRING.IS_NEW)) {
      newParams.delete(QUERYSTRING.IS_NEW);
    } else {
      newParams.set(QUERYSTRING.IS_NEW, "true");
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
            key={data.id}
            onClick={() => handleCategory(data.id)}
          >
            {data.name}
          </Button>
        ))}
      </Category>
      <Button
        size="md"
        scheme={params.get(QUERYSTRING.IS_NEW) ? "primary" : "normal"}
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
