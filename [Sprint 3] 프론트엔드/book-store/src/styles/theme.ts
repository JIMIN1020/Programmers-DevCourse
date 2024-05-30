export type ThemeName = "light" | "dark";
export type ColorKey =
  | "primary"
  | "background"
  | "secondary"
  | "third"
  | "border"
  | "text";
export type HeadingSize = "lg" | "md" | "sm";
export type ButtonSize = "lg" | "md" | "sm";
export type ButtonScheme = "primary" | "normal";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "brown",
    background: "lightgray",
    secondary: "blue",
    third: "green",
    border: "gray",
    text: "black",
  },
  heading: {
    lg: {
      fontSize: "2rem",
    },
    md: {
      fontSize: "1.5rem",
    },
    sm: {
      fontSize: "1rem",
    },
  },
  button: {
    lg: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
    md: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    sm: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonScheme: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
  },
  borderRadius: {
    default: "4px",
  },
} as const;

export const dark: Theme = {
  ...light,
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "darkblue",
    third: "darkgreen",
    border: "gray",
    text: "black",
  },
} as const;

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
