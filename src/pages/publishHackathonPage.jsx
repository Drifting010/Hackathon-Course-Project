import { useState } from "react"
import PublishEssentials from "../Components/Publish/publishEssentials";
import { Button } from "@mui/material";
import PublishOrganizer from "../Components/Publish/publishOrganizer";
import PublishRegistration from "../Components/Publish/publishRegistration";

function publishHackathonPage() {
    const [page,setPage] = useState(1);
    return (
        <>
            <div>
                Page {page} of 7
            </div>
            <PublishEssentials/>
            <PublishOrganizer/>
            <PublishRegistration/>

            <div>
                <Button>
                    Save Draft
                </Button>

                <Button>
                    Next
                </Button>
            </div>
        </>
    )
}

export default publishHackathonPage;