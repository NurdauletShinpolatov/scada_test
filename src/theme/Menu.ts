import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  list: {
    // this will style the MenuList component
    borderRadius: '2xl',
    bgColor: 'white',
    _dark: {
      bgColor: 'paper.dark.500',
    },
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    bgColor: 'white',
    border: 'none',
    outline: 'none',
    _dark: {
      bgColor: 'paper.dark.500',
    },
    _hover: {
      bgColor: 'paper.light.400',
      outline: 'none',
      _dark: {
        bgColor: 'paper.dark.400',
      },
    },
    _focus: {
      outline: 'none',
      bgColor: 'paper.light.400',
      _dark: {
        bgColor: 'paper.dark.400',
      },
    },
  },
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })
