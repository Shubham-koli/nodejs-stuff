const {
    MongoClient,
    ObjectID
} = require("mongodb");

MongoClient.connect(
    "mongodb://localhost:27017/TodoApp", {
        useNewUrlParser: true
    },
    (err, client) => {
        if (err) {
            return console.log("Unable to connect to MongoDB server");
        }
        console.log("Connected to MongoDB server");
        const db = client.db("TodoApp");
        db.collection('Todos').find().toArray().then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            if (err) {
                console.log('Unable to Fetch the data from database', err);
            }
        });

        client.close();
    });