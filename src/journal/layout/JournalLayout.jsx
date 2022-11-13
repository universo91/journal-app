import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

export const JournalLayout = ({ children }) => {

    const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}  className='animate__animated animate__fadeIn animate__faster'>

        {/* Navbar drawerWidth */}
        <NavBar drawerWidth = { drawerWidth } />

        {/* Sidebar  drawerWidth */}
        <SideBar drawerWidth = { drawerWidth }/>
        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
          {/* Nos da un espacio para que no colapse con la parte superior */}
            <Toolbar />

          { children }

        </Box>

    </Box>
  )
}
