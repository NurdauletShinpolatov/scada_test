import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  label: { width: '100%' },
  control: {
    _checked: {
      bg: 'primary',
      borderColor: 'primary',
      rounded: 4,
      _hover: { bg: 'primary.600', borderColor: 'primary.600' },
    },
  },
})

export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
