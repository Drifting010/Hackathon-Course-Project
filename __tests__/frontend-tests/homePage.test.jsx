import React from "react";
import { render} from "@testing-library/react";
import HomePage from "../../src/pages/onboardingPages/homePage";

describe("HomePage", () => {
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getAllByTestId } = render(<HomePage />);


    });
});
