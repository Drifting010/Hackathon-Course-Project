import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import RegisterProfileParticipant from '../../src/pages/onboardingPages/registerProfileParticipant';
import { countries } from "../../src/Components/countrySelect";

// Describe a test suite for the RegisterProfileParticipant component
describe("RegisterProfileParticipant", () => {

    // Test case: Check if the component renders all elements correctly
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getByRole, getByLabelText } = render(<RegisterProfileParticipant />);

        // Test text fields render user input correctly
        it("text fields render user input correctly", () => {
            const inputValues = [
                "Test Username",
                "Test Country",
                "Test Description",
            ];

            const textFields = screen.getAllByRole("textbox");
            expect(textFields).toHaveLength(3);

            textFields.forEach((textField, index) => {
                fireEvent.change(textField, { target: { value: inputValues[index] } });
                expect(textField.value).toBe(inputValues[index]);
            });
        });

        // Test Participant Proceed button
        const proceedButton = screen.getByRole("link", { name: /participant proceed/i });
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

    // Test case: Check if the 'Participant Proceed' button is disabled when the form is invalid
    it("disables 'Participant Proceed' button when form is invalid", () => {
        // Render the component
        render(<RegisterProfileParticipant />);

        // Get the 'Participant Proceed' button
        const proceedButton = screen.getByRole("link", { name: /participant proceed/i });

        // Ensure the button is initially disabled
        expect(proceedButton).toHaveAttribute("aria-disabled", "true");

        // Fill in the username and description but leave the country empty (invalid form)
        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Test Description" } });

        // The button should still be disabled as the form is not valid
        expect(proceedButton).toHaveAttribute("aria-disabled", "true");
    });

});

