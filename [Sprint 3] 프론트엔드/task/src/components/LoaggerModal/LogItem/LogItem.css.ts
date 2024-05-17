import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const logItemWrap = style({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  padding: vars.spacing.md,
  marginBottom: vars.spacing.lg2,
  width: "100%",
  borderBottom: "solid 1px rgb(191, 197, 217, 0.3",

  ":hover": {
    backgroundColor: vars.color.mainFadedBright,
    borderRadius: 10,
  },
});

export const message = style({
  display: "flex",
  alignItems: "center",
  color: vars.color.brightText,
  fontWeight: "bold",
  fontSize: vars.fontSize.T4,
  marginBottom: vars.spacing.sm,
});

export const author = style({
  display: "flex",
  alignItems: "center",
  columnGap: 10,
  color: vars.color.brightText,
  fontSize: vars.fontSize.T3,
  fontWeight: "bold",
  marginBottom: vars.spacing.md,
});

export const date = style({
  fontSize: vars.fontSize.T4,
  fontWeight: "bold",
  marginBottom: vars.spacing.md,
});
