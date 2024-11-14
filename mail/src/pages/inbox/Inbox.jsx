import { useEffect, useState } from 'react'
import messagesApi from 'src/api/messagesApi'
import MessagePreviewMui from 'src/components/messagePreviewMui/MessagePreviewMui'
//import { messages } from "src/users_messages";
import { useAuth } from 'src/context/AuthContext'

////// fetch all messages written by others to me

const fetchMessages = async (userId) => {
   const messages = await messagesApi.messagesInboxPreview(userId)

   return messages
}

export default function Inbox() {
   const { connectedUserId } = useAuth()
   const [messages, setMessages] = useState([])

   useEffect(async () => {
      const messages = await fetchMessages(connectedUserId)
      setMessages(messages)
   }, [connectedUserId])

   return (
      <>
         {messages.map((message) => (
            <MessagePreviewMui key={message.id} message={message} />
         ))}
      </>
   )
}
