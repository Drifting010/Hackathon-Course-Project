import CountrySelect, { countries } from '../../src/Components/countrySelect';
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

// Describe a test suite for the CountrySelect component
describe("CountrySelect component", () => {

    // Test case: Check if the Autocomplete component is rendered correctly
    it("renders the Autocomplete component correctly", () => {
        render(<CountrySelect />);
        const autocomplete = screen.getByRole('combobox', { name: /choose a country/i });
        expect(autocomplete).toBeInTheDocument();
    });

    // Test case: Check if all country options are rendered when clicked
    it("renders all country options when clicked", () => {
        render(<CountrySelect />);
        fireEvent.mouseDown(screen.getByRole('combobox', { name: /choose a country/i }));

        countries.forEach((country) => {
            const option = screen.queryByText(`${country.label} (${country.code})`);
            expect(option).toBeInTheDocument();
        });
    });

    

});
