import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import 'react-phone-number-input/style.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import Router from './router'

const queryClient = new QueryClient()

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ChakraProvider>
        </QueryClientProvider>
      </div>
    </Suspense>
  )
}

export default App
