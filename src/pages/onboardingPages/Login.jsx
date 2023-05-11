import { Button, InputAdornment, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import styles from './Login.module.css'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useState } from "react";
import * as React from 'react';
import { AppContext } from "../../Components/AppContextProvider";
import { useNavigate } from "react-router";


function Login() {
    //State variable of Google signin email

    const [loginFail,setLoginFail] = useState("");

    const { getUser, getCurrentUser, signInWithEmailAndPasswordFunction } = React.useContext(AppContext);

    //Attempt google login and set email to variable in local storage
    const handleGoogleLogin = () => {
        // const googleUser = signInWithGoogleFunction();
    }


    //State variables to control email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = () => {
        setLoginFail("");
        const login = signInWithEmailAndPasswordFunction(email,password);
        
        login.then(function(result) {
            if(result===null){
                setLoginFail("Invalid username and password");
            }else{
                const user = getCurrentUser();
                const userDetails = getUser(user.email);

                userDetails.then(function(result){
                    if(result.role==="participant"){
                        navigate("/explore_hackathons");
                    }else if(result.role==="host"){
                        navigate("/dashboard");
                    }
                });
            }
        },function(error){
            setLoginFail("An error occured.")
        });
    }

    return (
        <div>
            <h1>Log in to your account</h1>
            <p>Welcome back</p>
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
            <p style={{color:'red'}}>{loginFail}</p>
            <div>
                <Button
                    sx={{backgroundColor: 'orange', ':hover': {backgroundColor: 'sandybrown'},width: '250px'}}
                    variant="contained"
                    onClick={handleLogin}
                >
                    Log in
                </Button>
            </div>
        </div>
    )
}

export default Login;