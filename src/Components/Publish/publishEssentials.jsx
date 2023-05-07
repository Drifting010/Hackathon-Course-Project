import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { padding } from "@mui/system";
import { bottom } from "@popperjs/core";

function PublishEssentials() {
    return (
        <div>
            <div>
                <TextField
                    required
                    id="hackathon-name"
                    label="Hackathon name"
                    sx = {{paddingTop:'10px',paddingBottom:'10px'}}
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

            <div>
                <TextField
                    id="hackathon-description"
                    label="Hackathon description"
                    multiline
                    rows={4}
                    sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                    fullWidth
                />
            </div>

        </div>
    )
}

export default PublishEssentials;