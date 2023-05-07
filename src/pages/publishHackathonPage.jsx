import { useState } from "react"
import PublishEssentials from "../Components/Publish/publishEssentials";
import { Box, Button } from "@mui/material";
import PublishBonus from "../Components/Publish/publishBonus";
import PublishRegistration from "../Components/Publish/publishRegistration";

function publishHackathonPage() {
    const [page,setPage] = useState(1);
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
            <PublishEssentials/>
            {/* <PublishBonus/> */}
            <PublishRegistration/>

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

export default publishHackathonPage;