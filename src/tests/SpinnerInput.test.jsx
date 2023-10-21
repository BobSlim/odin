import { SpinnerInput } from "@/components/SpinnerInput"
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event"

describe("Spinner", () => {
    let container
    let user
    beforeEach(() => {
        container = render(<SpinnerInput />).container;
        user = userEvent.setup()
    })
    it("renders", () => {
        expect(container).toMatchSnapshot();
    })
    it("accepts input", async () => {
        const input = screen.getByRole("spinbutton", { name: "" })
        await user.type(input, "123")
        expect(input.value).toMatch("123")
        await user.clear(input)
        await user.type(input, "-1")
        fireEvent.blur(input)
        expect(input.value).toMatch("0")
    })
    it("increments", async () => {
        const button = screen.getByRole("button", {name: "+"})
        await user.click(button)
        expect(screen.getByRole("spinbutton", {name: ""}).value).toMatch("1")
    })
    it("decrements", async () => {
        const input = screen.getByRole("spinbutton", { name: "" })
        const button = screen.getByRole("button", { name: "-" })
        await user.type(input, "2")
        await user.click(button)
        expect(screen.getByRole("spinbutton", { name: "" }).value).toMatch("1")
        await user.click(button)
        expect(screen.getByRole("spinbutton", { name: "" }).value).toMatch("0")
        await user.click(button)
        expect(screen.getByRole("spinbutton", { name: "" }).value).toMatch("0")
    })
})