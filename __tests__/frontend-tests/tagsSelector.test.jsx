import React from 'react';
import TagsSelector from '../../src/Components/tagsSelector';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import sinon from 'sinon';

describe('TagsSelector', () => {
    const tags = ['Tag1', 'Tag2', 'Tag3'];
    const onSubmit = sinon.spy();

    it('renders all elements correctly, all elements appeared on the page', () => {
        render(<TagsSelector tags={tags} onSubmit={onSubmit} />);

        // Test rendering of tags
        it('renders all tags correctly', () => {
            tags.forEach((tag) => {
                expect(screen.getByText(tag)).toBeInTheDocument();
            });
        });

        // Test toggling tag selection on click
        it('toggles tag selection on click', () => {
            tags.forEach((tag) => {
                const button = screen.getByText(tag);
                expect(button).toHaveAttribute('variant', 'outlined');
                fireEvent.click(button);
                expect(button).toHaveAttribute('variant', 'contained');
                fireEvent.click(button);
                expect(button).toHaveAttribute('variant', 'outlined');
            });
        });

        // Test onSubmit call with the correct selected tags
        it('calls onSubmit with the correct selected tags', () => {
            fireEvent.click(screen.getByText(tags[0]));
            fireEvent.click(screen.getByText(tags[1]));
            fireEvent.click(screen.getByText('Submit'));

            expect(onSubmit.calledWith([tags[0], tags[1]])).toBe(true);
        });

        // Test toggling submit button variant on hover
        it('toggles submit button variant on hover', () => {
            const submitButton = screen.getByText('Submit');

            expect(submitButton).toHaveAttribute('variant', 'outlined');
            fireEvent.mouseEnter(submitButton);
            expect(submitButton).toHaveAttribute('variant', 'contained');
            fireEvent.mouseLeave(submitButton);
            expect(submitButton).toHaveAttribute('variant', 'outlined');
        });
    });
});
