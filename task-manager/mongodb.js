// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require("mongodb");

const connectionURL="mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser : true}, (error, client)=>{
    if(error){
        return console.log("unable to connect "+error);
    }

    const db = client.db(databaseName);

    // db.collection("user").deleteMany({
    //     age: 16,
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    // const updatePromise=db.collection("user").updateOne({
    //     _id: new ObjectID("61b46e8c0d5104576177d1b1"),
    // },{
    //     $set:{
    //         name: "Aziz",
    //     }
    // })
    // updatePromise.then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })
    //short-hand
    // db.collection("user").updateOne({
    //     _id: new ObjectID("61b46e8c0d5104576177d1b1"),
    // },{
    //     $set:{
    //         name: "Aziz",
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    // db.collection("user").insertOne({
    //     name: "Rashid",
    //     age: 20,
    // },(error, result)=>{
    //     if(error){
    //         return console.log("unable to insert");
    //     }
    //     console.log(result.ops);
    // })

    // db.collection("user").insertMany([
    //     {
    //         name: "Alive Walker",
    //         age: 21,
    //     },
    //     {
    //         name: "Nawab",
    //         age: 16,
    //     }
    // ],(error, result)=>{
    //     if(error){
    //         return console.log("unable to insert");
    //     }
    //     console.log(result.ops);
    // })

    // db.collection("user").findOne({name: "Rashid"},(error, user)=>{
    //     if(error){
    //         return console.log("unable to fetch");
    //     }
    //     console.log(user);
    // })
    // // for searching by id _id: new ObjectID("ab23bnsii8373")
    db.collection("user").find({name: "lets try1"}).toArray((error, user)=>{
        if(error){
            return console.log("unable to fetch");
        }
        console.log(user);
    })
    db.collection("user").find({name: "Rashid"}).count((error, user)=>{
        if(error){
            return console.log("unable to fetch");
        }
        console.log(user);
    })
})