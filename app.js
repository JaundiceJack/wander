// Import Libraries
const path = require('path');
const express = require('express');

// Instance the express app
const app = express();

// Body parser middleware
app.use(express.json());

// Define a route to ensure the server is functioning
app.get('/ping', (req, res) => { return res.send('pong'); });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  })
}

// Start the app on the env port or port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
