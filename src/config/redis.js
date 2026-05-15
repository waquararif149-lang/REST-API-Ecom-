import {createClient} from "redis";

const redisClient=createClient({
    url:process.env.REDIS_URL
})

redisClient.on("connect",()=>{
    console.log("redis is connected")
})

redisClient.on("error",(err)=>{
    console.log(err);
})

export default redisClient;