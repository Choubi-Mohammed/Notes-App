const mongoose=require("mongoose")
const ConnectDB=async()=>{
    try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("connect to MongoDb was seccessful.")
                
            } catch (error) {
                console.log("somthings is wrong.",error)
                
            }
}
module.exports=ConnectDB;