import React from "react";
import { render} from "@testing-library/react";
import ParticipantHome from "../../src/pages/participantPages/participantHome";

describe("Explopre", () => {
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getAllByTestId } = render(<ParticipantHome />);

        // test cards
        const cards = getAllByTestId("card", { container: document.body });
        expect(cards).toHaveLength(6);

    });
});
