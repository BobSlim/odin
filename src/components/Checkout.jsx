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