import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../Components/theme";
import * as React from 'react';
import { useParams } from "react-router";
import { getHackathon } from "../../Components/firebase/firebaseFunction";

const TabPanel = ({children,index,value}) => { 
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {children}
      </div>
    );
}

function EditComponent({hackathonid,title,description,setTitle,setDescription}) {
    const [isEdit,setEdit] = React.useState(false);

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

    const { id } = useParams();

    const handleChange = ((e,newValue)=>{
       setValue(newValue);
    });

    const hackathon = getHackathon(id);
    const [title,setTitle] = React.useState("test");
    const [description,setDescription] = React.useState("test");
    const [validHackathon,setValidHackathon] = React.useState(false);

    React.useEffect(() => {
        hackathon.then(function(result){
            console.log(result);
            setTitle(result.title);
            setDescription(result.description);
    
            setValidHackathon(true);
        });
    },[id]);
    

    return validHackathon ? (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Event page"  />
                        <Tab label="Submissions"  />
                        <Tab label="Registrations"/>
                        <Tab label="Edit forms"/>
                    </Tabs>
                </Box>
                <TabPanel
                    value={value}
                    index={0}
                >
                    <EditComponent
                        hackathonid={id}
                        title={title}
                        description={description}
                        setTitle={setTitle}
                        setDescription={setDescription}
                    />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}
                >
                    <SubmissionList/>
                </TabPanel>
            </Box>
        </ThemeProvider>
    ) : (<></>)
}