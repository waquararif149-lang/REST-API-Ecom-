import ApplicationError from "../../../errorHandler/errorhandler.js";
import { getdb } from "../../config/mongodb.js";

export default class UserModal{
    constructor(name,email,password,type){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
    }

    static getAll(){
        return users;
    }
}

let users=[{
    id:1,
    name:"seller",
    email:"seller12@gmail.com",
    password:"password1",
    type:"seller"
},
{
    id:2,
    name:"customer",
    email:"seller32@gmail.com",
    password:"password2",
    type:"customer"
}
]