import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getAllTags } from './firebase/firebaseFunction';

// This is the main function that returns the temporaryDrawer component
export default function TemporaryDrawer({ onTagClick }) {
  const [state, setState] = React.useState(false);

  // Define a function that toggles the drawer's open/closed state based on the anchor position
  const toggleDrawer = (open) => (event) => {
    // Do nothing if the key pressed is the "Tab" or "Shift" key
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // Set the new state for the drawer
    setState( open );
  };

  // get tags from firebase
  const [tags, setTags] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const Data = await getAllTags('hackathonTags');
      setTags(Data);
    }
    fetchData();
  }, []);

  // Define a function that renders the list of tags for the drawer
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="tag"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/* {['JavaScript', 'Python', 'C++', 'Red'].map((tag) => ( */}
        {tags.map((tag) => (
          <ListItem key={tag} disablePadding>
            <ListItemButton onClick={() => {
              // Call the onTagClick function with the selected tag as an argument
              onTagClick(tag)
            }}>
              <ListItemText primary={tag} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          {/* Add a button that triggers the drawer */}
          <Button
            variant="outlined"
            onClick={toggleDrawer(true)}
            sx={{
              color: '#6D7681',
              borderRadius: '10px',
              borderColor: '#6D7681',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '16px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#FF9300',
                color: '#FF9300',
            },
            }}
          >
            TAG
          </Button>
          {/* Add a drawer component that displays the list of tags */}
          <Drawer
            anchor={'right'}
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
