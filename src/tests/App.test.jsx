import { App } from '@/components/App.jsx'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe('App', () => {
    it('renders', () => {
        const container = render(<MemoryRouter><App /></MemoryRouter>).container
        expect(container).toMatchSnapshot()
    });
});