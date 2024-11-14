import { axiosInstance } from 'src/api/axiosInstance'
import { HttpStatusCode } from 'axios'

class MessagesApi {
   async messagesInboxPreview(userId) {
      try {
         const response = await axiosInstance.get(`message/inbox/${userId}`)

         console.log(response.data);

         return response.data
      } catch (error) {
         console.log("handle no messages / error");
      }
   }

}

export default new MessagesApi()
