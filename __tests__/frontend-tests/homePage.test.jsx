import React from "react";
import { render} from "@testing-library/react";
import HomePage from "../../src/pages/homePage";

describe("HomePage", () => {
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getAllByTestId } = render(<HomePage />);

        // test cards
        const cards = getAllByTestId("card", { container: document.body });
        expect(cards).toHaveLength(3);

    });
});