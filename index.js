const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://mern-batch-n242-2-authentication:nayeem@cluster0.guep9xh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    const categoriesCollection = client.db("mern-batch-n242-2-authentication").collection("categories")
    const allCategories = client.db('mern-batch-n242-2-authentication').collection("allCategories")
    app.get('/news/categories',async (req,res)=>{
        const query = {};
        const cursor = await categoriesCollection.find(query).toArray()
        res.send(cursor)
    })

    app.get('/news/categories/:id',async (req,res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {category_id: id };
      const cursor = await allCategories.find(query).toArray()
      res.send(cursor)
    })

    app.get('/news/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: id}
      const cursor = await allCategories.find(query).toArray()
      res.send(cursor)
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})