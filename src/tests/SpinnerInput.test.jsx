import { SpinnerInput } from "@/components/SpinnerInput"
import { render, screen } from '@testing-library/react';
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
        expect(screen.getByRole("spinbutton", { name: "" }).value).toMatch("123")
    })
    it("increments", async () => {
        const button = screen.getByRole("button", {name: "+"})
        await user.click(button)
        expect(screen.getByRole("spinbutton", {name: ""}).value).toMatch("1")
    })
    it("decrements", async () => {
        const input = screen.getByRole("spinbutton", { name: "" })
        const button = screen.getByRole("button", { name: "-" })
        await user.type(input, "3")
        await user.click(button)
        expect(screen.getByRole("spinbutton", { name: "" }).value).toMatch("2")
    })
})