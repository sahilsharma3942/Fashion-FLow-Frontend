// src/App.jsx
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import { Body } from './components/Body.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import { Products } from './components/Products.jsx';
import { Profile } from './components/Profile.jsx';
import { Wishlist } from './components/Wishlist.jsx';
import { Cart } from './components/Cart.jsx';
import { ProductDetails } from './components/ProductDetails.jsx';
import AuthRoute from './components/AuthRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Homepage /></AuthRoute>,
    children: [
      {
        path: '',
        element: <Body />
      },
      {
        path: 'products',
        element: <Products />,
        children: [
          {
            path: ':category',
            element: <Products />
          }
        ]
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'wishlist',
        element: <Wishlist />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'productDetails/:productId',
        element: <ProductDetails />
      }
    ]
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

const App = () => {
    const RENDER_SERVER_URL = 'https://fashion-flow-backend.onrender.com/api/v1/health';
    const INTERVAL = 300000; // 5 minutes in milliseconds

    useEffect(() => {
        function sendHeartbeat() {
          fetch(RENDER_SERVER_URL)
            .then(response => {
              if (response.ok) {
                console.log(`${new Date().toISOString()}: Render server is alive.`);
              } else {
                console.error(`${new Date().toISOString()}: Failed to reach render server. Response code: ${response.status}`);
              }
            })
            .catch(error => {
              console.error(`${new Date().toISOString()}: Error reaching render server: ${error}`);
            });
        }
    
        const intervalId = setInterval(sendHeartbeat, INTERVAL);
        sendHeartbeat(); // Initial call
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);


  return (
    <RouterProvider router={router} />
  );
};

export default App;
