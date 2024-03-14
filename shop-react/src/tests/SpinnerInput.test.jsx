import { SpinnerInput } from "@/components/SpinnerInput"
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event"
import { useState } from "react";

describe("Spinner", () => {
    let container
    let user
    let input
    let incButton
    let decButton

    const MockParent = () => {
        const [value, setValue] = useState()
        return (
            <SpinnerInput value={value} setValue={setValue}/>
        )
    }

    beforeEach(() => {
        container = render(<MockParent />).container;
        user = userEvent.setup()
        input = screen.getByRole("spinbutton", { name: "" })
        incButton = screen.getByRole("button", { name: "+" })
        decButton = screen.getByRole("button", { name: "-" })
    })
    it("renders", () => {
        expect(container).toMatchSnapshot();
    })
    it("accepts input", async () => {
        await user.type(input, "123")
        expect(input.value).toMatch("123")
    })
    it("resets input to 0", async () => {
        await user.type(input, "-1")
        fireEvent.blur(input)
        expect(input.value).toMatch("0")
    })

    it("increments", async () => {
        await user.click(incButton)
        expect(input.value).toMatch("1")
    })
    it("decrements", async () => {
        await user.type(input, "2")
        await user.click(decButton)
        expect(input.value).toMatch("1")
    })
    it("refuses to decrement below 0", async () => {
        await user.type(input, "1")
        await user.click(decButton)
        await user.click(decButton)
        expect(input.value).toMatch("0")
    })

})