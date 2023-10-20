import { Icon } from "@iconify/react"
import { Outlet, Link } from "react-router-dom"

const NavBar = () =>
    <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/careers"><button>Careers</button></Link>
        <Link to="/game"><button>Game</button></Link>
        <Link to="/shop"><button>Shop</button></Link>
        <CartButton />
    </nav>

const CartButton = ({ items = 0 }) =>
    <button>
        <Icon icon="mdi:cart"></Icon>
        {items}
    </button>

export const getData = async (url, max = 0) => {
    const resp = await fetch(url);
    const json = await resp.json();
    const filtered = max ? json.slice(0, max) : json;
    return filtered;
}

export function shuffleArray(source) {
    let array = source.slice(0)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export const App = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}