import { axiosInstance } from 'src/api/axiosInstance'
import { HttpStatusCode } from 'axios'

class UserApi {
   async signIn(userDetails) {
      console.log(userDetails)
      try {
         const response = await axiosInstance({
            method: 'post',
            url: 'user/signin',
            data: userDetails,
         })

         return response.data
      } catch (error) {
         return { authorize: false }
      }
   }

   async signUp(userDetails) {
      try {
         const response = await axiosInstance({
            method: 'post',
            url: 'user/signup',
            data: userDetails,
         })

         return response.data
      } catch (error) {
         return { authorize: false }
      }
   }
}

export default new UserApi()
