import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RegisterHackathons from "../../src/pages/participantPages/register";

describe("RegisterHackathons", () => {
  it("renders all elements correctly, all elements appeared on the page", () => {
    const { getAllByRole } = render(<RegisterHackathons />);

    // Test textfields - Check if the two TextFields can correctly render the user's input data
    it("text fields render user input correctly", () => {
      const { getAllByRole } = render(<RegisterHackathons />);

      const inputValues = ["This is what I do", "This is a description"];

      const textFields = getAllByRole("textbox");
      expect(textFields).toHaveLength(2);

      textFields.forEach((textField, index) => {
        fireEvent.change(textField, { target: { value: inputValues[index] } });
        expect(textField.value).toBe(inputValues[index]);
      });
    });

    // Test buttons - tests the presence and content of the buttons
    const buttonLabels = ["Cancel", "Register"];
    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(2);
    buttons.forEach((button, index) => {
      expect(button.textContent).toMatch(new RegExp(buttonLabels[index], "i"));
    });
  });

});
