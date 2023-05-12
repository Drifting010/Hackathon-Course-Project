import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import AccountSetting from '../../src/pages/participantPages/account';
import { AppContext } from '../../src/Components/AppContextProvider';

describe('AccountSetting', () => {
    it('Renders all input and button elements correctly', () => {
        // mock function called inside component
        const resetPassword = vi.fn();
        // render component
        const { getByLabelText, getByText, getByRole } = render(
            <AppContext.Provider value={{ resetPassword }}>
                <AccountSetting />
            </AppContext.Provider>
        );
        // test: input elements are rendered for password and confirm password
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password')).toBeInTheDocument();

        // test: Save button is rendered
        const saveButton = getByRole("button", { name: "Save" });
        expect(saveButton).toBeInTheDocument();

        // test: Save button is disabled by default
        expect(saveButton).toBeDisabled();
    });

    it('Enables save button when password and confirm password match and are at least 8 characters long', () => {
        // mock function called inside component
        const resetPassword = vi.fn();
        // render component
        const { getByLabelText, getByRole } = render(
            <AppContext.Provider value={{resetPassword}}>
                <AccountSetting />
            </AppContext.Provider>
        );

        // input elements
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');

        // save button
        const saveButton = getByRole("button", { name: "Save" });

        // test: Save button is disabled when the password is too short
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });
        expect(saveButton).toBeDisabled();

        // test: Save button is disabled when the password and confirm password do not match
        fireEvent.change(passwordInput, { target: { value: 'longpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'longpassw0rd' } });
        expect(saveButton).toBeDisabled();

        // test: Save button is enabled when the password and confirm password match and are at least 8 characters long
        fireEvent.change(passwordInput, { target: { value: 'longpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'longpassword' } });
        expect(saveButton).toBeEnabled();
    });
});
