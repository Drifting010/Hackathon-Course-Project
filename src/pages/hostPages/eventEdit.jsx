import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../Components/theme";
import * as React from 'react';
import { useParams } from "react-router";
import { getHackathon, retriveSubCollections } from "../../Components/firebase/firebaseFunction";
import { AppContext } from "../../Components/AppContextProvider";

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

function SubmissionList({hackathonid}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [submissions,setSubmissions] = React.useState([]);

    React.useEffect(()=>{
        const sub = retriveSubCollections(hackathonid,'Submissions');

        sub.then(function(result){
            const data = result.map((doc)=>{
                return doc.data().user;
            });
            setSubmissions([...submissions,...data]);
        });
    },[hackathonid]);

    return(
        <div>
            <List component="nav" aria-label="secondary mailbox folder">
                {submissions.map((sub,index) => (
                    <ListItemButton
                        selected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                        key={index}
                    >
                    <ListItemText primary={sub} />
                    <ListItemSecondaryAction>
                        <Button>Download Submission</Button>
                    </ListItemSecondaryAction>
                    </ListItemButton>
                ))}
            </List>

            <Button
                onClick={()=>{console.log(submissions)}}
            >
                Choose winner
            </Button>
        </div>
    )
}


function EditForm(){
    const [regQuestions,setRegQuestions] = React.useState([]);

    const handleRegQuestion = () => {
        setRegQuestions([...regQuestions,""]);
    }

    function RegistrationQuestion({index,regQuestion}) {
        const [question, setQuestion] = React.useState(regQuestion);

        const handleChange = (e) => {
            setQuestion(e.target.value);

            regQuestions[index] = e.target.value;
        }

        return (
            <div>
                <TextField
                    value={question}
                    onChange={handleChange}
                />
                <Button onClick={()=>{
                    regQuestions.splice(index,1);
                    setRegQuestions([...regQuestions]);
                }}>
                    X
                </Button>
            </div>
        )
    }

    return (
        <Box>
            <Typography>
                Registration questions
            </Typography>
            {regQuestions.map((regQuestion,index) => (
                <RegistrationQuestion key={index} index={index} regQuestion={regQuestion}/>
            ))}
            <Button onClick={handleRegQuestion}>
                Add question
            </Button>
        </Box>
    )
}

function RegistrationList({hackathonid}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [registrations,setRegistrations] = React.useState([]);

    React.useEffect(()=>{
        const reg = retriveSubCollections(hackathonid,'Registrations');

        reg.then(function(result){
            const data = result.map((doc)=>{
                return doc.data().user;
            });
            console.log(data);
            setRegistrations([...registrations,...data]);
        });
    },[hackathonid]);


    return(
        <div>
            <List component="nav" aria-label="secondary mailbox folder">
                {registrations.map((reg,index) => (
                    <ListItemButton
                        selected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                        key={index}
                    >
                    <ListItemText primary={reg} />
                    <ListItemSecondaryAction>
                        <Button>Download Submission</Button>
                    </ListItemSecondaryAction>
                    </ListItemButton>
                ))}
            </List>
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
                        <Tab label="Registrations"  />
                        <Tab label="Submissions"/>
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
                    <RegistrationList
                        hackathonid={id}
                    />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={2}
                >
                    <SubmissionList
                        hackathonid={id}
                    />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={3}
                >
                    <EditForm/>
                </TabPanel>
            </Box>
        </ThemeProvider>
    ) : (<></>)
}