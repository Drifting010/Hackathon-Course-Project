import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import RegisterProfileHost from '../../src/pages/onboardingPages/registerProfileHost';
import { countries } from "../../src/Components/countrySelect";

// Describe a test suite for the RegisterProfileHost component
describe("RegisterProfileHost", () => {

    // Test case: Check if the component renders all elements correctly
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getByRole, getByLabelText } = render(<RegisterProfileHost />);

        // Test text fields render user input correctly
        it("text fields render user input correctly", () => {
            const inputValues = [
                "Test Organization",
                "Test Country",
                "Test Description",
                "https://www.testwebsite.com",
            ];

            const textFields = screen.getAllByRole("textbox");
            expect(textFields).toHaveLength(4);

            textFields.forEach((textField, index) => {
                fireEvent.change(textField, { target: { value: inputValues[index] } });
                expect(textField.value).toBe(inputValues[index]);
            });
        });

        // Test Host Proceed button
        const proceedButton = screen.getByRole("link", { name: /host proceed/i });
        expect(proceedButton).toBeInTheDocument();

        // Test the CountrySelect component
        it('renders CountrySelect component', () => {
            // Check if Autocomplete is rendered
            const autocomplete = screen.getByRole('textbox', { name: /country/i });
            expect(autocomplete).toBeInTheDocument();
        });

        // Test if the options are rendered correctly
        it('renders all country options', () => {
            fireEvent.mouseDown(screen.getByRole('textbox', { name: /country/i }));

            // Check if all options are rendered
            countries.forEach((country) => {
                const option = screen.queryByText(`${country.label} (${country.code})`);
                expect(option).toBeInTheDocument();
            });
        });
    });

    // Test case: Check if the 'Host Proceed' button is disabled when the form is invalid
    it("disables 'Host Proceed' button when form is invalid", () => {
        // Render the component
        render(<RegisterProfileHost />);

        // Get the 'Host Proceed' button
        const proceedButton = screen.getByRole("link", { name: /host proceed/i });

        // Ensure the button is initially disabled
        expect(proceedButton).toHaveAttribute("aria-disabled", "true");

        // Fill in the name, description, and website but leave the country empty (invalid form)
        fireEvent.change(screen.getByLabelText("Name of company / organization"), { target: { value: "Test Organization" } });
        fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Test Description" } });
        fireEvent.change(screen.getByLabelText("www.yourwebsite.com"), { target: { value: "https://www.testwebsite.com" } });

        // The button should still be disabled as the form is not valid
        expect(proceedButton).toHaveAttribute("aria-disabled", "true");
    });

});
