import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, OutlinedInput, InputAdornment, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ListComponent = () => {
  const defaultItems = [
    'Welcome to Notepad !!',
    'Enter an item and click Add to add the item.',
    'Click on the Delete button next to an item to delete it.'
  ];

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Load items from local storage when the component mounts
    const storedItems = localStorage.getItem('notepadItems');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      if (parsedItems.length === 0) {
        setItems(defaultItems);
      } else {
        setItems(parsedItems);
      }
    } else {
      setItems(defaultItems);
    }
  }, []);

  useEffect(() => {
    // Save items to local storage whenever items change
    localStorage.setItem('notepadItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem) {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItem('');
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <Box sx={{ mt: 2, p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <OutlinedInput
        placeholder="Enter a New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        variant="outlined"
        sx={{ mr: 1, width: 'auto' }}
        endAdornment={
          <InputAdornment position="end">
            <Button variant="contained" onClick={addItem} size="large">
              Add
            </Button>
          </InputAdornment>
        }
      />
      <br />
      <List sx={{ width: '100%' }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            }
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} // Adjusting alignment
          >
            <ListItemText 
              primary={item} 
              sx={{ 
                maxWidth: 'calc(100% - 50px)', // Adjust maxWidth to prevent overlap with the button
                wordBreak: 'break-word' // Ensuring text breaks into next line
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListComponent;
