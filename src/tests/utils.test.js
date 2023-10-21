import { displayPrice, findIndexById, findObjectById } from "@/components/utils";
import { describe, it, expect } from "vitest";
import { Cart, getCartTotal, getSubTotal } from "@/components/cart";

describe("utils", () => {
    it("displayPrice", () => {
        expect(displayPrice(0)).toBe("$0.00")
        expect(displayPrice(1.1)).toBe("$1.10")
        expect(displayPrice(1.12)).toBe("$1.12")
        expect(displayPrice(-10)).toBe("-$10.00")
    })
    const mockArray = [
        {id: 0},
        {id: 2},
        {id: 5}
    ]
    it("finds", () => {
        expect(findIndexById(mockArray, 2)).toBe(1)
        expect(findObjectById(mockArray, 2)).toEqual({id: 2})
    })
})

describe("cart", () => {
    it("initializes", () => {
        const cart = Cart()
        expect(typeof cart).toBe("object")
        expect(cart.contents).toEqual([])
    })
    it("adds item", () => {
        const cart = Cart()
        cart.add({id: 0, quantity: 4})
        expect(cart.contents).toEqual([{id: 0, quantity: 4}])
        cart.add({id: 0, quantity: 5})
        expect(cart.contents).toEqual([{ id: 0, quantity: 9 }])
    })
    it("removes item", () => {
        const cart = Cart()
        cart.add({ id: 0, quantity: 4 })
        cart.remove(0)
        expect(cart.contents).toEqual([])
    })
    it("setsQuantity", () => {
        const cart = Cart()
        cart.setQuantity({ id: 0, quantity: 4 })
        expect(cart.contents).toEqual([{ id: 0, quantity: 4 }])
        cart.setQuantity({ id: 0, quantity: 5 })
        expect(cart.contents).toEqual([{ id: 0, quantity: 5 }])
    })
    it("correctly evaluates subtotal", () => {
        const fakeCart = [
            {id: 2, quantity: 3}
        ]
    })
})

describe("totalEvaluators", () => {
    const mockProducts = [
        {id: 0, price: 1},
        { id: 1, price: 2 },
        { id: 2, price: 3 }
    ]
    const mockCart = [
        {id: 2, quantity: 4},
        {id: 0, quantity: 2},
    ]

    it("subtotals", () => {
        const fn = getSubTotal(mockProducts)
        expect(fn(mockCart, 2)).toBe(12)
        expect(fn(mockCart, 0)).toBe(2)
    })
    it("totals", () => {
        const fn = getCartTotal(mockProducts)
        expect(fn(mockCart)).toBe(14)
    })
})