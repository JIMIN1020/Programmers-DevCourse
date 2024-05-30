import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BookStoreThemeProvider } from "../../context/ThemeContext";

describe("Button 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="lg" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size prop 적용", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="lg" scheme="primary">
          타이틀
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByRole).toHaveStyle({ fontSize: "1.5rem" });
  });
});
