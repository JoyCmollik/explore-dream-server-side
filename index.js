/* 
Project Name: exploreDream
Project Author: Joy Chandra Mollik
Project Start Date: 10/29/2021
Project Type: Traveling and Tourism
 */

// dependencies
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// mongodb initialization
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6vvik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		console.log('database connected');
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

// testing
app.get('/', (req, res) => {
	res.send('Server is running fine');
});

app.listen(port, () => {
	console.log('[RUNNING] server on port: ', port);
});
