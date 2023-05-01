import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
    return (
        <div>
            <h1>Log in to your account</h1>
            <p>Welcome back</p>
            <div>
                <Button>Google</Button>
                <Button>GitHub</Button>
                <Button>Linkedin</Button>
                <Button>Facebook</Button>
            </div>
            <p>or continue with email</p>
            <div>
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
        </div>
    )
}

export default Login;