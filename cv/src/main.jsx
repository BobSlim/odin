import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MemoryCardGame } from './components/MemoryCardPage.jsx'
import { App } from './components/App';
import { Cv } from './components/Cv';

const paths = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "careers",
        element: <Cv />,
      },
      {
        path: "game",
        element: <MemoryCardGame />,
      },
      {
        path: "shop",
        element: <Cv />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={paths} />
  </React.StrictMode>,
)
