import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => {
   return {
      overflow: {
         textWrap: 'nowrap',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
      },
      messageDimensions: {
         display: 'flex',
         backgroundColor: 'rgba(255, 255, 255)',
         height: '40px',
         borderWidth: '1px',
         borderColor: 'rgba(160, 160, 255, 0.2)',
         borderStyle: 'solid',
         alignItems: 'center',
         cursor: 'pointer',
         transition: 'box-shadow 0.3s',
         '&:hover': {
            boxShadow:
               'inset -1px 0 0 #dadce0, inset 1px 0 0 #dadce0, 0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15)',
            borderColor: 'rgba(160, 160, 255, 0.9)',
         },
      },
      disableLinkStyle: {
         color: 'inherit',
         textDecoration: 'inherit',
      },
   }
})

export default function MessagePreview({ message }) {
   const classes = useStyles()
   const navigate = useNavigate()
   const location = useLocation()

   const handleEmailClick = () => {
      navigate(`/${location.pathname.split('/')[1]}/${message.id}`, { state: { message: message } })
   }

   {
      /* get the msg id from url and query so that "open link in a new tab works" */
   }
   return (
      <Box onClick={handleEmailClick} className={classes.messageDimensions}>
         <Typography
            className={classes.overflow}
            sx={{
               width: '15vw',
               fontWeight: 'bold',
               marginLeft: '5%',
               marginRight: '2%',
            }}
         >
            {message.sender_fname} {message.sender_lname}
         </Typography>

         <Box sx={{ width: '60vw', display: 'flex', alignItems: 'center' }}>
            <Typography
               sx={{
                  fontWeight: 'bold',
                  marginRight: '1%',
                  whiteSpace: 'nowrap',
               }}
            >
               {message.title} -
            </Typography>
            <Typography className={classes.overflow} sx={{ marginRight: '10%' }}>
               {message.text}
            </Typography>
         </Box>

         <Typography
            className={classes.overflow}
            sx={{
               width: '10vw',
               marginRight: '2%',
            }}
         >
            {message.createdAt}
         </Typography>
      </Box>
   )
}
