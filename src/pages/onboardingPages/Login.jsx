import { Button, InputAdornment, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import styles from './Login.module.css'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useState } from "react";
import * as React from 'react';
import { AppContext } from "../../Components/AppContextProvider";
import { useNavigate } from "react-router";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function Login() {
    //State variable of Google signin email

    const [loginFail, setLoginFail] = useState("");

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
        const login = signInWithEmailAndPasswordFunction(email, password);

        login.then(function (result) {
            if (result === null) {
                setLoginFail("Invalid username and password");
            } else {
                const user = getCurrentUser();
                const userDetails = getUser(user.email);

                userDetails.then(function (result) {
                    if (result.role === "participant") {
                        navigate("/explore_hackathons");
                    } else if (result.role === "host") {
                        navigate("/dashboard");
                    }
                });
            }
        }, function () {
            setLoginFail("An error occured.")
        });
    }

    return (
        <>
            {/* Outer Box for centering the inner content */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                {/* Inner Box containing the form */}
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >
                    {/* Heading */}
                    <Typography
                        sx={{
                            mb: '10px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '25px',
                            fontWeight: 700,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Log in to your account
                    </Typography>

                    {/* Subheading */}
                    <Typography
                        sx={{
                            mb: '30px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            fontWeight: 300,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Welcome back
                    </Typography>

                    <div>
                        <Button
                            sx={{
                                background: '#21262D',
                                ':hover': { backgroundColor: 'dimgray' },
                                arginLeft: '10px',
                                marginRight: '10px',
                                border: '1px solid #30363D',
                                borderRadius: '15px',
                                width: '132px',
                                height: '57px',
                                color: '#D9D9D9',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontSize: '12px',
                                fontWeight: 500,
                                textTransform: 'none',
                            }}
                            variant="contained"
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                        >
                            Google
                        </Button>
                        <Button
                            sx={{
                                background: '#21262D',
                                ':hover': { backgroundColor: 'dimgray' },
                                arginLeft: '10px',
                                marginRight: '10px',
                                border: '1px solid #30363D',
                                borderRadius: '15px',
                                width: '132px',
                                height: '57px',
                                color: '#D9D9D9',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontSize: '12px',
                                fontWeight: 500,
                                textTransform: 'none',
                            }}
                            variant="contained"
                            startIcon={<GitHubIcon />}
                        >
                            GitHub
                        </Button>
                        <Button
                            sx={{
                                background: '#21262D',
                                ':hover': { backgroundColor: 'dimgray' },
                                arginLeft: '10px',
                                marginRight: '10px',
                                border: '1px solid #30363D',
                                borderRadius: '15px',
                                width: '132px',
                                height: '57px',
                                color: '#D9D9D9',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontSize: '12px',
                                fontWeight: 500,
                                textTransform: 'none',
                            }}
                            variant="contained"
                            startIcon={<LinkedInIcon />}
                        >
                            Linkedin
                        </Button>
                        <Button
                            sx={{
                                background: '#21262D',
                                ':hover': { backgroundColor: 'dimgray' },
                                arginLeft: '10px',
                                marginRight: '10px',
                                border: '1px solid #30363D',
                                borderRadius: '15px',
                                width: '132px',
                                height: '57px',
                                color: '#D9D9D9',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontSize: '12px',
                                fontWeight: 500,
                                textTransform: 'none',
                            }}
                            variant="contained"
                            startIcon={<FacebookIcon />}
                        >
                            Facebook
                        </Button>
                    </div>

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ my: 2 }}
                    >
                        <Box
                            flexGrow={1}
                            borderBottom="1px solid #21262D"
                            mr={2}
                        />
                        <Typography

                            sx={{
                                color: '#F3F3F3',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontSize: '10px',
                                fontWeight: 500,
                            }}
                        >
                            or continue with email
                        </Typography>
                        <Box
                            flexGrow={1}
                            borderBottom="1px solid #21262D"
                            ml={2}
                        />
                    </Box>

                    <div>
                        <TextField
                            required
                            sx={{ background: '#21262D', width: "100%", mb: 2, }}
                            name="email-required"
                            id="email-required"
                            label="Enter email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
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
                            sx={{ background: '#21262D', width: "100%", mb: 2, }}
                            label="Enter Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <Typography
                            href=""
                            sx={{
                                mb: '30px',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontSize: '12px',
                                fontWeight: 500,
                                letterSpacing: '0.75px',
                                color: '#326AD5',
                            }}
                        >
                            Forgot password?
                        </Typography>
                    </div>

                    <Typography
                        style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#FF6262',
                        }}>
                        {loginFail}
                    </Typography>

                    <div>
                        <Button
                            sx={{
                                width: '100%',
                                height: '40px',
                                background: '#FF9300',
                                textTransform: 'none',
                                borderRadius: '5px',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '14px',
                                color: '#F7F7FC',
                                mb: 2
                            }}
                            onClick={handleLogin}
                        >
                            Log in
                        </Button>
                    </div>
                    <div>
                        <Button
                            sx={{
                                width: '100%',
                                height: '40px',
                                background: '#FF9300',
                                textTransform: 'none',
                                borderRadius: '5px',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '14px',
                                color: '#F7F7FC',
                            }}
                            href="/signup"
                        >
                            Sign up
                        </Button>
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default Login;