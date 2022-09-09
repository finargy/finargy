/**
 * Define new chakra tokens or modify existing ones
 *
 * https://chakra-ui.com/docs/styled-system/semantic-tokens
 */
export const semanticTokens = {
  colors: {
    // Background colors
    "bg-body": {
      default: "gray.50",
      _dark: "gray.900",
    },
    "bg-body-inverse": {
      default: "gray.900",
      _dark: "gray.50",
    },
    "bg-contrast-xs": {
      default: "rgba(0, 0, 0, 0.0125)",
      _dark: "rgba(255, 255, 255, 0.0125)",
    },
    "bg-contrast-sm": {
      default: "rgba(0, 0, 0, 0.025)",
      _dark: "rgba(255, 255, 255, 0.025)",
    },
    "bg-contrast-md": {
      default: "rgba(0, 0, 0, 0.05)",
      _dark: "rgba(255, 255, 255, 0.05)",
    },
    "bg-contrast-lg": {
      default: "rgba(0, 0, 0, 0.075)",
      _dark: "rgba(255, 255, 255, 0.075)",
    },
    "bg-contrast-xl": {
      default: "rgba(0, 0, 0, 0.1)",
      _dark: "rgba(255, 255, 255, 0.1)",
    },
    // Text colors
    "text-contrast-xs": {
      default: "blackAlpha.500",
      _dark: "whiteAlpha.500",
    },
    "text-contrast-sm": {
      default: "blackAlpha.600",
      _dark: "whiteAlpha.600",
    },
    "text-contrast-md": {
      default: "blackAlpha.700",
      _dark: "whiteAlpha.700",
    },
    "text-contrast-lg": {
      default: "blackAlpha.800",
      _dark: "whiteAlpha.800",
    },
    "text-contrast-xl": {
      default: "blackAlpha.900",
      _dark: "whiteAlpha.900",
    },
    // Border colors
    "border-contrast-xs": {
      default: "rgba(0, 0, 0, 0.1)",
      _dark: "rgba(255, 255, 255, 0.1)",
    },
    "border-contrast-sm": {
      default: "rgba(0, 0, 0, 0.2)",
      _dark: "rgba(255, 255, 255, 0.2)",
    },
    "border-contrast-md": {
      default: "rgba(0, 0, 0, 0.3)",
      _dark: "rgba(255, 255, 255, 0.3)",
    },
    "border-contrast-lg": {
      default: "rgba(0, 0, 0, 0.4)",
      _dark: "rgba(255, 255, 255, 0.4)",
    },
    "border-contrast-xl": {
      default: "rgba(0, 0, 0, 0.5)",
      _dark: "rgba(255, 255, 255, 0.5)",
    },
    sizes: {
      "h-screen": "calc(var(--vh) * 100)",
      "h-screen-2": "calc(var(--vh) * 200)",
      "h-screen-3": "calc(var(--vh) * 300)",
      "h-screen-4": "calc(var(--vh) * 400)",
      "h-screen-5": "calc(var(--vh) * 500)",
      "w-screen": "calc(var(--vw) * 100)",
      "w-screen-2": "calc(var(--vw) * 200)",
      "w-screen-3": "calc(var(--vw) * 300)",
      "w-screen-4": "calc(var(--vw) * 400)",
      "w-screen-5": "calc(var(--vw) * 500)",
    },
    borders: {
      sm: `1px solid var(--chakra-colors-border-contrast-xl)`,
      md: `2px solid var(--chakra-colors-border-contrast-xl)`,
      lg: `3px solid var(--chakra-colors-border-contrast-xl)`,
    },
  },
};
