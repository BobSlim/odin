import { Outlet, Link } from "react-router-dom"

const NavBar = () =>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/game">Game</Link>
        <Link to="/shop">Shop</Link>
    </nav>

export const App = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}