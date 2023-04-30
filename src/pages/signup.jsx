import { useState } from 'react';

import './signup.css'

export default function Signup() {
    // state: input value
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    // state: value validity
    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdConfirmValid, setPwdConfirmValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // state: error message
    const [errorMessage, setErrorMessage] = useState({});

    // change state: input value
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        validateField('username', value);
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        validateField('email', value);
    }

    const handlePwdChange = (event) => {
        const value = event.target.value;
        setPwd(value);
        validateField('pwd', value);
    }

    const handlePwdConfirmChange = (event) => {
        const value = event.target.value;
        setPwdConfirm(value);
        validateField('pwdConfirm', value);
    }

    // validate input value 
    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(username);
    }

    const validateEmail = (email) => {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    }

    const validatePassword = (pwd) => {
        return pwd.length >= 8;
    }

    const validateConfirmPassword = (pwdConfirm) => {
        return pwdConfirm === pwd;
    }

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = errorMessage;
        let isUsernameValid = usernameValid;
        let isEmailValid = emailValid;
        let isPwdValid = pwdValid;
        let isPwdConfirmValid = pwdConfirmValid;

        switch (fieldName) {
            case 'username':
                isUsernameValid = validateUsername(value);
                fieldValidationErrors.username = isUsernameValid ? '' : 'Username is invalid';
                break;
            case 'email':
                isEmailValid = validateEmail(value);
                fieldValidationErrors.email = isEmailValid ? '' : 'Email is invalid';
                break;
            case 'pwd':
                isPwdValid = validatePassword(value);
                fieldValidationErrors.pwd = isPwdValid ? '' : 'Password must be at least 8 characters';
                break;
            case 'pwdConfirm':
                isPwdConfirmValid = validateConfirmPassword(value);
                fieldValidationErrors.pwdConfirm = isPwdConfirmValid ? '' : 'Passwords do not match';
                break;
            default:
                break;
        }

        setErrorMessage(fieldValidationErrors);
        setUsernameValid(isUsernameValid);
        setEmailValid(isEmailValid);
        setPwdValid(isPwdValid);
        setPwdConfirmValid(isPwdConfirmValid);

        validateForm();
    }

    const validateForm = () => {
        setFormValid(usernameValid && emailValid && pwdValid && pwdConfirmValid);
    }


    return (
        <>
            <div className='container'>
                <div className='form_participant'>
                    <form>
                        <div className='hidden'>
                            <input type="hidden" name="role" value="participant" />
                        </div>
                        <div className='prompt'>
                            <h3>Create a new account</h3>
                        </div>
                        <div className='field'>
                            <div className='inputVal'>
                                <input type='text' name='firstName' value={firstName} onChange={handleFirstNameChange} placeholder='First Name' />
                            </div>
                        </div>
                        <div className='field'>
                            <div className='inputVal'>
                                <input type='text' name='lastName' value={lastName} onChange={handleLastNameChange} placeholder='Last Name' />
                            </div>
                        </div>
                        <div className='field'>
                            <div className='inputVal'>
                                <input type='text' name='username' value={username} onChange={handleUsernameChange} placeholder='Username' /><br />
                                <span>{errorMessage.username}</span>
                            </div>
                        </div>
                        <div className='field'>
                            <div className='inputVal'>
                                <input type='text' name='email' value={email} onChange={handleEmailChange} placeholder='Email' /><br />
                                <span>{errorMessage.email}</span>
                            </div>
                        </div>
                        <div className='field'>
                            <div className='inputVal'>
                                <input type='password' name='pwd' value={pwd} onChange={handlePwdChange} placeholder='Password' /><br />
                                <span>{errorMessage.pwd}</span>
                            </div>
                        </div>
                        <div className='field'>
                            <div className='inputVal'>
                                <input type='password' name='pwdConfirm' value={pwdConfirm} onChange={handlePwdConfirmChange} placeholder='Confirm Password' /><br />
                                <span>{errorMessage.pwdConfirm}</span>
                            </div>
                        </div>
                        <div className='field'>
                            <button type='submit' disabled={!formValid}>Register</button>
                        </div>
                    </form>
                </div>
                {/* <div className='form_host'>

            </div> */}
            </div>
        </>
    )
}