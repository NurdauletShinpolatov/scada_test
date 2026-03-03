/* theme.ts */
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Button } from './Button'
import { Container } from './Container'
import { FormLabel } from './FormControl'
import { mode } from '@chakra-ui/theme-tools'
import { modalTheme } from './Modal'
import { cardTheme } from './Card'
import { menuTheme } from './Menu'
import { popoverTheme } from './Popover'
import { drawerTheme } from './Drawer'
import { IconButton } from './IconButton'
import { checkboxTheme } from './Checkbox'
import { Alert } from './Alert'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
    Card: cardTheme,
    Button,
    IconButton,
    Container,
    Alert,
    FormLabel,
    Modal: modalTheme,
    Menu: menuTheme,
    Popover: popoverTheme,
    Drawer: drawerTheme,
  },
  colors: {
    paper: {
      light: {
        100: '#F5F6FA',
        200: '#F2F4F7',
        300: '#F2F3F7',
        400: '#EEEEEE',
        500: '#F5F6FA',
        800: '#1A1A1A',
      },
      dark: {
        100: '#7676803D',
        200: '#636366',
        300: '#454545',
        400: '#333333',
        500: '#292929',
        800: '#222222',
      },
    },
    primary: {
      default: '#38bdf8',
      100: "#d0f2ff",
      200: "#a1e4ff",
      300: "#72d6ff",
      400: "#43c8ff",
      500: "#38bdf8", // base
      600: "#2e9acb",
      700: "#22769e",
      800: "#165272",
      900: "#0b2935",
    },
    dark: {
      default: '#0F172A',
      100: "#d6d9e0",
      200: "#adafc1",
      300: "#3e4e68",
      400: "#1E293B",
      500: "#0F172A", // base
      600: "#0c1322",
      700: "#091019",
      800: "#060b11",
      900: "#030508",
    },
    secondary: {
      default: '#47b12e',
      100: "#daf3c7",
      200: "#b5e99f",
      300: "#8ee077",
      400: "#68d64f",
      500: "#47b12e", // base
      600: "#389225",
      700: "#2b731c",
      800: "#1e5413",
      900: "#11360a",
    },
    yellow: {
      400: '#FFD301',
      500: '#FFD301',
    },
    gray: {
      300: '#EAECF0',
      400: '#A5A5A5',
      500: '#667085',
      600: '#475467',
      700: '#344054',
    },
    text: '#fff',
    text_secondary: '#8C929F',
    border: '#E5E5E5',
    error: '#EC5962',
    success: '#3FD75B',
  },
  semanticTokens: {
    colors: {
      primary: 'primary.500',
      secondary: 'secondary.500',
      dark: 'dark.500',
    }
  },  
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: 'body',
        color: 'text',
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: mode('#A5A5A5', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),
  },
  config,
})
