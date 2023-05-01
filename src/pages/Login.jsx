import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import styles from './Login.module.css'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

function Login() {
    return (
        <div>
            <h1>Log in to your account</h1>
            <p>Welcome back</p>
            <div>
                <Button
                    sx={{backgroundColor: 'darkgray', ':hover': {backgroundColor: 'dimgray'},marginLeft: '10px',marginRight: '10px'}}
                    variant="contained"
                    startIcon={<GoogleIcon/>}
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
                    id="email-required"
                    label="Enter email"
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