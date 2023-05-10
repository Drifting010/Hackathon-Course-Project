import {TextField } from "@mui/material";
import * as React from 'react';

function PublishBonus() {
    return (
        <div>
            <div>
                <TextField
                    required
                    id="event-manager-name"
                    label="Event manager name"
                />
                <TextField
                    required
                    id="event-manager-email"
                    label="Event manager contact email"
                />
            </div>

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

export default PublishBonus;