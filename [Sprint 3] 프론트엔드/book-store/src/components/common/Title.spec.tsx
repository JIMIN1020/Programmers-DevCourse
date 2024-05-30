import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/ThemeContext";

describe("Title 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="lg">타이틀</Title>
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(screen.getByText("타이틀")).toBeInTheDocument();
  });

  it("size prop 적용", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="lg">타이틀</Title>
      </BookStoreThemeProvider>
    );
    expect(container?.firstChild).toHaveStyle({ fontSize: "2rem" });
  });
});
