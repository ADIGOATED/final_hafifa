import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Inbox from 'src/pages/inbox/Inbox'
import Outbox from 'src/pages/outbox/Outbox'
import RouteError from 'src/pages/routeError/RouteError'
import { Message } from 'src/pages/message/Message'
import Layout from 'src/layout/Layout'
import SignIn from 'src/pages/signIn/SignIn'
import { AuthProvider } from 'src/context/AuthContext'
import PrivateRoute from 'src/components/PrivateRoutes/PrivateRoutes'

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         {
            path: 'inbox',
            element: <PrivateRoute element={<Inbox />} />,
            errorElement: <RouteError />,
         },
         {
            path: 'outbox',
            element: <PrivateRoute element={<Outbox />} />,
         },
         {
            path: 'inbox/:messageId',
            element: <PrivateRoute element={<Message />} />,
            errorElement: <RouteError />,
         },
         {
            path: 'outbox/:messageId',
            element: <PrivateRoute element={<Message />} />,
            errorElement: <RouteError />,
         },
         {
            path: 'signIn',
            element: <SignIn />,
            errorElement: <RouteError />,
         },
         {
            path: 'signUp',
            element: <SignIn page='signUp' />,
            errorElement: <RouteError />,
         },
      ],
   },
])

ReactDOM.render(
   <React.StrictMode>
      <AuthProvider>
         <RouterProvider router={router} />
      </AuthProvider>
   </React.StrictMode>,
   document.getElementById('root')
)
