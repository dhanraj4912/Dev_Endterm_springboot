
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const appRouter=createBrowserRouter([
 
  {
    path:'/',
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        path:'/',
        element: <Body/>
      },
      {
        path:'/about',
        element: <About/>
      },
     
      {
        path:'/signin',
        element: <Signin/>
      },
      {
        path:'/cart',
        element: <Cart/>
      },
      {
        path:'/help',
        element: <Help />
      },
      {
        path:'/offer',
        element: <Offer />
      },
      
    ]
  }
  
]);
createRoot(document.getElementById('root')).render(
 <RouterProvider router={ appRouter} >
  <App />
 </RouterProvider>
)
