const express = require('express');
const { MongoClient } = require('mongodb');
const port = 3000;

// Create an Express application
const app = express();

// Define MongoDB connection URL and database name
const mongoUrl = 'mongodb+srv://abhishek:BWRJdiO1VxQlePa8@cluster0.5dz3ppp.mongodb.net/'; // Replace with your MongoDB URL
const dbName = 'blog'; // Replace with your database name

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Express Demo App</h1> <h4>Message: Success</h4> <p>Version 1.1</p>');
})


// Endpoint to fetch data from MongoDB collection
app.get('/api/data', async (req, res) => {
  try {
    // Create a MongoDB client
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the collection you want to query
    const collection = db.collection('datasource'); // Replace with your collection name

    // Query the collection and retrieve data
    const data = await collection.find({}).toArray();

    // Close the MongoDB client connection
    client.close();

    // Send the data as a JSON response
    res.json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

