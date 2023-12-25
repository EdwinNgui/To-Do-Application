
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://programusername:<password>@productdata.foqfygc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



//Note
//USE REACT QUERY THROUGH THUNK => Hooks like useQuery and useMutation
//In React application use API calls => Axios or fetch
//In Thunk action functions => call API to make requests to server => E.g. to authenticate user
//useReact hooks like useQuery and useMutation to fetch data

//programusername
//testingmongodb