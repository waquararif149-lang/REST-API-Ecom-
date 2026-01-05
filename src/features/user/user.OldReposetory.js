import { getdb } from "../../config/mongodb.js";


 class UserRepository{
    
     async SignUp(newUser){
            try{
            //1.get the database
            const db=getdb();
            //2.get the collection
            const collection=db.collection("users");
            
            // const id=users.length+1;
            // const user=new UserModal(
            //     null,
            //     name,
            //     email,
            //     password,
            //     type,
            // )
            //3.insert the document
           await collection.insertOne(newUser);
            // users.push(user);
            return newUser;
        }catch(err){
            console.log(err);
            throw new ApplicationError('something went wrong',500);
        }
     }

     async findbyEmail(email){
        const db=getdb();
        const collection=db.collection('users');
        return await collection.findOne({email});
    }

    //  async SignIn(email,password){
    //     const db=getdb();
    //     const collection=db.collection('users');
    //     return await collection.findOne({email,password});
    //  }
}
export default UserRepository;