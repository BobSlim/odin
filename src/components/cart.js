import { findIndexById, findObjectById } from "./utils"

export const Cart = (contents = []) => {
    const add = ({id, quantity}) => {
        const itemIndex = findIndexById(contents, id)
        if(itemIndex == -1){
            contents.push({ id, quantity })
            return
        }
        contents[itemIndex].quantity += quantity
    }

    const setQuantity = ({ id, quantity }) => {
        const itemIndex = findIndexById(contents, id)
        if (itemIndex == -1) {
            contents.push({ id, quantity })
            return
        }
        contents[itemIndex].quantity = quantity
    }

    const remove = (id) => {
        contents.splice(findIndexById(contents, id), 1)
    }


    return {
        contents,
        add,
        remove,
        setQuantity
    }
}

export const getSubTotal = (products) => (cart, id) =>
    findObjectById(cart, id).quantity * findObjectById(products, id).price

export const getCartTotal = (products) => (cart) =>
    cart.map(basket => getSubTotal(products)(cart, basket.id)).reduce((a, x) => a + x)