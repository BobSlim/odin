import { App } from '@/components/App.jsx'
import { render, screen } from '@testing-library/react';


describe('App', () => {
    it('renders', () => {
        render(<App />);
        screen.debug();

        // check if App components renders headline
    });
});