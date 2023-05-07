import React from "react";
import AccountSetting from "../../src/pages/participantPages/account"
import { render, fireEvent } from "@testing-library/react";

describe("AccountSetting", () => {
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getByRole, getAllByRole, getAllByText } = render(<AccountSetting />);

        // Test textfields - Check if the two TextFields can correctly render the user's input data
        it("text fields render user input correctly", () => {
            const inputValues = ["This is a password", "This is a confirmation"];

            const textFields = getAllByRole("textbox");
            expect(textFields).toHaveLength(2);

            textFields.forEach((textField, index) => {
                fireEvent.change(textField, { target: { value: inputValues[index] } });
                expect(textField.value).toBe(inputValues[index]);
            });
        });

        // Test buttons - tests the presence and content of the buttons
        const buttonLabels = ["Cancel", "Save"];
        const buttons = getAllByRole("button");
        expect(buttons).toHaveLength(4); // There are 4 buttons, including the two IconButton components

        buttonLabels.forEach((label) => {
            expect(getAllByText(new RegExp(label, "i"))).toHaveLength(1);
        });

        // Test password visibility toggle - Check if the password visibility is toggled correctly when the IconButton is clicked
        it("toggles password visibility correctly", () => {
            const passwordField = getByRole("textbox", {
                name: /change password/i,
            });
            const confirmPasswordField = getByRole("textbox", {
                name: /double confirm/i,
            });

            fireEvent.change(passwordField, {
                target: { value: "testPassword" },
            });
            fireEvent.change(confirmPasswordField, {
                target: { value: "testConfirmPassword" },
            });

            const togglePasswordVisibilityButtons = getAllByRole("button", {
                name: /toggle password visibility/i,
            });

            togglePasswordVisibilityButtons.forEach((button) => {
                fireEvent.click(button);
            });

            expect(passwordField).toHaveAttribute("type", "text");
            expect(confirmPasswordField).toHaveAttribute("type", "text");
        });
    });
});