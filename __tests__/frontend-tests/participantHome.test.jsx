import React from "react";
import { render} from "@testing-library/react";
import ParticipantHome from "../../src/pages/participantPages/participantHome";

describe("ParticipantHome", () => {
    it("renders all elements correctly, all elements appeared on the page", () => {
        const { getAllByTestId } = render(<ParticipantHome />);

        // test cards
        const cards = getAllByTestId("card", { container: document.body });
        expect(cards).toHaveLength(6);

    });
});
