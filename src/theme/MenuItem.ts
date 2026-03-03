import { menuAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  item: {
    px: 3,
    py: 2,
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 500,
    color: "text",
    transition: "background-color 0.15s ease",

    _hover: {
      bg: mode("secondary.200", "primary.700")(props),
    },

    _focus: {
      bg: mode("secondary.200", "primary.700")(props),
    },

    _active: {
      bg: mode("secondary.300", "primary.800")(props),
    },

    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
}))

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
})
