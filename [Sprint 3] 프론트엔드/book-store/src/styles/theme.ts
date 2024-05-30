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
export type LayoutWidth = "lg" | "md" | "sm";

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
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "#ff5800",
    background: "lightgray",
    secondary: "#5F5F5F",
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
  layout: {
    width: {
      lg: "1020px",
      md: "760px",
      sm: "320px",
    },
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
