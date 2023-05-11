import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import * as React from 'react';
import { AppContext } from "../../Components/AppContextProvider";

function PublishHackathonPage() {
    const {addHackathon,addDocumentToSubCollection} = React.useContext(AppContext);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [hackathonName, setHackathonName] = useState('');
    const [hackathonDescription, setHackathonDescription] = useState('');

    const [regRequirements, setRegRequirements] = useState('');
    const [subRequirements, setSubRequirements] = useState('');

    const [regQuestions,setRegQuestions] = useState([]);

    const handleRegQuestion = () => {
        setRegQuestions([...regQuestions,""]);
    }

    const [subQuestions,setSubQuestions] = useState([]);

    const handleSubQuestion = () => {
        setSubQuestions([...subQuestions,""]);
    }

    function RegistrationQuestion({index,regQuestion}) {
        const [question, setQuestion] = useState(regQuestion);

        const handleChange = (e) => {
            setQuestion(e.target.value);

            regQuestions[index] = e.target.value;
        }

        return (
            <div>
                <TextField
                    value={question}
                    onChange={handleChange}
                />
                <Button onClick={()=>{
                    regQuestions.splice(index,1);
                    setRegQuestions([...regQuestions]);
                }}>
                    X
                </Button>
            </div>
        )
    }

    function SubmissionQuestion({index,subQuestion}) {
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
                />
                <Button onClick={()=>{
                    subQuestions.splice(index,1);
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
            subRequirements: subRequirements
        };

        await addHackathon(hackathon);

        const initialValue = {};

        const data1 = regQuestions.reduce((obj, item,index) => {
            return {
                ...obj,
                ['question'+index]: item,
            };
        },initialValue);

        const data2 = subQuestions.reduce((obj, item,index) => {
            return {
                ...obj,
                ['question'+index]: item,
            };
        },initialValue);

        console.log(data1);
        console.log(data2);
        
        await addDocumentToSubCollection('hackathons',hackathonName,'RegistrationForm','questions',data1);
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                justifyContent: 'center',
                paddingTop: '50px',
                width: '500px',
            }}
        >
            <div>
                <div>
                    {/* Controlled textfield for name of hackathon */}

                    <TextField
                        required
                        id="hackathon-name"
                        label="Hackathon name"
                        sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                        value={hackathonName}
                        onChange={(e)=> {setHackathonName(e.target.value)}}
                        fullWidth
                    />
                </div>
    {/* 
                <FormControl>
                    <FormLabel id="hackathon-setting">This hackathon is</FormLabel>
                    <RadioGroup
                        aria-labelledby="hackathon-setting-label"
                        defaultValue="Online"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="online" control={<Radio />} label="Online" />
                        <FormControlLabel value="in-person" control={<Radio />} label="in-person" />
                        <FormControlLabel value="hybrid" control={<Radio />} label="hybrid" />
                    </RadioGroup>
                </FormControl> */}

                {/* Controlled textfield for hackathon description */}
                <div>
                    <TextField
                        id="hackathon-description"
                        label="Hackathon description"
                        multiline
                        rows={4}
                        sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                        value={hackathonDescription}
                        onChange={(e)=> {setHackathonDescription(e.target.value)}}
                        fullWidth
                    />
                </div>

                {/* Container for start and end date pickers */}
                <Box
                    sx = {{paddingTop:'10px',paddingBottom:'10px',display:'flex'}}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            sx = {{width:'50%',paddingRight:'50px'}}
                        >
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue.$d)}
                            />
                        </Box>
                        <Box
                            sx = {{width:'50%',paddingLeft:'50px;'}}
                        >
                            <DatePicker
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
                    {regQuestions.map((regQuestion,index) => (
                        <RegistrationQuestion key={index} index={index} regQuestion={regQuestion}/>
                    ))}
                    <Button onClick={handleRegQuestion}>
                        Add question
                    </Button>
                </Box>

                <div>
                    <TextField
                        id="reg-requirements"
                        label="Registration Requirements"
                        multiline
                        rows={4}
                        sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                        value={regRequirements}
                        onChange={(e)=> {setRegRequirements(e.target.value)}}
                        fullWidth
                        placeholder="Mention any requirements for registrations, as well as any required files (one upload)"
                    />
                </div>

                <Box>
                    <Typography>
                        Submission questions
                    </Typography>
                    {subQuestions.map((subQuestion,index) => (
                        <SubmissionQuestion key={index} index={index} subQuestion={subQuestion}/>
                    ))}
                    <Button onClick={handleSubQuestion}>
                        Add question
                    </Button>
                </Box>

                <div>
                    <TextField
                        id="reg-requirements"
                        label="Submission Requirements"
                        multiline
                        rows={4}
                        sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                        value={subRequirements}
                        onChange={(e)=> {setSubRequirements(e.target.value)}}
                        fullWidth
                        placeholder="Mention any requirements for submission, as well as any required files (one upload)"
                    />
                </div>

                <Button
                    sx={{backgroundColor: 'orange', ':hover': {backgroundColor: 'sandybrown'},marginTop:'50px'}}
                    variant="contained"
                    onClick={handlePublish}
                >
                    Publish
                </Button>
            </div>
        </Box>
    )
}

export default PublishHackathonPage;