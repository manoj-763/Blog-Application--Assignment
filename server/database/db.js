import mongoose from "mongoose"

const Connection = async(USERNAME,PASSWORD)=>{
    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-vv3p1vz-shard-00-00.r3vy6oa.mongodb.net:27017,ac-vv3p1vz-shard-00-01.r3vy6oa.mongodb.net:27017,ac-vv3p1vz-shard-00-02.r3vy6oa.mongodb.net:27017/?ssl=true&replicaSet=atlas-zb9vcj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    try{
       await mongoose.connect(URL, {useNewUrlParser: true});
       console.log('Database connected successfully !')
    }catch (error){
        console.log('Error while connecting with the database', error)
    }
}

export default Connection