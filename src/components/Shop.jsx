import { Icon } from "@iconify/react"
import { getData } from "./App"
import { useEffect, useState } from "react"
import styles from "./Shop.module.css"

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
            <section className={styles.products}>
                {products.map(product => <ItemDetails {...product} key={product.id} />)}
            </section>
        </main>
    )
}

const displayPrice = (price = 0) => {
    price = price.toString()
    const decimalPlace = price.indexOf(".")
    if (decimalPlace == -1) {
        return price + ".00"
    }
    const addedZeroes = 3 - price.slice(decimalPlace).length
    return price + "0".repeat(addedZeroes)
}

const ItemDetails = ({ title = "NOTITLE", price = 0, image = "", description = "" }) =>
    <article className={styles.product}>
        <h3>{title}</h3>
        <div className={styles.main}>
            <img src={image} alt="" />
            <p>${displayPrice(price)}</p>
            <AddToCartForm />
        </div>
        <div className={styles.description}>
            <p>{description}</p>
        </div>
    </article>

const AddToCartForm = () =>
    <form action="">
        <label htmlFor="quantity">#:<input type="number" name="quantity" /></label>
        <button type="submit"><Icon icon="mdi:cart" />Add to Cart</button>
    </form>