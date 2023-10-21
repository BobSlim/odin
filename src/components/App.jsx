import { Icon } from "@iconify/react"
import { Outlet, Link } from "react-router-dom"
import { Cart } from "./cart"
import { useState } from "react"

const NavBar = () =>
    <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/careers"><button>Careers</button></Link>
        <Link to="/game"><button>Game</button></Link>
        <Link to="/shop"><button>Shop</button></Link>
        {children}
    </nav>

const CartButton = ({ items = 0 }) =>
    <button>
        <Icon icon="mdi:cart"></Icon>
        {items}
    </button>

export const App = () => {
    [Cart([]), setCart] = useState()
    return (
        <>
            <NavBar>
                <CartButton/>
            </NavBar>
            <Outlet />
        </>
    )
}