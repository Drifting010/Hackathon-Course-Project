// import React from 'react';
// import '@testing-library/jest-dom';
// import { expect, it, vi } from 'vitest';
// import { render, fireEvent, screen, cleanup } from '@testing-library/react';
// // import { AppContext } from '../../src/Components/AppContextProvider';
import Interests from '../../src/pages/onboardingPages/interests';
import TagsSelector from '../../src/Components/tagsSelector';
// import sinon from 'sinon';

import '@testing-library/jest-dom';
import { expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
// import Signup from '../../src/pages/onboardingPages/signup';
import { AppContext } from '../../src/Components/AppContextProvider';

// const AppContext = React.createContext()
// import { expect, it, vi } from 'vitest'
// import '@testing-library/jest-dom';
// import { render, fireEvent } from '@testing-library/react';

describe('Interests', () => {

    // // Clean up the DOM after each test
    // afterEach(() => {
    //     cleanup();
    // });

    // Sample tags for testing
    const tags = [
        'Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5',
        'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10',
        'Tag 11', 'Tag 12'
    ];

    // Test case for rendering all elements correctly
    it('renders all elements correctly, all elements appeared on the page', () => {
        // mocking functions called inside interest component
        const createParticipantProfile = vi.fn();
        console.log(createParticipantProfile);
        const createHostProfile = vi.fn();
        const getAllTags = vi.fn().mockImplementation(() => tags);

        // Render the Interests component
        const { } = render(
            <AppContext.Provider value={{ createParticipantProfile, createHostProfile, getAllTags }}>
                <Interests TagsSelectorComponent={TagsSelector} />
            </AppContext.Provider>
        );

        // Check if the required elements are present in the DOM
        expect(screen.getByText('What are you interested in?')).toBeInTheDocument();
        expect(screen.getByText('Select at least 5 interests')).toBeInTheDocument();
        // Check if each tag is present in the DOM
        // tags.forEach((tag) => {
        //     expect(screen.getByText(tag)).toBeInTheDocument();
        // });
    });

    // // Test case for checking if handleTagsSubmit function is called when submitting tags
    // it('handleTagsSubmit function is called when submitting tags', () => {
    //     // Create a fake function to replace the handleTagsSubmit function
    //     const handleTagsSubmitMock = sinon.fake();
    //     // Create a mock TagsSelector component
    //     const MockTagsSelector = (props) => {
    //         return (
    //             <div
    //                 onClick={() => {
    //                     props.onSubmit(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);
    //                 }}
    //             >
    //                 Mocked TagsSelector
    //             </div>
    //         );
    //     };
    //     // Render the Interests component with the mocked TagsSelector
    //     render(<Interests TagsSelectorComponent={() => <MockTagsSelector onSubmit={handleTagsSubmitMock} />} />);
    //     // Simulate a click on the mocked TagsSelector
    //     fireEvent.click(screen.getByText('Mocked TagsSelector'));
    //     // Check if the handleTagsSubmitMock function has been called once
    //     expect(handleTagsSubmitMock.callCount).toBe(1);
    // });

});