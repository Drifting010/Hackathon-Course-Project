import React, { useState, useEffect } from 'react';
import './signup.css';
// import { createParticipant } from '../Components/firebase/firebaseFunction';

// This is the main function that returns the signup component
export default function Signup() {
    // state: value validity
    const [emailValid, setEmailValid] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdConfirmValid, setPwdConfirmValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // state: error message
    const [errorMessage, setErrorMessage] = useState({});

    // state: role selection
    const [isParticipantSelected, setParticipantSelected] = useState(true);
    const [isHostSelected, setHostSelected] = useState(false);

    // state: form submit check
    // const [success, setSuccess] = useState('');

    // state: input value
    const [formData, setFormData] = useState({
        p_email: '',
        p_pwd: '',
        p_pwdConfirm: '',
        h_email: '',
        h_pwd: '',
        h_pwdConfirm: '',
        role: 'participant' // by default
    });
    const [isSubmitting, setSubmitting] = useState(false);

    // form submit
    useEffect(() => {
        // console.log(formData);
        if (isSubmitting) {
            let email, password;
            const { p_email, p_pwd, h_email, h_pwd, role } = formData;

            if (role === 'participant') {
                email = p_email;
                password = p_pwd;
            } else {
                email = h_email;
                password = h_pwd;
            }
            // subimt form data to firebase database
            // createParticipant(email, password, role)
            //     .then(() => {
            //         console.log('Form submitted successfully!');
            //         setSuccess('Form submitted successfully!');
            //     })
            //     .catch(error => {
            //         console.log('Error: ', error);
            //     })
            //     .finally(() => {
            //         setSubmitting(false);
            //     })
        }
    }, [formData, isSubmitting]);

    // form data validity check
    useEffect(() => {
        validateForm();
    }, [emailValid, pwdValid, pwdConfirmValid]);

    // functions: handle changes of state
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);
    }

    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    }

    const handleParticipantClick = () => {
        setFormData({
            ...formData,
            role: 'participant'
        });
        setParticipantSelected(true);
        setHostSelected(false);
    }

    const handleHostClick = () => {
        setFormData({
            ...formData,
            role: 'host'
        });
        setHostSelected(true);
        setParticipantSelected(false);
    }

    // funcions: user input validity check 
    const validateEmail = (email) => {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const validateConfirmPassword = (pwdConfirm) => {
        return pwdConfirm === formData.p_pwd || pwdConfirm === formData.h_pwd;
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = errorMessage;
        let isEmailValid = emailValid;
        let isPwdValid = pwdValid;
        let isPwdConfirmValid = pwdConfirmValid;

        switch (fieldName) {
            case 'p_email':
            case 'h_email':
                isEmailValid = validateEmail(value);
                setEmailValid(isEmailValid);
                fieldValidationErrors.email = isEmailValid ? '' : 'Email is invalid';
                break;
            case 'p_pwd':
            case 'h_pwd':
                isPwdValid = validatePassword(value);
                setPwdValid(isPwdValid);
                fieldValidationErrors.pwd = isPwdValid ? '' : 'Password must be at least 8 characters';
                break;
            case 'p_pwdConfirm':
            case 'h_pwdConfirm':
                isPwdConfirmValid = validateConfirmPassword(value);
                setPwdConfirmValid(isPwdConfirmValid);
                fieldValidationErrors.pwdConfirm = isPwdConfirmValid ? '' : 'Passwords do not match';
                break;
            default:
                break;
        }
        setErrorMessage(fieldValidationErrors);
    }

    const validateForm = () => {
        setFormValid(emailValid && pwdValid && pwdConfirmValid);
    }

    return (
        <>
            <div className='container'>
                <div className='form'>
                    <div className='prompt'>
                        Create a new account
                    </div>
                    <div className='role_selection'>
                        <button
                            className={`button ${isParticipantSelected ? 'active' : ''}`}
                            onClick={handleParticipantClick}>
                            Participant</button>
                        <button
                            className={`button ${isHostSelected ? 'active' : ''}`}
                            onClick={handleHostClick}>
                            Host</button>
                    </div>
                    <div className={`form_submit ${isParticipantSelected ? '' : 'hidden'}`} data-testid='participant-form'>

                        <form onSubmit={(event) => { handleFormSubmit(event) }} style={{ width: '280px', height: '435px' }}>

                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='text' role='textbox' name='p_email' value={formData.p_email} onChange={(event) => { handleFormDataChange(event) }} placeholder='Email (Participant)' /><br />
                                    <span>{errorMessage.email}</span>
                                </div>
                            </div>
                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='password' role='textbox' name='p_pwd' value={formData.p_pwd} onChange={(event) => { handleFormDataChange(event) }} placeholder='Password (Participant)' /><br />
                                    <span>{errorMessage.pwd}</span>
                                </div>
                            </div>
                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='password' role='textbox' name='p_pwdConfirm' value={formData.p_pwdConfirm} onChange={(event) => { handleFormDataChange(event) }} placeholder='Confirm Password (Participant)' /><br />
                                    <span>{errorMessage.pwdConfirm}</span>
                                </div>
                            </div>
                            <div className='field'>
                                <button data-testid='submit_participant' type='submit' name='participant_proceed' disabled={!formValid}>Participant Proceed</button><br />
                                <span>{success}</span>
                            </div>
                        </form>
                    </div>
                    <div className={`form_submit ${isHostSelected ? '' : 'hidden'}`} data-testid='host-form'>

                        <form onSubmit={(event) => { handleFormSubmit(event) }} style={{ width: '280px', height: '435px' }}>

                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='text' role='textbox' name='h_email' value={formData.h_email} onChange={(event) => { handleFormDataChange(event) }} placeholder='Email (Host)' /><br />
                                    {/* <span>{errorMessage.email}</span> */}
                                </div>
                            </div>
                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='password' role='textbox' name='h_pwd' value={formData.h_pwd} onChange={(event) => { handleFormDataChange(event) }} placeholder='Password (Host)' /><br />
                                    {/* <span>{errorMessage.pwd}</span> */}
                                </div>
                            </div>
                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='password' role='textbox' name='h_pwdConfirm' value={formData.h_pwdConfirm} onChange={(event) => { handleFormDataChange(event) }} placeholder='Confirm Password (Host)' /><br />
                                    {/* <span>{errorMessage.pwdConfirm}</span> */}
                                </div>
                            </div>
                            <div className='field'>
                                <button data-testid='submit_host' type='submit' name='host_proceed' disabled={!formValid}>Host Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}