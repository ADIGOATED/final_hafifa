import { Typography } from '@mui/material'
import Navbar from 'src/components/navbar/Navbar'
import { Card, CardContent, CardActions, Button, TextField } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const TITLE_MIN_LENGTH = 3

const Message = () => {
   const [showReplySection, setShowReplySection] = useState(false)
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   const { state } = useLocation()
   const message = state.message

   const onSubmit = (data) => {
      console.log(`this reply sent by ${message.recipient.mail} to ${message.sender.mail} ${(data.title, data.text)}`)
   }
   console.log(errors)

   return (
      <>
         <Typography variant="h4" textAlign={'center'} marginTop={5} marginBottom={2}>
            from- {message.sender.fname} {message.sender.lname}
         </Typography>

         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '7vh' }}>
            <Card sx={{ width: '90vw' }}>
               <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                     {message.sender.mail}
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                     {message.createdAt}
                  </Typography>
                  <Typography variant="h5" component="div" marginBottom={5}>
                     {message.title}
                  </Typography>
                  <Typography>{message.text}</Typography>
               </CardContent>
               <CardActions>
                  <Button
                     onClick={() => setShowReplySection(true)}
                     endIcon={<ReplyIcon sx={{ transform: 'scaleX(-1)', marginBottom: 0.5 }}></ReplyIcon>}
                  >
                     reply to {message.sender.fname}
                  </Button>
               </CardActions>
            </Card>
         </div>
         {/* reply section */}
         <div
            style={{
               display: showReplySection ? 'flex' : 'none',
               justifyContent: 'center',
               marginBottom: 30,
            }}
         >
            <Card sx={{ width: '90vw' }}>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                     <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        to- {message.sender.mail}
                     </Typography>
                     <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                           {...register('title', {
                              required: 'title is required',
                              minLength: {
                                 value: TITLE_MIN_LENGTH,
                                 message: `title needs to be at least ${TITLE_MIN_LENGTH} characters`,
                              },
                           })}
                           sx={{ width: '30vw' }}
                           label="Title"
                           multiline
                           maxRows={4}
                        />
                        <Typography marginTop={1} marginBottom={4.5}>
                           {errors.title?.message}
                        </Typography>
                        <TextField
                           {...register('text', {
                              required: 'message is required',
                           })}
                           label="message"
                           multiline
                           rows={7}
                        />
                        <Typography marginTop={1.5}>{errors.text?.message}</Typography>
                     </div>
                  </CardContent>
                  <CardActions>
                     <Button type="submit" endIcon={<SendIcon />}>
                        send
                     </Button>
                  </CardActions>
               </form>
            </Card>
         </div>
      </>
   )
}

export { Message }
