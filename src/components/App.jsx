import { Icon } from "@iconify/react"
import { Outlet, Link } from "react-router-dom"
import { setItem, removeItem } from "./cart"
import { useState, useEffect } from "react"
import { getData } from "./utils"

const NavBar = ({children}) =>
    <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/careers"><button>Careers</button></Link>
        <Link to="/game"><button>Game</button></Link>
        <Link to="/shop"><button>Shop</button></Link>
        {children}
    </nav>

const CartButton = ({ items = 0 }) =>
    <Link to="/cart">
        <button>
            <Icon icon="mdi:cart"></Icon>
            {items}
        </button>
    </Link>

export const App = () => {
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])

    const loadData = async () => {
        const data = await getData('https://fakestoreapi.com/products')
        setProducts(data)
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <NavBar>
                <CartButton items={cart.length == 0 ? 0 : cart.map(basket => basket.quantity).reduce((acc, obj) => parseInt(acc) + parseInt(obj))} />
            </NavBar>
            <Outlet context={[cart, setCart, products]}/>
        </>
    )
}