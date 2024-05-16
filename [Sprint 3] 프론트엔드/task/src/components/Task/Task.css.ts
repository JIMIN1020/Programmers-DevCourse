import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.spacing.md,
  backgroundColor: vars.color.task,
  borderRadius: 10,
  marginBottom: vars.spacing.lg2,
  boxShadow: vars.shadow.basic,
  cursor: "pointer",

  ":hover": {
    backgroundColor: vars.color.taskHover,
    transform: "scale(1.03)",
  },
});

export const title = style({
  fontSize: vars.fontSize.T4,
  fontWeight: "bold",
  marginBottom: vars.spacing.sm,
});

export const description = style({
  fontSize: vars.fontSize.P1,
});
