import UserModal from "../features/user/user.modal.js";

const basicAuth=(req,res,next)=>{
    const headers=req.headers["authorization"];
    //check if headers is empty
    //headers is a property of a req object which is an array which stores credentails in base64 formate like this ["Basic","qwerty34123qwe123"]
    if(!headers){
       return res.status(401).send('authorization details not foundsssss');
    }
    //extract the credentials 
    const base64Credential=headers.replace("Basic",'');
    //now we got this [qwerty34123qwe123]
    //now we have to decode this 
    const decodedCreds=Buffer.from(base64Credential,'base64').toString("utf8");
    //now we got the decoded credentials like this [email:password]
    //now split this to get email and password seprately
    const creds=decodedCreds.split(':');
    //now creds=[email,password]

    const user=UserModal.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);

    if(user){
        next();
    }else{
        res.status(401).send('invalid credentials');
    }

}
export default basicAuth;