const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.devqdpr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });  https://doctor-server-side.vercel.app/user


async function run() {
    try {

        const serviceCollection = client.db('doctorDB').collection('services');

        app.get('/services', async (req, res) => {

            const query = {}
            const cursor = serviceCollection.find(query);

            const services = await cursor.toArray();
            res.send(services);

        });
        app.get('/treeServices', async (req, res) => {

            const query = {}
            const cursor = serviceCollection.find(query);

            const services = await cursor.limit(3).toArray();
            res.send(services);

        });

        app.get('/services/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service);

        });





    }
    finally {

    }

}

run().catch(err => console.error(err));


async function run() {
    try {

        const userCollection = client.db('doctorDB').collection('review');

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user)
            res.send(result);
        });




    }
    finally {

    }

}

run().catch(err => console.error(err));




app.get('/', (req, res) => {
    res.send('doctor server is running')
});

app.listen(port, () => {
    console.log(`doctor server running on ${port}`)
})

