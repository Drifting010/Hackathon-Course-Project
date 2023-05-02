import { useState, useEffect } from 'react';

import './profileparticipant.css'

export default function Signup() {
    // state: input value
    const [formData, setFormData] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            axios.post('api/form-submit', formData)
                .then(() => {
                    console.log('Form submitted successfully!')
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setSubmitting(false);
                })
        }
    }, [formData, isSubmitting]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // handleFormDataChange('role','')
        setSubmitting(true);
    }

    const handleFormDataChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [orgName, setOrgName] = useState('');

    // state: value validity
    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdConfirmValid, setPwdConfirmValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // state: error message
    const [errorMessage, setErrorMessage] = useState({});

    // state: role selection
    const [isParticipantSelected, setParticipantSelected] = useState(true);
    const [isHostSelected, setHostSelected] = useState(false);

    // change state: input value
    const handleFirstNameChange = (event) => {
        const { name, value } = event.target;
        setFirstName(value);
        handleFormDataChange(name, value);
    }

    const handleLastNameChange = (event) => {
        const { name, value } = event.target;
        handleFormDataChange(name, value);
        setLastName(value);
    }

    const handleUsernameChange = (event) => {
        const { name, value } = event.target;
        handleFormDataChange(name, value);
        setUsername(value);
        validateField('username', value);
    }

    const handleEmailChange = (event) => {
        const { name, value } = event.target;
        handleFormDataChange(name, value);
        setEmail(value);
        validateField('email', value);
    }

    const handlePwdChange = (event) => {
        const { name, value } = event.target;
        handleFormDataChange(name, value);
        setPwd(value);
        validateField('pwd', value);
    }

    const handlePwdConfirmChange = (event) => {
        const { name, value } = event.target;
        handleFormDataChange(name, value);
        setPwdConfirm(value);
        validateField('pwdConfirm', value);
    }

    const handleOrgNameChange = (event) => {
        const { name, value } = event.target;
        handleFormDataChange(name, value);
        setOrgName(value);
    }

    const handleParticipantClick = () => {
        setFormData('role', 'participant');
        setParticipantSelected(true);
        setHostSelected(false);
    }

    const handleHostClick = () => {
        setFormData('role', 'host');
        setHostSelected(true);
        setParticipantSelected(false);
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
                    <div className={`form_submit ${isParticipantSelected ? '' : 'hidden'}`}>

                        <form onSubmit={handleSubmit} style={{ width: '280px', height: '435px' }}>
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
                    <div className={`form_submit ${isHostSelected ? '' : 'hidden'}`}>

                        <form onSubmit={handleSubmit} style={{ width: '280px', height: '435px' }}>
                            <div className='field'>
                                <div className='inputVal'>
                                    <input type='text' name='orgname' value={orgName} onChange={handleOrgNameChange} placeholder='Orgnisation Name' />
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
                </div>
            </div>
        </>
    )
}