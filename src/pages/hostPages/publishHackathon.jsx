import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import * as React from 'react';
import { AppContext } from "../../Components/AppContextProvider";
import { addHackathon, getUser } from "../../Components/firebase/firebaseFunction";
import { styled } from '@mui/system';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#4474F1',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4474F1',
        },
    },
    '& .MuiInputLabel-outlined': {
        '&:hover': {
            color: '#4474F1',
        },
        '&.Mui-focused': {
            color: '#4474F1',
        },
    },
});

const CssDatePicker = styled(DatePicker)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#4474F1',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4474F1',
        },
    },
    '& .MuiInputLabel-outlined': {
        '&:hover': {
            color: '#4474F1',
        },
        '&.Mui-focused': {
            color: '#4474F1',
        },
    },
});

function PublishHackathonPage() {
    const { addHackathon, addDocumentToSubCollection } = React.useContext(AppContext);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [hackathonName, setHackathonName] = useState('');
    const [hackathonDescription, setHackathonDescription] = useState('');

    const [regRequirements, setRegRequirements] = useState('');
    const [subRequirements, setSubRequirements] = useState('');

    const [regQuestions, setRegQuestions] = useState([]);

    const [isHost,setIsHost] = useState(false);

    React.useEffect(()=>{
        if(currentUser!==null){
            const user = getUser(currentUser.email);
            user.then(function(result){
                if(result.role==="host"){
                    setIsHost(true);
                }else{
                    setIsHost(false);
                }
            });
        }
    },[currentUser]);

    const handleRegQuestion = () => {
        setRegQuestions([...regQuestions, ""]);
    }

    const [subQuestions, setSubQuestions] = useState([]);

    const handleSubQuestion = () => {
        setSubQuestions([...subQuestions, ""]);
    }

    function RegistrationQuestion({ index, regQuestion }) {
        const [question, setQuestion] = useState(regQuestion);

        const handleChange = (e) => {
            setQuestion(e.target.value);

            regQuestions[index] = e.target.value;
        }

        return (
            <div>
                <CssTextField
                    value={question}
                    onChange={handleChange}
                    sx={{width:'75%'}}
                />
                <Button onClick={() => {
                    regQuestions.splice(index, 1);
                    setRegQuestions([...regQuestions]);
                }}>
                    X
                </Button>
            </div>
        )
    }

    function SubmissionQuestion({ index, subQuestion }) {
        const [question, setQuestion] = useState(subQuestion);

        const handleChange = (e) => {
            setQuestion(e.target.value);

            subQuestions[index] = e.target.value;
        }

        return (
            <div>
                <TextField
                    value={question}
                    onChange={handleChange}
                    sx={{width:'75%'}}
                />
                <Button onClick={() => {
                    subQuestions.splice(index, 1);
                    setSubQuestions([...subQuestions]);
                }}>
                    X
                </Button>
            </div>
        )
    }


    const handlePublish = async () => {
        const hackathon = {
            id: hackathonName,
            title: hackathonName,
            description: hackathonDescription,
            startDate: startDate,
            endDate: endDate,
            regRequirements: regRequirements,
            subRequirements: subRequirements,
            regQuestions: regQuestions,
            subQuestions: subQuestions,
            host: currentUser.email,
            members: [],
        };

        await addHackathon(hackathon);
    }

    return isHost ? (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: '50px',
                width: '100%',
            }}
        >
            <div>
                <div>
                    {/* Controlled textfield for name of hackathon */}

                    <CssTextField
                        required
                        id="hackathon-name"
                        label="Hackathon name"
                        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
                        value={hackathonName}
                        onChange={(e) => { setHackathonName(e.target.value) }}
                        fullWidth
                    />
                </div>
                <div>
                    <CssTextField
                        id="hackathon-description"
                        label="Hackathon description"
                        multiline
                        rows={4}
                        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
                        value={hackathonDescription}
                        onChange={(e) => { setHackathonDescription(e.target.value) }}
                        fullWidth
                    />
                </div>

                {/* Container for start and end date pickers */}
                <Box
                    sx={{ paddingTop: '10px', paddingBottom: '10px', display: 'flex' }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            sx={{ width: '50%', paddingRight: '50px' }}
                        >
                            <CssDatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue.$d)}
                            />
                        </Box>
                        <Box
                            sx={{ width: '50%', paddingLeft: '50px;' }}
                        >
                            <CssDatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue.$d)}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>

                <Box>
                    <Typography>
                        Registration questions
                    </Typography>
                    {regQuestions.map((regQuestion, index) => (
                        <RegistrationQuestion key={index} index={index} regQuestion={regQuestion} />
                    ))}
                    <Button sx={{ color: '#4474F1' }} onClick={handleRegQuestion}>
                        Add question
                    </Button>
                </Box>

                <div>
                    <CssTextField
                        id="reg-requirements"
                        label="Registration Requirements"
                        multiline
                        rows={4}
                        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
                        value={regRequirements}
                        onChange={(e) => { setRegRequirements(e.target.value) }}
                        fullWidth
                        placeholder="Mention any requirements for registrations, as well as any required files (one upload)"
                    />
                </div>

                <Box>
                    <Typography>
                        Submission questions
                    </Typography>
                    {subQuestions.map((subQuestion, index) => (
                        <SubmissionQuestion key={index} index={index} subQuestion={subQuestion} />
                    ))}
                    <Button sx={{ color: '#4474F1' }} onClick={handleSubQuestion}>
                        Add question
                    </Button>
                </Box>

                <div>
                    <CssTextField
                        id="reg-requirements"
                        label="Submission Requirements"
                        multiline
                        rows={4}
                        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
                        value={subRequirements}
                        onChange={(e) => { setSubRequirements(e.target.value) }}
                        fullWidth
                        placeholder="Mention any requirements for submission, as well as any required files (one upload)"
                    />
                </div>

                <Button
                    sx={{
                        width: '100%',
                        background: '#4474F1',
                        textTransform: 'none',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        borderRadius: '10px',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#F7F7FC',
                        mt: 5,
                    }}
                    onClick={handlePublish}
                >
                    Publish
                </Button>
            </div>
        </Box>
    ) : (
        <Typography>You do not have permission.</Typography>
    )
}

export default PublishHackathonPage;