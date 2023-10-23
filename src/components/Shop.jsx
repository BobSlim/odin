import { Icon } from "@iconify/react"
import styles from "./Shop.module.css"
import { SpinnerInput } from "./SpinnerInput"
import { displayPrice, findObjectById, getFormData } from "./utils"
import { useOutletContext } from "react-router-dom"
import { LoadingSpinner } from "./LoadingSpinner"
import { setItem } from "./cart"
import { useState } from "react"

export const Shop = () => {
    const [cart, setCart, products] = useOutletContext()

    const addToCart = (basket) => {
        setCart(setItem(cart, basket))
    }

    return (
        <main>
            <h1>Shop!</h1>
            {products.length ?
                <section className={styles.products}>
                    {products.map(product =>
                        <ItemDetails {...product} key={product.id}>
                            <AddToCartForm id={product.id} addCartItem={addToCart} />
                        </ItemDetails>
                    )}
                </section>
                :
                <LoadingSpinner />
            }
        </main>
    )
}

export const Checkout = () => {
    const [cart, setCart, products] = useOutletContext()

    const addToCart = (basket) => {
        setCart(setItem(cart, basket))
    }

    return (
        <main>
            <h1>Your Cart</h1>
            {products.length ?
                <section className={styles.products}>
                    {cart.map(basket => {
                        const product = findObjectById(products, basket.id)
                        return (
                            <ItemDetails {...product} key={basket.id}>
                                <AddToCartForm id={basket.id} addCartItem={addToCart} />
                            </ItemDetails>
                        )
                    })}
                    
                </section>
                :
                <LoadingSpinner />
            }
        </main>
    )
}

export const ItemDetails = ({ id = null, title = "NOTITLE", price = 0, image = "", description = "", children }) =>
    <article className={styles.product}>
        <h3>{title}</h3>
        <div>
            <img src={image} alt={title} />
            {displayPrice(price)}
            {children}
        </div>
    </article>

export const AddToCartForm = ({
        id, 
        fn = (...args) => console.log(args)
    }) => {
    const [spinnerValue, setSpinnerValue] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const submitData = getFormData(e.target)
        if(submitData.quantity == ''){
            submitData.quantity = '1'
        }
        fn(submitData)
        e.target.reset()
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <SpinnerInput 
                inputName="quantity" 
                value={spinnerValue}
                setValue={setSpinnerValue}
            />
            <input type="hidden" name="id" value={id}/>
            <button type="submit"><Icon icon="mdi:cart" />Add to Cart</button>
        </form>
    )
}