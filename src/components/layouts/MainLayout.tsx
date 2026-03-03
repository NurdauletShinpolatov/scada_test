import { Box, SimpleGrid } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const MainLayout = () => {
  return (
    <SimpleGrid gridTemplateColumns="250px 1fr" w='100vw' bg='dark'>
      <Sidebar />
      <Box maxH='100vh' overflowX='hidden' overflowY='auto'>
        <Outlet />
      </Box>
    </SimpleGrid>
  )
}

export default MainLayout
