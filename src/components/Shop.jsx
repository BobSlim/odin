import { Icon } from "@iconify/react"
import { getData } from "./App"
import { useEffect, useState } from "react"

export const Shop = () => {
    const [products, setProducts] = useState([])

    const loadData = async () => {
        const data = await getData('https://fakestoreapi.com/products')
        setProducts(data)
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <main>
            <h2>Shop!</h2>
            <section className="shopCards">
                {products.map(product => <ItemDetails {...product} key={product.id} />)}
            </section>
        </main>
    )
}

const ItemDetails = ({ title = "NOTITLE", price = 0, image = "", description = "" }) =>
    <article className="card card_shop">
        <h3 className="card_shop_header">{title}</h3>
        <div className="card_shop_main">
            <img src={image} alt="" />
            <p>{price}</p>
            <AddToCartForm />
        </div>
        <div className="card_shop_description">
            <p>{description}</p>
        </div>
    </article>

const AddToCartForm = () =>
    <form action="">
        <label htmlFor="quantity">#:<input type="number" name="quantity" /></label>
        <button type="submit"><Icon icon="mdi:cart" />Add to Cart</button>
    </form>