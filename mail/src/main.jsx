import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Inbox from './pages/Inbox/Inbox.jsx'
import Outbox from './pages/outbox/Outbox.jsx'
import RouteError from './pages/routeError/RouteError.jsx'
import { Message } from './pages/message/Message.jsx'
import Layout from './layout/Layout'
import SignIn from './pages/signIn/SignIn'


const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         {
            path: 'Inbox',
            element: <Inbox />,
            errorElement: <RouteError />,
         },
         {
            path: 'Outbox',
            element: <Outbox />,
         },
         {
            path: 'Inbox/:messageId',
            element: <Message />,
            errorElement: <RouteError />,
         },
         {
          path: 'SignIn',
          element: <SignIn />,
          errorElement: <RouteError />,
       },
      ],
   },
])

ReactDOM.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>,
   document.getElementById('root')
)
