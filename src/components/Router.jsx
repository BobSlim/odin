import { createBrowserRouter } from "react-router-dom";
import { MemoryCardGame } from './MemoryCardPage.jsx'
import { App } from './App';
import { Cv } from './Cv';

export const paths = createBrowserRouter([
    {
        path: "",
        element: <App />,
        title: "Home"
    },
    {
        path: "careers",
        element: <Cv />,
        title: "Careers",
    },
    {
        path: "game",
        element: <MemoryCardGame />,
        title: "Game",
    }
])

export const NavBar = () =>
    <nav>
        {paths.map(route => <Link to={route.path}>{route.title}</Link>)}
    </nav>