import { displayPrice } from "@/components/utils";
import { describe, it, expect } from "vitest";

describe("utils", () => {
    it("displayPrice", () => {
        expect(displayPrice(0)).toBe("$0.00")
        expect(displayPrice(1.1)).toBe("$1.10")
        expect(displayPrice(1.12)).toBe("$1.12")
        expect(displayPrice(-10)).toBe("-$10.00")
    })
})