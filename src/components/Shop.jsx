import { Icon } from "@iconify/react"
import styles from "./Shop.module.css"
import { SpinnerInput } from "./SpinnerInput"
import { displayPrice, getData, getFormData } from "./utils"
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

export const ItemDetails = ({ id = null, title = "NOTITLE", price = 0, image = "", description = "" }) =>
    <article className={styles.product}>
        <h3>{title}</h3>
        <div>
            <img src={image} alt={title} />
            <AddToCartForm id={id}/> {displayPrice(price)}
        </div>
    </article>

export const AddToCartForm = ({id, addCartItem = (...args) => console.log(args)}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const submitData = getFormData(e.target)
        if(submitData.quantity == ''){
            submitData.quantity = '1'
        }
        addCartItem(submitData)
        e.target.reset()
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <SpinnerInput inputName="quantity" />
            <input type="hidden" name="id" value={id}/>
            <button type="submit" ><Icon icon="mdi:cart" />Add to Cart</button>
        </form>
    )
}