import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MemoryCardGame } from './components/MemoryCardGame.jsx'
import { App } from './components/App';
import { Careers } from './components/Careers';
import { Shop } from './components/Shop';
import { Home } from './components/Home';
import { Checkout } from './components/Checkout';

const paths = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "game",
        element: <MemoryCardGame />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Checkout />,
      },

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={paths} />
  </React.StrictMode>,
)
