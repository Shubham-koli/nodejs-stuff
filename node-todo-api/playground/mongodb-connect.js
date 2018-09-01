// const MongoClient = require("mongodb").MongoClient;
const {
    MongoClient,
    ObjectID
} = require("mongodb");
const obj = new ObjectID();
console.log(obj.getTimestamp());

MongoClient.connect(
    "mongodb://localhost:27017/TodoApp",
    (err, client) => {
        if (err) {
            return console.log("Unable to connect to MongoDB server");
        }
        console.log("Connected to MongoDB server");
        // const db = client.db("TodoApp");

        // db.collection("Users").insertOne({
        //         name: "Shubham Koli",
        //         age: 22,
        //         location: "Solapur",
        //         completed: false
        //     },
        //     (err, result) => {
        //         if (err) {
        //             return console.log("Unable to insert User", err);
        //         }
        //         console.log(JSON.stringify(result.ops, undefined, 2));
        //     }
        // );
        client.close();
    }
);