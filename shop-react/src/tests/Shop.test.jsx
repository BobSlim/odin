import { AddToCartForm, Shop } from '@/components/Shop';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Outlet } from 'react-router-dom';
import { vi } from 'vitest';

describe('Shop', () => {
    const spy = vi.fn()
    const mockContext = [
        [],
        spy,
        []
    ]
    it('renders', () => {
        const container = render(<Outlet context = {mockContext}><Shop /></Outlet>).container
        expect(container).toMatchSnapshot()
    });
});

describe('AddToCartForm', () => {
    let container
    let addButton
    let user
    let input
    let spy
    beforeEach(() => {
        spy = vi.fn()
        user = userEvent.setup()
        container = render(<AddToCartForm id = {2} fn = {spy}/>).container
        addButton = screen.getByRole('button', { name: 'Add to Cart' })
        input = screen.getByRole("spinbutton", { name: "" })
    })
    it('renders', () => {
        expect(container).toMatchSnapshot()
    })
    it('mocks', () => {
        spy()
        expect(spy).toHaveBeenCalled()
    })
    it('accepts bare', async () => {
        await user.click(addButton)
        expect(spy).toHaveBeenCalled()
        expect(spy).toHaveBeenCalledWith({id: "2", quantity: "1"})
    })
    it('accepts with input', async () => {
        input.value = "2"
        await user.click(addButton)
        expect(spy).toHaveBeenCalledWith({ id: "2", quantity: "2" })
    })

})