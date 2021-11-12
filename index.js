const express = require("express");

const { MongoClient } = require('mongodb');

const ObjectId = require("mongodb").ObjectId;


const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.31irp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run (){
    try{
        await client.connect();
        // console.log('connect to database', );
        const database = client.db("Aura")
        const productsCollection = database.collection("products")
        const ordersCollection = database.collection("orders")

        
        //get API
        app.get('/products', async(req, res) =>{
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
      res.send(products);
        })
        //post API
      app.post('/products', async(req, res) =>{
          const product = req.body;
          console.log('hit the post api ', product)

          const result = await productsCollection.insertOne(product);
          console.log(result);
          res.json(result);
    });
    //GET Single product
    app.get("/products/:id", async (req, res) => {
        const id = req.params.id;
        console.log("specific product", id)
        const query = { _id: ObjectId(id) };
        const products = await productsCollection.findOne(query);
        res.json(products);
      });
      //delete API
      app.delete("/deleteProducts/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await productsCollection.deleteOne(query);
        res.json(result);
      });

      //Order API
      app.get('/orders', async(req, res) => { 
        const cursor = ordersCollection.find({});
        const order = await cursor.toArray();
        res.send(order);
    });

    app.post('/orders', async(req, res) => {
       const order = req.body;
       console.log('hit the api');
       const result = await ordersCollection.insertOne(order);
       res.json(result); 
    });
    //DELETE orders API
    app.delete("/deletePerches/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.json(result);
    });
    //Update Status API
    app.patch("/updateStatus/:id", (req, res) => {
      const id = ObjectId(req.params.id);
      ordersCollection
        .updateOne(
          { _id: id },
          {
            $set: { purchesStatus: req.body.updateStatus },
          }
        )
        .then((result) => {
          // console.log(result);
        });
    });
    


    }finally{
        //await client.close()
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Running Aura Server");
  });

  app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
    console.log("Running Aura on port", port);
  });