import { AddToCartForm, Checkout } from '@/components/Checkout';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Outlet } from 'react-router-dom';
import { vi } from 'vitest';

describe('Checkout', () => {
    const spy = vi.fn()
    const mockContext = [
        [],
        spy,
        []
    ]
    it('renders', () => {
        const container = render(<Outlet context={mockContext}><Checkout /></Outlet>).container
        expect(container).toMatchSnapshot()
    });
});
