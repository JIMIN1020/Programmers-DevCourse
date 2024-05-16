import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const listWrapper = style({
  display: "flex",
  flexDirection: "column",
  marginRight: vars.spacing.list,
  padding: vars.spacing.lg2,
  minWidth: vars.minWidth.list,
  width: "max-content",
  height: "max-content",
  borderRadius: 10,
  backgroundColor: vars.color.list,
});

export const name = style({
  fontSize: vars.fontSize.T3,
  marginBottom: vars.spacing.lg2,
});

export const header = style({
  display: "flex",
  alignItems: "center",
});

export const deleteButton = style({
  padding: vars.spacing.sm,
  borderRadius: 20,
  fontSize: vars.fontSize.T2,
  marginLeft: "auto",
  marginTop: "-15px",
  marginRight: "5px",
  cursor: "pointer",

  ":hover": {
    backgroundColor: vars.color.task,
    boxShadow: vars.shadow.basic,
    opacity: 0.8,
  },
});
