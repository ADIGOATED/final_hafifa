import React, { useState, useEffect } from 'react'
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles'
import GlobalStyles from '@mui/joy/GlobalStyles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { useForm } from 'react-hook-form'

const ColorSchemeToggle = (props) => {
   const { onClick, ...other } = props
   const { mode, setMode } = useColorScheme()
   const [mounted, setMounted] = useState(false)

   useEffect(() => setMounted(true), [])

   return (
      <IconButton
         aria-label="toggle light/dark mode"
         size="sm"
         variant="outlined"
         disabled={!mounted}
         onClick={(event) => {
            setMode(mode === 'light' ? 'dark' : 'light')
            if (onClick) onClick(event)
         }}
         {...other}
      >
         {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
   )
}

const customTheme = extendTheme({ defaultColorScheme: 'dark' })

export default function SignIn() {
   const [pageToShow, setPageToShow] = useState('signIn1')
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()

   const handleFormSubmit = (data) => {
      console.log(data)
   }

   return (
      <CssVarsProvider theme={customTheme} disableTransitionOnChange>
         <CssBaseline />
         <GlobalStyles
            styles={{
               ':root': {
                  '--Form-maxWidth': '800px',
                  '--Transition-duration': '0.4s',
               },
            }}
         />
         <Box
            sx={(theme) => ({
               width: { xs: '100%', md: '50vw' },
               transition: 'width var(--Transition-duration)',
               transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
               position: 'relative',
               zIndex: 1,
               display: 'flex',
               justifyContent: 'flex-end',
               backdropFilter: 'blur(12px)',
               backgroundColor: 'rgba(255 255 255 / 0.2)',
               [theme.getColorSchemeSelector('dark')]: {
                  backgroundColor: 'rgba(19 19 24 / 0.4)',
               },
            })}
         >
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100dvh',
                  width: '100%',
                  px: 2,
               }}
            >
               <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <ColorSchemeToggle />
               </Box>
               <Box
                  component="main"
                  sx={{
                     my: 'auto',
                     py: 2,
                     pb: 5,
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 2,
                     width: 400,
                     maxWidth: '100%',
                     mx: 'auto',
                     borderRadius: 'sm',
                     '& form': {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                     },
                     [`& .MuiFormLabel-asterisk`]: {
                        visibility: 'hidden',
                     },
                  }}
               >
                  <Stack sx={{ gap: 4, mb: 2 }}>
                     <Stack sx={{ gap: 1 }}>
                        <Typography component="h1" level="h3">
                           {pageToShow === 'signIn' ? 'Sign in' : 'Sign up'}
                        </Typography>
                        <Typography level="body-sm">
                           {pageToShow === 'signIn' ? 'New to GoatMail?' : 'Already has an account?'}{' '}
                           <Link
                              onClick={() => {
                                 console.log(pageToShow === 'signIn')
                                 pageToShow === 'signIn' ? setPageToShow('signUp') : setPageToShow('signIn')
                              }}
                           >
                              {pageToShow === 'signIn' ? 'Sign up!' : 'Sign in!'}
                           </Link>
                        </Typography>
                     </Stack>
                  </Stack>

                  <Divider
                     sx={(theme) => ({
                        [theme.getColorSchemeSelector('light')]: {
                           color: { xs: '#FFF', md: 'text.tertiary' },
                        },
                     })}
                  >
                     or
                  </Divider>
                  <Stack sx={{ gap: 4, mt: 2 }}>
                     <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        /* onSubmit={(event) => {
                           event.preventDefault()
                           const formElements = event.currentTarget.elements
                           const data = {
                              email: formElements.email.value,
                              password: formElements.password.value,
                           }
                           alert(JSON.stringify(data, null, 2))
                        }} */
                     >
                        <FormControl>
                           <FormLabel>Email</FormLabel>
                           <Input placeholder='example@gmail.com' {...register('email')} type="email" name="email" />
                        </FormControl>
                        <Typography>{errors.email?.message}</Typography>
                        <FormControl>
                           <FormLabel>Password</FormLabel>
                           <Input
                              {...register('password', {
                                 required: 'password is required*',
                                 minLength: {
                                    value: 7,
                                    message: 'password needs to be at least 7 characters',
                                 },
                              })}
                              type="password"
                              name="password"
                           />
                        </FormControl>
                        <Typography>{errors.password?.message}</Typography>
                        {pageToShow !== 'signIn' && (
                           <>
                              <FormControl>
                                 <FormLabel>first name</FormLabel>
                                 <Input
                                    {...register('fname', {
                                       required: 'first name is required*',
                                       minLength: {
                                          value: 2,
                                          message: 'first name needs to be at least 2 characters',
                                       },
                                    })}
                                    type="text"
                                 />
                              </FormControl>
                              <Typography>{errors.fname?.message}</Typography>
                              <FormControl>
                                 <FormLabel>last name</FormLabel>
                                 <Input
                                    {...register('lname', {
                                       required: 'last name is required*',
                                       minLength: {
                                          value: 2,
                                          message: 'last name needs to be at least 2 characters',
                                       },
                                    })}
                                    type="text"
                                 />
                              </FormControl>
                              <Typography>{errors.lname?.message}</Typography>
                           </>
                        )}
                        <Stack sx={{ gap: 4, mt: 2 }}>
                           <Button type="submit" fullWidth>
                              {pageToShow === 'signIn' ? 'Sign in' : 'Sign up'}
                           </Button>
                        </Stack>
                     </form>
                  </Stack>
               </Box>
               <Box component="footer" sx={{ py: 3 }}>
                  <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                     © GoatMail 2024
                  </Typography>
               </Box>
            </Box>
         </Box>
         <Box
            sx={(theme) => ({
               height: '100%',
               position: 'fixed',
               right: 0,
               top: 0,
               bottom: 0,
               left: { xs: 0, md: '50vw' },
               transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
               transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
               backgroundColor: 'background.level1',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundImage:
                  'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
               [theme.getColorSchemeSelector('dark')]: {
                  backgroundImage:
                     'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
               },
            })}
         />
      </CssVarsProvider>
   )
}
