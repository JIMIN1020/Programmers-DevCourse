import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  ${reset}

  body {
    background-color: ${({ themeName }) =>
      themeName === "light" ? "white" : "black"};
    width: 100vw;
    min-height: 100vh;
    height: fit-content;

    display: flex;
    flex-direction: column;
  }

  * {
    color: ${({ themeName }) => (themeName === "light" ? "black" : "white")}
  }
`;
