import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import {Body} from "../src/components/Body.jsx"
import Signin from "../src/pages/Signin.jsx"
import Signup from "../src/pages/Signup.jsx"
import { Products } from './components/Products.jsx'
import { Profile } from './components/Profile.jsx'
import { Wishlist } from './components/Wishlist.jsx'
import { Cart } from './components/Cart.jsx'
import { ProductDetails } from './components/ProductDetails.jsx'
import AuthRoute from './components/AuthRoute.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<AuthRoute><Homepage/></AuthRoute>,
    children:[
      {
        path:"",
        element:<Body/>
      },
      {
        path:"products",
        element:<Products/>,
        children:[
          {
            path:":category",
            element:<Products></Products>
          }
        ]
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"wishlist",
        element:<Wishlist/>
      },
      {
        path:"cart",
        element:<Cart></Cart>
      },
      {
        path:"productDetails/:productId",
        element:<ProductDetails></ProductDetails>
      }
    ]
  },
  {
    path:"/signin",
    element:<Signin/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
