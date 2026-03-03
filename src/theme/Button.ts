import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
  fontSize: "14px",
  bgColor: "primary",
  color: "white",
  border: "none",
  outline: "none",
  _dark: {
    color: "black",
  },
  _focus: {
    outline: "none",
  },
  _active: {
    bgColor: `primary.700`,
  },
  _hover: {
    bgColor: `primary.600`,
    _disabled: {
      opacity: 0.4,
      bgColor: "primary.600",
    },
  },
  _disabled: {
    opacity: 0.4,
    _hover: {
      bgColor: `primary.600`,
    },
  },
});

export const Button = defineStyleConfig({
  baseStyle: {
    fontSize: "14px",
    borderRadius: "8px",
  },
  variants: {
    primary,
    secondary: {
      _light: {
        color: "text",
        bgColor: "secondary",
        border: "none",
        outline: "none",
        _hover: { bgColor: "secondary.600" },
        _active: { bgColor: "secondary.700" },
        _disabled: { opacity: 0.4 },
      },
      fontSize: "14px",
    },
    danger: {
      _light: {
        color: "white",
        bgColor: "red.500",
        outline: "none",
        border: "none",
        _hover: { bgColor: "red.600" },
        _active: { bgColor: "red.700" },
        _disabled: { opacity: 0.4 },
      },
      fontSize: "14px",
    },
    outline: {
      _light: {
        color: "text",
        bgColor: "transparent",
        border: "1px solid #E5E5E5",
        _hover: {
          bgColor: "rgba(0, 0, 0, 0.3)",
        },
        _active: {
          bgColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      fontSize: "14px",
    },
    ghost: { 
      fontSize: "14px",
      _light: {
        color: "text",
        bgColor: "transparent",
        outline: 'none',
        _hover: {
          bgColor: "dark.400",
        },
        _active: {
          bgColor: "dark.300",
        },
      },
    },
  },
  defaultProps: {
    variant: "secondary",
  },
});
