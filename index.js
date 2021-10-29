/* 
Project Name: exploreDream
Project Author: Joy Chandra Mollik
Project Start Date: 10/29/2021
Project Type: Traveling and Tourism
 */

// dependencies
const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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

		// defining database and collections
		const database = client.db('exploreDream');
		const tourCollection = database.collection('tours');
		const bookingCollection = database.collection('bookings');

		// making api to send and receive data

		// GET api to send tours
		app.get('/tours', async (req, res) => {
			const cursor = tourCollection.find({});
			const tours = await cursor.toArray();

			res.send(tours);
		});

		// GET api to send single tour
		app.get('/tourdetail/:id', async (req, res) => {
			const id = req.params.id;

			const query = { _id: ObjectId(id) };
			const tour = await tourCollection.findOne(query);
			res.send(tour);
		});

		// GET api to send orders by uid
		app.get('/bookings/:user_id', async (req, res) => {
			const user_id = req.params.user_id;

			const query = { user_id: user_id };
			const cursor = bookingCollection.find(query);
			const bookings = await cursor.toArray();
			res.send(bookings);
		});

		// POST api to store tour
		app.post('/addtour', async (req, res) => {
			const tour = req.body;

			const result = await tourCollection.insertOne(tour);
			res.json(result);
		});

		// POST api to store booking
		app.post('/addbooking', async (req, res) => {
			const order = req.body;

			const result = await bookingCollection.insertOne(order);
			res.json(result);
		});

		// DELETE api to cancel booking
		app.delete('/cancelbooking/:bookingid', async (req, res) => {
			const bookingId = req.params.bookingid;
			console.log(bookingId);
			const query = { _id: ObjectId(bookingId) };

			const result = await bookingCollection.deleteOne(query);
			res.send(result);
		});
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
