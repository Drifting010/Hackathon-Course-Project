import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

function PublishRegistration() {
    return (
        <div>
            <div>
                <TextField
                    required
                    id="number-of-teammates"
                    label="Maximum number of members allowed"
                    helperText="As this is a teams event, this is a default question"
                />
            </div>

            <FormControl>
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
                />
            </div>

            <div>
                <TextField
                    required
                    id="host-name"
                    label="Host name"
                />
            </div>
        </div>
    )
}

export default PublishRegistration;