import React, { useContext } from "react";
import { render, fireEvent } from "@testing-library/react";
import SubmitHackathons from "../../src/pages/participantPages/submit";
import { AppContext } from "../../src/Components/AppContextProvider";

describe("SubmitHackathons", () => {
  it("renders all elements correctly, all elements appeared on the page", () => {
    // mocking function called inside component
    const currentUser = vi.fn();

    // render component
    const { getAllByRole } = render(
      <AppContext.Provider value={{ currentUser }}>
        <SubmitHackathons />
      </AppContext.Provider>
    );

    // Test textfields - Check if the two TextFields can correctly render the user's input data
    it("text fields render user input correctly", () => {
      // const { getAllByRole } = render(<SubmitHackathons />);
      // mocking function called inside component
      const currentUser = vi.fn();
      const addDocumentToSubCollection = vi.fn();
      const getHackathon = vi.fn();

      // render component
      const { getAllByRole } = render(
        <AppContext.Provider value={{ currentUser, addDocumentToSubCollection, getHackathon }}>
          <SubmitHackathons />
        </AppContext.Provider>
      );

      const inputValues = ["This is what I do", "This is a description"];

      const textFields = getAllByRole("textbox");
      expect(textFields).toHaveLength(2);

      textFields.forEach((textField, index) => {
        fireEvent.change(textField, { target: { value: inputValues[index] } });
        expect(textField.value).toBe(inputValues[index]);
      });
    });

    // Test buttons - tests the presence and content of the buttons
    const buttonLabels = ["Cancel", "Submit"];
    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(2);
    buttons.forEach((button, index) => {
      expect(button.textContent).toMatch(new RegExp(buttonLabels[index], "i"));
    });
  });

});
