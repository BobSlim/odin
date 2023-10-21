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
            <h1>Shop!</h1>
            <section className={styles.products}>
                {products.map(product => <ItemDetails {...product} key={product.id} />)}
            </section>
        </main>
    )
}

const decimalize = (number = 0, places = 2) => {
    number = number.toString()
    const decimalPlace = number.indexOf(".")
    if (decimalPlace == -1) {
        return number + ".00"
    }
    const addedZeroes = (places + 1) - number.slice(decimalPlace).length
    return number + "0".repeat(addedZeroes)
}

const displayPrice = (price = 0) =>
    "$"+decimalize(price)


const ItemDetails = ({ title = "NOTITLE", price = 0, image = "", description = "" }) =>
    <article className={styles.product}>
        <h3>{title}</h3>
        <div>
            <img src={image} alt="" />
            <AddToCartForm /> {displayPrice(price)}
        </div>
    </article>

const AddToCartForm = () =>
    <form action="">
        <SpinnerInput inputName = "quantity"/>
        <button type="submit"><Icon icon="mdi:cart" />Add to Cart</button>
    </form>

const SpinnerInput = ({ inputName }) => {
    const [value, setValue] = useState("");
    
    const handleClick = (number) => (event) => {
        event.preventDefault()
        validSetValue(parseInt(value ? value : 0) + number)
    }

    const validSetValue = (number) =>{
        const newValue = parseInt(Math.max(1, number)).toString()
        setValue(newValue)
    }

    return (
        <div className={styles.spinner}>
            <button onClick={handleClick(-1)}>-</button>
            <input 
                type="number" 
                name={inputName}
                min="0"
                value={value} 
                onChange={e => setValue(e.target.value)} 
                onBlur={e => validSetValue(e.target.value)}
            />
            <button onClick={handleClick(+1)}>+</button>
        </div>
    )
}