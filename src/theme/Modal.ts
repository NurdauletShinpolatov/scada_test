import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: '16px',
    bgColor: 'dark.400',
  },
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})
