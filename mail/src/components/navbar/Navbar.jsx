import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, useLocation } from 'react-router-dom'
import goatImage from '/assets/goat.png'
import { makeStyles } from '@mui/styles'

const pages = ['inbox', 'outbox']
const settings = ['Profile', 'Logout']
const title = 'GoatMail'

const useStyles = makeStyles(() => {
   return {
      disableLinkStyle: {
         color: 'inherit',
         textDecoration: 'inherit',
      },
      pressedButton: {
         textDecoration: 'underline',
         fontWeight: 'bold',
         color: 'red',
      },
   }
})

export default function ResponsiveAppBar() {
   const [anchorElNav, setAnchorElNav] = useState(null)
   const [anchorElUser, setAnchorElUser] = useState(null)
   const [pressedButton, setPressedButton] = useState()
   const location = useLocation()
   const classes = useStyles()

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget)
   }

   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
   }

   const handleCloseNavMenu = () => {
      setAnchorElNav(null)
   }

   const handleCloseUserMenu = () => {
      setAnchorElUser(null)
   }

   useEffect(() => {
      const currentPage = location.pathname.split('/')[1]
      console.log(location.pathname.split('/')[1]);
      setPressedButton(currentPage)
   }, [location])

   return (
      <AppBar position="sticky">
         <Container maxWidth="xxl">
            <Toolbar disableGutters>
               <img style={{ width: '45px', marginRight: '10px' }} src={goatImage} alt=" " />
               <Typography
                  variant="h6"
                  sx={{
                     mr: 3,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.2rem',
                     cursor: 'default',
                  }}
               >
                  {title}
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                     {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                           <Typography>{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <Typography
                  variant="h5"
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.2rem',
                     cursor: 'default',
                  }}
               >
                  {title}
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                     <Link key={`/${page}`} to={`/${page}`} className={[classes.disableLinkStyle]}>
                        <Button
                           key={page}
                           sx={
                              pressedButton == page
                                 ? { my: 2, color: 'white', display: 'block', fontSize: '1.2rem', fontWeight: 'bold' }
                                 : { my: 2, color: 'white', display: 'block', fontSize: '1.2rem', fontWeight: '300' }
                           }
                        >
                           {page}
                        </Button>
                     </Link>
                  ))}
               </Box>
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src="/static/images/avatar/2.jpg" />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: '45px' }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   )
}
