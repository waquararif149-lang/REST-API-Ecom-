import UserRepository from "./user.repository.js";
import UserModal from "./user.modal.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export default class UserControler {

  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async SignUp(req, res,next) {
    try {
      const PASSWORD_REGEX =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { name, email, password, type } = req.body;
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).send({
        message: "Password must be at least 8 chars, with uppercase, lowercase, number & special char"
      });
    }
    const hashPssword = await bcrypt.hash(password, 12);
      const user = new UserModal(name, email, hashPssword, type);
      await this.userRepository.SignUp(user);
      res.status(201).send(user);
    } catch (err) {
      next(err);
      // res.status(500).send(err.message);
    }
  }

  async SingIn(req, res) {
    const user = await this.userRepository.findbyEmail(req.body.email);
    if (!user) {
      res.status(400).send("Invalid credentials");
    } else {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        //create jwt token
        const token = jwt.sign({
          userId: user._id,
          userEmail: user.email
        }, process.env.SECRET_KEY, {
          expiresIn: '1h'
        })
        //send this token through res
        res.status(200).send(token);
      } else {
        res.status(400).send("Invalid credentials");
      }
    }
  }

  async resetPassword(req,res){
      const userId=req.userId;
      const {resetPassword}=req.body;
      const hashPssword=await bcrypt.hash(resetPassword,12);
    try{
      await this.userRepository.resetPassword(userId,hashPssword);
      res.status(200).send("password reset");
    }catch(err){
      throw err;
    }
  }
}