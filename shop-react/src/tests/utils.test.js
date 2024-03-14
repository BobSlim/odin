import { displayPrice, findIndexById, findObjectById } from "@/components/utils";
import { describe, it, expect } from "vitest";
import { setItem, removeItem, getCartTotal, getSubTotal } from "@/components/cart";

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
    it("sets item", () => {
        let cart = []
        cart = setItem(cart, {id: 0, quantity: 4})
        expect(cart).toEqual([{ id: 0, quantity: 4 }])

    })
    it("overwrites set item", () => {
        let cart = [{id: 0, quantity: 2}]
        cart = setItem(cart, { id: 0, quantity: 5 })
        expect(cart).toEqual([{ id: 0, quantity: 5 }])
    })

    it("removes item", () => {
        let cart = [{id: 0}]
        cart = removeItem(cart, 0)
        expect(cart).toEqual([])
    })
    
    const mockProducts = [
        { id: 0, price: 1 },
        { id: 1, price: 2 },
        { id: 2, price: 3 }
    ]
    const mockCart = [
        { id: 2, quantity: 4 },
        { id: 0, quantity: 2 },
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