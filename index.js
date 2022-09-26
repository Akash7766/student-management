const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(express.json());
app.use(cors());
// userName: akash7766
// pass: 3Os2SIOeXGwZvOQE

const uri =
  "mongodb+srv://akash7766:3Os2SIOeXGwZvOQE@cluster0.16hjm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const studentCollection = client.db("studentDB").collection("student");

    app.get("/student", async (req, res) => {
      const query = {};
      const cursor = studentCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/student", async (req, res) => {
      const todo = req.body;
      const result = await studentCollection.insertOne(todo);
      res.send(result);
    });
    app.delete("student/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      };
      const result = await studentCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // .
  }
}
run().catch(console.dir);

// get method
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server is running at ", port);
});
