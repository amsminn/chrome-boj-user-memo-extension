export type ColorPalette = {
  primary: string;
  primaryHover: string;
  success: string;
  successHover: string;
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    gradient: string;
  };
  border: {
    light: string;
    dark: string;
  };
};

export type ThemeSpacing = {
  small: string;
  medium: string;
  large: string;
};

export type ThemeBorderRadius = {
  small: string;
  medium: string;
  large: string;
};

export type ThemeFontSizes = {
  small: string;
  medium: string;
  large: string;
};

export type ThemeTransitions = {
  default: string;
  fast: string;
};

export type ThemeShadows = {
  small: string;
  large: string;
};

export interface Theme {
  colors: ColorPalette;
  shadows: ThemeShadows;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  fontSizes: ThemeFontSizes;
  transitions: ThemeTransitions;
}

export const theme: Theme = {
  colors: {
    primary: "#0070f3",
    primaryHover: "#005bb5",
    success: "#28a745",
    successHover: "#218838",
    text: {
      primary: "#333",
      secondary: "#222",
    },
    background: {
      primary: "#fff",
      gradient: "linear-gradient(135deg, #e0eafc, #cfdef3)",
    },
    border: {
      light: "0.5px solid #aaa",
      dark: "2px solid #aaa",
    },
  },
  shadows: {
    small: "0 2px 6px rgba(32, 14, 14, 0.1)",
    large: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
  borderRadius: {
    small: "8px",
    medium: "10px",
    large: "16px",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.3rem",
    large: "2rem",
  },
  transitions: {
    default: "0.3s ease",
    fast: "0.2s ease",
  },
}; 