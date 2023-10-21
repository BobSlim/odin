import { Icon } from "@iconify/react"
import styles from "./Shop.module.css"
import { SpinnerInput } from "./SpinnerInput"
import { displayPrice, getData } from "./utils"
import { useOutletContext } from "react-router-dom"

export const Shop = () => {
    const [cart, setCart, products] = useOutletContext()
    return (
        <main>
            <h1>Shop!</h1>
            <section className={styles.products}>
                {products.map(product => <ItemDetails {...product} key={product.id} />)}
            </section>
        </main>
    )
}

const ItemDetails = ({ id = null, title = "NOTITLE", price = 0, image = "", description = "" }) =>
    <article className={styles.product}>
        <h3>{title}</h3>
        <div>
            <img src={image} alt={title} />
            <AddToCartForm /> {displayPrice(price)}
        </div>
    </article>

const AddToCartForm = () =>
    <form action="">
        <SpinnerInput inputName = "quantity"/>
        <button type="submit"><Icon icon="mdi:cart" />Add to Cart</button>
    </form>