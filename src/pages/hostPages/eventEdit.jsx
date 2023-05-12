import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../Components/theme";
import * as React from 'react';
import { useParams } from "react-router";
import { addHackathon, downLoadFile, getHackathon, retrieveDocFromSubCollection, retriveSubCollections } from "../../Components/firebase/firebaseFunction";
import { AppContext } from "../../Components/AppContextProvider";
import { ref } from "@firebase/storage";
import { storage } from "../../firebaseConfig";

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

    const handleSave = async ()=>{
        setEdit(!isEdit);

        const newData = {
            id: hackathonid,
            title: title,
            description: description
        }
        await addHackathon(newData);

    };

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
            setSubmissions([...data]);
        });
    },[hackathonid]);

    function ParticipantAnswer({userID}){
        const [questions,setQuestions] = React.useState([]);
        const [answers,setAnswers] = React.useState([]);

        React.useEffect(()=>{
            const user = retrieveDocFromSubCollection(hackathonid,'Submissions',userID);
            user.then(function(result){
                setQuestions(result.questions);
                setAnswers(result.answers);
            });
        },[hackathonid]);

        return(
            <div>
                {questions.map((q,index)=>(
                    <Box key={index} sx={{mb:2}}>
                        <Typography>
                            {q}
                        </Typography>
                        <Typography>
                            {answers[index]}
                        </Typography>
                    </Box>
                ))}
            </div>
        )
    }

    return(
        <div>
            <List component="nav" aria-label="secondary mailbox folder">
                {submissions.map((sub,index) => (
                    <div>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => setSelectedIndex(index)}
                            key={index}
                        >
                        <ListItemText primary={sub} />
                        <ListItemSecondaryAction>
                            <Button>Download File</Button>
                        </ListItemSecondaryAction>
                        </ListItemButton>

                        {selectedIndex === index && <ParticipantAnswer userID={sub}/>} 
                    </div>
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


function EditForm({hackathonid}){
    const [regQuestions,setRegQuestions] = React.useState([]);
    const [regRequirements, setRegRequirements] = React.useState('');

    const [subQuestions,setSubQuestions] = React.useState([]);
    const [subRequirements, setSubRequirements] = React.useState('');

    const handleRegQuestion = () => {
        setRegQuestions([...regQuestions,""]);
    }

    const handleSubQuestion = () => {
        setSubQuestions([...subQuestions,""]);
    }

    const handleSave = async ()=>{
        const newData = {
            id: hackathonid,
            regQuestions: regQuestions,
            regRequirements: regRequirements,
            subQuestions: subQuestions,
            subRequirements: subRequirements
        }
        await addHackathon(newData);

    };

    React.useEffect(()=>{
        const sub = getHackathon(hackathonid);
        sub.then(function(result){
            setRegRequirements(result.regRequirements);
            setRegQuestions(result.regQuestions);
            setSubRequirements(result.subRequirements);
            setSubQuestions(result.subQuestions);
        });
    },[hackathonid]);

    function SubmissionQuestion({index,subQuestion}) {
        const [question, setQuestion] = React.useState(subQuestion);

        const handleChange = (e) => {
            setQuestion(e.target.value);

            subQuestions[index] = e.target.value;
        }

        return (
            <div>
                <TextField
                    value={question}
                    onChange={handleChange}
                />
                <Button onClick={()=>{
                    subQuestions.splice(index,1);
                    setSubQuestions([...subQuestions]);
                }}>
                    X
                </Button>
            </div>
        )
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
            <TextField
                id="reg-requirements"
                label="Registration Requirements"
                multiline
                rows={4}
                sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                value={regRequirements}
                onChange={(e)=> {setSubRequirements(e.target.value)}}
                fullWidth
                placeholder="Mention any requirements for registration, as well as any required files (one upload)"
            />

            <Typography>
                Submission questions
            </Typography>
            {subQuestions.map((subQuestion,index) => (
                <SubmissionQuestion key={index} index={index} subQuestion={subQuestion}/>
            ))}
            <Button onClick={handleSubQuestion}>
                Add question
            </Button>
            <TextField
                id="reg-requirements"
                label="Submission Requirements"
                multiline
                rows={4}
                sx = {{paddingTop:'10px',paddingBottom:'10px'}}
                value={subRequirements}
                onChange={(e)=> {setSubRequirements(e.target.value)}}
                fullWidth
                placeholder="Mention any requirements for submission, as well as any required files (one upload)"
            />

            <Button>
                Cancel
            </Button>
            <Button
                onClick={handleSave}
            >
                Save
            </Button>
        </Box>
    )
}

function RegistrationList({hackathonid}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [registrations,setRegistrations] = React.useState([]);

    const handleDownload = () => {
        downLoadFile()
    }

    function ParticipantAnswer({userID}){
        const [questions,setQuestions] = React.useState([]);
        const [answers,setAnswers] = React.useState([]);

        React.useEffect(()=>{
            const user = retrieveDocFromSubCollection(hackathonid,'Registrations',userID);
            user.then(function(result){
                setQuestions(result.questions);
                setAnswers(result.answers);
            });
        },[hackathonid]);

        return(
            <div>
                {questions.map((q,index)=>(
                    <Box key={index} sx={{mb:2}}>
                        <Typography>
                            {q}
                        </Typography>
                        <Typography>
                            {answers[index]}
                        </Typography>
                    </Box>
                ))}
            </div>
        )
    }

    React.useEffect(()=>{
        const reg = retriveSubCollections(hackathonid,'Registrations');

        reg.then(function(result){
            const data = result.map((doc)=>{
                return doc.data().user;
            });
            setRegistrations([...data]);
        });
    },[hackathonid]);


    return(
        <div>
            <List component="nav" aria-label="secondary mailbox folder">
                {registrations.map((reg,index) => (
                    <div>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => setSelectedIndex(index)}
                            key={index}
                        >
                        <ListItemText primary={reg} />
                        <ListItemSecondaryAction>
                            <Button
                                onClick={()=>{
                                    const fileRef = ref(storage, 'hackathons/'+hackathonid+'/registrations/'+reg);
                                    downLoadFile(fileRef);
                                }}
                            >Download File</Button>
                        </ListItemSecondaryAction>
                        </ListItemButton>

                        {selectedIndex === index && <ParticipantAnswer userID={reg}/>} 
                    </div>
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
                    <EditForm
                        hackathonid={id}
                    />
                </TabPanel>
            </Box>
        </ThemeProvider>
    ) : (<></>)
}