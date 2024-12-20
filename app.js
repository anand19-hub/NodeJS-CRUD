const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database (a simple array of items)
let items = [];

// Root Route: Respond with a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Simple CRUD API!');
});

// CRUD Operations

// 1. Create (POST): Add a new item
app.post('/items', (req, res) => {
  const { name } = req.body; // Extract 'name' from request body
  if (!name) {
    return res.status(400).send({ error: 'Name is required' }); // Validate input
  }
  const newItem = { id: items.length + 1, name }; // Create new item with unique ID
  items.push(newItem); // Add new item to the in-memory database
  res.status(201).send(newItem); // Respond with the created item
});

// 2. Read (GET): Fetch all items
app.get('/items', (req, res) => {
  res.send(items); // Respond with the list of items
});

// 3. Update (PUT): Update an item by ID
app.put('/items/:id', (req, res) => {
  const { id } = req.params; // Extract 'id' from request parameters
  const { name } = req.body; // Extract 'name' from request body

  const item = items.find((i) => i.id === parseInt(id)); // Find the item by ID
  if (!item) {
    return res.status(404).send({ error: 'Item not found' }); // Validate item existence
  }
  if (!name) {
    return res.status(400).send({ error: 'Name is required' }); // Validate input
  }

  item.name = name; // Update the item's name
  res.send(item); // Respond with the updated item
});

// 4. Delete (DELETE): Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params; // Extract 'id' from request parameters
  const index = items.findIndex((i) => i.id === parseInt(id)); // Find the item's index
  if (index === -1) {
    return res.status(404).send({ error: 'Item not found' }); // Validate item existence
  }

  const deletedItem = items.splice(index, 1); // Remove the item from the array
  res.send(deletedItem); // Respond with the deleted item
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
