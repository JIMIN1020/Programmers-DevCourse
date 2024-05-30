import React from "react";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";

function Home() {
  return (
    <>
      <Title size="md">제목</Title>
      <div>Home</div>
      <InputText placeholder="입력" />
      <Button size="lg" scheme="primary">
        버튼
      </Button>
    </>
  );
}

export default Home;
