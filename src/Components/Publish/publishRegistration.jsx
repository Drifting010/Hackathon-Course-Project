import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";

function PublishRegistration() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    return (
        <div>
            {/* <div>
                <TextField
                    required
                    id="number-of-teammates"
                    label="Maximum number of members allowed"
                    helperText="As this is a teams event, this is a default question"
                    sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                />
            </div>

            <FormControl sx = {{paddingTop:'10px',paddingBottom:'10px'}}>
                <FormLabel id="hackathon-setting">Which age group do you belong to?</FormLabel>
                <RadioGroup
                    aria-labelledby="hackathon-setting-label"
                    defaultValue="a"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="a" control={<Radio />} label="< 18" />
                    <FormControlLabel value="b" control={<Radio />} label="18-21" />
                    <FormControlLabel value="c" control={<Radio />} label="21-24" />
                    <FormControlLabel value="d" control={<Radio />} label="> 24" />
                </RadioGroup>
            </FormControl>

            <div>
                <TextField
                    required
                    id="organization-name"
                    label="Organization name"
                    sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                />
            </div>

            <div>
                <TextField
                    required
                    id="host-name"
                    label="Host name"
                    sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                />
            </div> */}
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
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </Box>
                    <Box
                        sx = {{width:'50%',paddingLeft:'50px'}}
                    >
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
                    </Box>
                </LocalizationProvider>
            </Box>


        </div>
    )
}

export default PublishRegistration;