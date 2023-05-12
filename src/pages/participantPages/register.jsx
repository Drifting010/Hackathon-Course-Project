import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { AppContext } from '../../Components/AppContextProvider';
import { useParams } from 'react-router';
import { addDocumentToSubCollection, addToArray, getHackathon, retrieveDocFromSubCollection, retriveSubCollections } from '../../Components/firebase/firebaseFunction';

// This is the main function that returns the registerHackathons component
export default function RegisterHackathons() {

    const {currentUser} = React.useContext(AppContext);

    const {id} = useParams();

    const [regQuestions,setRegQuestions] = React.useState([]);
    const [requirements,setRequirements] = React.useState("");
    const [title,setTitle] = React.useState("");
    const [desc,setDesc] = React.useState("");
    const [ans,setAns] = React.useState([]);

    React.useEffect(()=>{
        if(currentUser!==null){
            const hackathon = getHackathon(id);
            hackathon.then(function(result){
                setRegQuestions(result.regQuestions);
                setRequirements(result.regRequirements);
                setTitle(result.title);
                setDesc(result.description);
                setAns(Array(regQuestions.length).fill(""));
            });
        }
    },[currentUser]);

    const handleRegister = async () => {
        const data = {
            user: currentUser.email,
            questions: regQuestions,
            answers: ans
        }

        await addDocumentToSubCollection('hackathons',id,'Registrations',currentUser.email,data);
        await addToArray('hackathons',id,'members',currentUser.email);
    }

    function QuestionField({label,index}){
        const [answer,setAnswer] = React.useState("");

        const handleChange = (e) => {
            setAnswer(e.target.value);

            ans[index] = e.target.value;
        }

        return(
            <Box width="100%" key={index}>
                <TextField
                    required
                    id="outlined-required"
                    label={label}
                    multiline
                    rows={4}
                    sx={{
                        border: '1px solid #30363D',
                        borderRadius: '6px',
                        width: '500px',
                        mb: 4,
                        background: '#21262D'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DescriptionOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={answer}
                    onChange={handleChange}
                />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Box component to create a container that fills the viewport height and centers its content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    pt: '5rem',
                }}
            >
                {/* Inner Box containing the form */}
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >
                    {/* Typography component for displaying the hackathon registration title */}
                    <Typography
                        align="left"
                        sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            fontWeight: 500,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                        mb={6}
                    >
                        {title}
                    </Typography>

                    <Typography
                        align="left"
                        sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            fontWeight: 500,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                        mb={6}
                    >
                        {desc}
                    </Typography>

                    {regQuestions.map((regQuestion,index) => (
                        <QuestionField
                            label={regQuestion}
                            index={index}
                            key={index}
                        />
                    ))}
                    

                    <Typography
                        align="left"
                        sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            fontWeight: 500,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                        mb={6}
                    >
                        {requirements}
                    </Typography>

                    {/* Cancel button to cancel the registration process */}
                    {/* Cancel button */}
                    <Button
                        variant='outlined'
                        sx={{
                            mr: 2,
                            ml: 10,
                            textTransform: 'none',
                            width: '142px',
                            height: '38px',
                            borderRadius: '10px',
                            borderColor: '#FF9300',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '14px',
                            color: '#FF9300',
                            '&:hover': {
                                borderColor: '#FF9300',
                            },

                        }}

                    >
                        Cancel
                    </Button>

                    {/* Register button */}
                    <Button
                        variant='contained'
                        sx={{
                            textTransform: 'none',
                            width: '142px',
                            height: '38px',
                            borderRadius: '10px',
                            background: '#FF9300',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#FFFFFF',
                            '&:hover': {
                                background: '#21262D',
                            },

                        }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>

                </Box>
            </Box>
        </ThemeProvider>
    );
}