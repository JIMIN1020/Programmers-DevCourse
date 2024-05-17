import { createGlobalTheme, style } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    main: "#ffa726",
    mainDarker: "#f57c00",
    mainFaded: "#ffb74d",
    mainFadedBright: "#ffb74da6",
    list: "rgb(235, 236, 240)",
    task: "rgb(255, 255, 255)",
    taskHover: "rgb(245, 245, 245)",
    brightText: "rgb(255, 255, 255)",
    darkText: "rgb(24, 42, 77)",
    darkText_2: "rgb(94, 108, 132)",
    darkText_2_Hover: "rgb(218, 219, 226)",
    selectedTab: "rgb(137, 176, 174)",
    updateButton: "rgb(237, 180, 88)",
    deleteButton: "rgb(237, 51, 88)",
  },
  fontSize: {
    T1: "32px",
    T2: "24px",
    T3: "18px",
    T4: "14px",
    P1: "12px",
  },
  spacing: {
    sm: "5px",
    md: "10px",
    lg1: "20px",
    lg2: "15px",
    list: "30px",
  },
  font: {
    body: "arial",
  },
  shadow: {
    basic: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
  },
  minWidth: {
    list: "250px",
  },
});

export const appContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  minHeight: "100vh",
  height: "max-content",
});

export const board = style({
  display: "flex",
  flexDirection: "row",
  height: "100%",
});

export const buttons = style({
  marginTop: "auto",
  paddingLeft: vars.spacing.lg2,
});

export const deleteBoardButton = style({
  border: "none",
  borderRadius: 5,
  width: "max-content",
  marginTop: "auto",
  marginLeft: "auto",
  marginBottom: 30,
  fontSize: vars.fontSize.T4,
  padding: vars.spacing.lg2,
  backgroundColor: vars.color.mainFaded,
  cursor: "pointer",
  opacity: 0.6,
  minWidth: 150,

  ":hover": {
    opacity: 0.8,
  },
});

export const loggerButton = style({
  border: "none",
  borderRadius: 5,
  width: "max-content",
  marginTop: "auto",
  marginLeft: "15px",
  marginRight: "30px",
  marginBottom: "30px",
  fontSize: vars.fontSize.T4,
  padding: vars.spacing.lg2,
  backgroundColor: vars.color.mainFaded,
  cursor: "pointer",
  opacity: 0.6,
  minWidth: 150,

  ":hover": {
    opacity: 0.8,
  },
});
