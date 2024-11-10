import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContext'

const PrivateRoute = ({ element }) => {
   const { isAuthenticated } = useAuth()
   const navigate = useNavigate()

   useEffect(() => {
      if (!isAuthenticated) {
         navigate('/SignIn')
      }
   }, [isAuthenticated, navigate])

   if (!isAuthenticated) {
      return null // Avoid rendering the protected component if not authenticated
   }

   return element
}

export default PrivateRoute
