// import React from 'react';
// import { render, fireEvent, screen, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Interests from '../../src/pages/onboardingPages/interests';
// import sinon from 'sinon';

// describe('Interests', () => {

//     // Clean up the DOM after each test
//     afterEach(() => {
//         cleanup();
//     });

//     // Sample tags for testing
//     const tags = [
//         'Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5',
//         'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10',
//         'Tag 11', 'Tag 12'
//     ];

//     // Test case for rendering all elements correctly
//     it('renders all elements correctly, all elements appeared on the page', () => {
//         // Render the Interests component
//         render(<Interests />);
//         // Check if the required elements are present in the DOM
//         expect(screen.getByText('What are you interested in?')).toBeInTheDocument();
//         expect(screen.getByText('Select at least 5 interests')).toBeInTheDocument();
//         // Check if each tag is present in the DOM
//         tags.forEach((tag) => {
//             expect(screen.getByText(tag)).toBeInTheDocument();
//         });
//     });

//     // Test case for checking if handleTagsSubmit function is called when submitting tags
//     it('handleTagsSubmit function is called when submitting tags', () => {
//         // Create a fake function to replace the handleTagsSubmit function
//         const handleTagsSubmitMock = sinon.fake();
//         // Create a mock TagsSelector component
//         const MockTagsSelector = (props) => {
//             return (
//                 <div
//                     onClick={() => {
//                         props.onSubmit(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);
//                     }}
//                 >
//                     Mocked TagsSelector
//                 </div>
//             );
//         };
//         // Render the Interests component with the mocked TagsSelector
//         render(<Interests TagsSelectorComponent={() => <MockTagsSelector onSubmit={handleTagsSubmitMock} />} />);
//         // Simulate a click on the mocked TagsSelector
//         fireEvent.click(screen.getByText('Mocked TagsSelector'));
//         // Check if the handleTagsSubmitMock function has been called once
//         expect(handleTagsSubmitMock.callCount).toBe(1);
//     });

// });