import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// This is the main function that returns the temporaryDrawer component
export default function TemporaryDrawer({onTagClick}) {
  const [state, setState] = React.useState(false);

  // Define a function that toggles the drawer's open/closed state based on the anchor position
  const toggleDrawer = (anchor, open) => (event) => {
    // Do nothing if the key pressed is the "Tab" or "Shift" key
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    // Set the new state for the drawer
    setState({ state, [anchor]: open });
  };

  // Define a function that renders the list of tags for the drawer
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="tag"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['JavaScript', 'Python', 'C++', 'Red'].map((tag) => (
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
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* Add a button that triggers the drawer */}
          <Button variant="outlined" onClick={toggleDrawer(anchor, true)}>TAG</Button>
          {/* Add a drawer component that displays the list of tags */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
