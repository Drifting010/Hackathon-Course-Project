import { Button, InputAdornment, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import styles from './Login.module.css'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import {auth,provider} from '../firebaseConfig.js'
import * as React from 'react';


function Login() {
    //State variable of Google signin email
    const [value,setValue] = useState('');

    //Attempt google login and set email to variable in local storage
    const handleGoogleLogin = () => {
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email);
            localStorage.setItem("email",data.user.email)
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem("email"))
    })

    //State variables to control email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Log in to your account</h1>
            <p>Welcome back {value}</p>
            <div>
                <Button
                    sx={{backgroundColor: 'darkgray', ':hover': {backgroundColor: 'dimgray'},marginLeft: '10px',marginRight: '10px'}}
                    variant="contained"
                    startIcon={<GoogleIcon/>}
                    onClick={handleGoogleLogin}
                >
                    Google
                </Button>
                <Button
                    sx={{backgroundColor: 'darkgray', ':hover': {backgroundColor: 'dimgray'},marginLeft: '10px',marginRight: '10px'}}
                    variant="contained"
                    startIcon={<GitHubIcon/>}
                >
                    GitHub
                </Button>
                <Button
                    sx={{backgroundColor: 'darkgray', ':hover': {backgroundColor: 'dimgray'},marginLeft: '10px',marginRight: '10px'}}
                    variant="contained"
                    startIcon={<LinkedInIcon/>}
                >
                    Linkedin
                </Button>
                <Button
                    sx={{backgroundColor: 'darkgray', ':hover': {backgroundColor: 'dimgray'},marginLeft: '10px',marginRight: '10px'}}
                    variant="contained"
                    startIcon={<FacebookIcon/>}
                >
                    Facebook
                </Button>
            </div>
            <p>or continue with email</p>
            <div className={styles.container}>
                <TextField
                    required
                    name="email-required"
                    id="email-required"
                    label="Enter email"
                    value={email}
                    onChange={(e)=> {setEmail(e.target.value)}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <EmailIcon />
                            </InputAdornment>
                        ),
                        }}
                />
            </div>
            <div>
                <TextField
                    id="password-required"
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e)=> {setPassword(e.target.value)}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LockIcon />
                            </InputAdornment>
                        ),
                        }}
                />
            </div>
            <a href="">Forgot password?</a>
            <div>
                <Button
                    sx={{backgroundColor: 'orange', ':hover': {backgroundColor: 'sandybrown'},width: '250px'}}
                    variant="contained"
                >
                    Log in
                </Button>
            </div>
        </div>
    )
}

export default Login;