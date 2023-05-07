import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EditProfile from "../../src/pages/participantPages/editProfile";

describe("EditProfile", () => {
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getByRole, getAllByRole, getByLabelText } = render(<EditProfile />);

        // Test text fields render user input correctly
        it("text fields render user input correctly", () => {
            const inputValues = [
                "Username Input",
                "First Name Input",
                "Last Name Input",
                "Bio Input",
            ];

            const textFields = getAllByRole("textbox");
            expect(textFields).toHaveLength(4);

            textFields.forEach((textField, index) => {
                fireEvent.change(textField, { target: { value: inputValues[index] } });
                expect(textField.value).toBe(inputValues[index]);
            });
        });

        // Test buttons - tests the presence and content of the buttons
        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        expect(cancelButton).toBeInTheDocument();

        const saveButton = screen.getByRole("button", { name: /save/i });
        expect(saveButton).toBeInTheDocument();

        // Test avatar upload
        it("avatar upload works correctly", () => {
            const file = new File(["(⌐□_□)"], "chucknorris.png", {
                type: "image/png",
            });

            const fileReader = FileReader.prototype.readAsDataURL;
            FileReader.prototype.readAsDataURL = jest.fn();

            const avatarInput = getByLabelText("upload picture");
            fireEvent.change(avatarInput, { target: { files: [file] } });

            expect(FileReader.prototype.readAsDataURL).toHaveBeenCalledWith(file);
            FileReader.prototype.readAsDataURL = fileReader;
        });

        // Test the CountrySelect component
        it('renders CountrySelect component', () => {
            // Check if label is rendered
            const label = screen.getByLabelText(/choose a country/i);
            expect(label).toBeInTheDocument();

            // Check if Autocomplete is rendered
            const autocomplete = screen.getByRole('textbox');
            expect(autocomplete).toBeInTheDocument();
        });
        // Test if the options are rendered correctly
        it('renders all country options', () => {
            // Check if all options are rendered
            countries.forEach((country) => {
                const option = screen.queryByText(`${country.label} (${country.code})`);
                expect(option).toBeInTheDocument();
            });
        });

    });
});
