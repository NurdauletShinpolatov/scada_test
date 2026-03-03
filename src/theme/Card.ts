import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px 0px #5252521A',
    _dark: {
      backgroundColor: 'paper.dark.500',
    },
  },
})

export const cardTheme = defineMultiStyleConfig({ baseStyle })
