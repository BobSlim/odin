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
            Shop!!
            <section className="cards">
                {products.map(product => <ItemDetails {...product} />)}
            </section>
        </main>
    )
}

const ItemDetails = ({ title = "NOTITLE", price = 0, image = "", description = "" }) =>
    <article className="card">
        <img src={image} alt="" />
        <p>{price}</p>
        <AddToCartForm />
        <h3>{title}</h3>
        <p>{description}</p>
    </article>

const AddToCartForm = () =>
    <form action="">
        <label htmlFor="quantity">#:<input type="number" name="quantity" /></label>
        <button type="submit"><Icon icon="mdi:cart" />Add to Cart</button>
    </form>