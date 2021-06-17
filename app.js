// Import Libraries
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// Instance the express app
const app = express();

// Body parser middleware
app.use(express.json());

// Get the mongo connection key
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log(err));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/photos', require('./routes/api/photos'))
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
