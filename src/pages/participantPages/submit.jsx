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
import { addDocumentToSubCollection, getHackathon, uploadFile } from '../../Components/firebase/firebaseFunction';
import { ref } from '@firebase/storage';
import { storage } from '../../firebaseConfig';

// This is the main function that returns the registerHackathons component
export default function SubmitHackathons() {

    const {currentUser} = React.useContext(AppContext);

    const {id} = useParams();

    const [subQuestions,setSubQuestions] = React.useState([]);
    const [requirements,setRequirements] = React.useState("");
    const [title,setTitle] = React.useState("");
    const [desc,setDesc] = React.useState("");
    const [ans,setAns] = React.useState([]);

    const [fileName,setFileName] = React.useState("");
    const [fileUploaded,setFileUploaded] = React.useState(null);

    const handleFileUpload = event => {
        setFileUploaded(event.target.files[0]);
        setFileName(event.target.files[0].name)
    };

    const fileInput = React.useRef(null);

    React.useEffect(()=>{
        if(currentUser!==null){
            const hackathon = getHackathon(id);
            hackathon.then(function(result){
                setSubQuestions(result.subQuestions);
                setRequirements(result.subRequirements);
                setTitle(result.title);
                setDesc(result.description);
                setAns(Array(subQuestions.length).fill(""));
            });
        }
    },[currentUser]);

    const handleSubmit = async () => {
        const data = {
            user: currentUser.email,
            questions: subQuestions,
            answers: ans
        }

        await addDocumentToSubCollection('hackathons',id,'Submissions',currentUser.email,data);

        const fileRef = ref(storage, 'hackathons/' + id +'/submissions/' +currentUser.email);
        await uploadFile(fileUploaded,fileRef);
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

                    {subQuestions.map((subQuestion,index) => (
                        <QuestionField
                            label={subQuestion}
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

                    <input
                        type="file"
                        ref={fileInput}
                        onChange={handleFileUpload}
                        style={{display: 'none'}}
                    />

                    <Box
                        sx={{mb:5,display:'flex'}}
                    >
                        <Button
                            sx={{ mr: 2, textTransform: 'none' }}
                            onClick={() => fileInput.current.click()}
                        >
                            Upload Submission
                        </Button>
                        <Typography
                            variant="h5"
                            align="left"
                            color="text.secondary"
                            paragraph
                        >
                            {fileName}
                        </Typography>
                    </Box>

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

                    {/* Submit button */}
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
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>

                </Box>
            </Box>
        </ThemeProvider>
    );
}