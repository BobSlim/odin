import { findIndexById, findObjectById } from "./utils"

export const setItem = (cart, { id, quantity }) => {
    const itemIndex = findIndexById(cart, id)
    if (itemIndex == -1) {
        return [...cart, { id, quantity }]
    }
    const newCart = [...cart]
    newCart[itemIndex].quantity = quantity
    return newCart
}

export const removeItem = (cart, id) =>
    [...cart.toSpliced(findIndexById(cart, id), 1)]

export const getSubTotal = (products) => (cart, id) =>
    findObjectById(cart, id).quantity * findObjectById(products, id).price

export const getCartTotal = (products) => (cart) =>
    cart.map(basket => getSubTotal(products)(cart, basket.id)).reduce((a, x) => a + x, 0)