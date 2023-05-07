import { useState } from "react"
import PublishEssentials from "../Components/Publish/publishEssentials";
import { Box, Button } from "@mui/material";
import PublishBonus from "../Components/Publish/publishBonus";

function PublishHackathonPage() {
    return (
        <>
        <Box
            sx={{
                bgcolor: 'background.paper',
                justifyContent: 'center',
                paddingTop: '50px',
                width: '500px',
            }}
        >
            {/* Essential information for hosting hackathon */}
            <PublishEssentials/>

            {/* <PublishBonus/> */}

            <div>
                <Button
                    sx={{backgroundColor: 'orange', ':hover': {backgroundColor: 'sandybrown'},marginTop:'50px'}}
                    variant="contained"
                >
                    Publish
                </Button>
            </div>
        </Box>
        </>
    )
}

export default PublishHackathonPage;