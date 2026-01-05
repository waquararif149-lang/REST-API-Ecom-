import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
const dbName = "ecomsdb";

let client = null;
let db = null;

export const connectMongoDB = async () => {
    try {
        client = new MongoClient(url, { maxPoolSize: 10 });
        await client.connect();
        db = client.db(dbName);
        console.log("MongoDB is connected");
       await Createcounter(db);
       await CreateIndexes(db);
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

export const getdb = () => {
    if (!db) {
        throw new Error("Database not initialized. Call connectMongoDB() first.");
    }
    return db;
};

export const getClient=()=>{
   return client;
}

const  Createcounter=async (db)=>{
   const existingCounter= await db.collection("counters").findOne({_id:"cartItemid"});
   if(!existingCounter){
      await db.collection("counters").insertOne({_id:"cartItemid",value:0});
   }
}

const CreateIndexes=async (db)=>{
    try{
        //this is single index
    await db.collection("products").createIndex({name:1});
    //this is text index
    await db.collection("products").createIndex({desc:"text"});
    //this is compound index
    await db.collection("products").createIndex({price:1,category:-1});
    }catch(err){
        console.log(err);
    }
    console.log("index is created");
}