import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../Components/theme";
import * as React from 'react';

function EditPanel({index,value}) {
    return (
        <div>
            {index === value && <EditComponent/>}
        </div>
    )
}

function SubmissionPanel({index,value}) {
    return (
        <div>
            {index === value && <SubmissionList/>}
        </div>
    )
}

function EditComponent() {
    const [isEdit,setEdit] = React.useState(false);
    const [title,setTitle] = React.useState("Title");
    const [description,setDescription] = React.useState("Description");

    const [titleBackup,setTitleBackup] = React.useState("");
    const [descBackup,setDescBackup] = React.useState("");

    const handleEdit = (()=>{
        setTitleBackup(title);
        setDescBackup(description);
        setEdit(!isEdit);
    })

    const handleSave = (()=>{
        setEdit(!isEdit);
    })

    const handleCancel = (()=>{
        setTitle(titleBackup);
        setDescription(descBackup);
        setEdit(!isEdit);
    })

    return(
        <div>
            {!isEdit ?
                <Button onClick={handleEdit}>
                    Edit
                </Button>
                :
                <div>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            }
            {!isEdit ?
                <Typography
                    component="h4"
                    variant="h4"
                    mb={5}
                >
                    {title}
                </Typography>
                :
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
            }

            {!isEdit ?
                <Typography
                    component="h4"
                    variant="h4"
                    mb={5}
                    mt={2}
                >
                    {description}
                </Typography>
                :
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                />
            }
        </div>
    )
}

function SubmissionList() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return(
        <div>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={() => setSelectedIndex(0)}
                >
                <ListItemText primary="Participant 1" />
                <ListItemSecondaryAction>
                    <Button>Download Submission</Button>
                </ListItemSecondaryAction>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={() => setSelectedIndex(1)}
                >
                <ListItemText primary="Participant 2" />
                <ListItemSecondaryAction>
                    <Button>Download Submission</Button>
                </ListItemSecondaryAction>
                </ListItemButton>
            </List>

            <Button>
                Choose winner
            </Button>
        </div>
    )
}


export default function EventEdit() {
    const [value, setValue] = React.useState(0);

    const handleChange = ((e,newValue)=>{
       setValue(newValue);
    });

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Event page"  />
                        <Tab label="Submissions"  />
                        <Tab label="Item Three"  />
                    </Tabs>
                </Box>
                <EditPanel
                    value={value}
                    index={0}
                />
                <SubmissionPanel
                    value={value}
                    index={1}
                />
                {/* <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel> */}
            </Box>
        </ThemeProvider>
    )
}