import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import * as React from 'react';
import { addHackathon } from "../firebase/firebaseFunction";

function PublishEssentials() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [hackathonName, setHackathonName] = useState('');
    const [hackathonDescription, setHackathonDescription] = useState('');

    const [regQuestions,setRegQuestions] = useState([]);

    const handleRegQuestion = () => {
        setRegQuestions([...regQuestions,""]);
    }

    const handlePublish = async () => {
        setRegQuestions(...regQuestions[0]="hello");
        
        const hackathon = {
            id: hackathonName,
            title: hackathonName,
            description: hackathonDescription,
            startDate: startDate,
            endDate: endDate
        };

        await addHackathon(hackathon);
    }

    return (
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
                {regQuestions.map((regQuestion) => (
                    <TextField
                        value={regQuestion}
                    />
                ))}
                <Button onClick={handleRegQuestion}>
                    Add question
                </Button>
            </Box>


            <Button
                onClick={handlePublish}
            >
                Test publish
            </Button>
        </div>
    )
}

export default PublishEssentials;