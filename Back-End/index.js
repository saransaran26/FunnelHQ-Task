import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Usermodel } from "./models/User.js";
import { TodoModel } from "./models/Todo.js";

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URL =
  "mongodb+srv://saranchakravarthy26:guvi@b49tamil.zmmqlo1.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("MongoDB Connected Succesfully"))
  .catch((err) => console.log("MongoDB is not connected", err));

app.post("/api/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await Usermodel.findOne({ name });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }
    const hashedpass = await bcrypt.hash(password, 10);
    const updateUser = new Usermodel({ name, password: hashedpass });
    await updateUser.save();
    // user = await new Usermodel({name,password:hashedpass}).save()
    res.status(201).json({ updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await Usermodel.findOne({ name });
    if (!user) {
      return res.status(400).json({ error: "User not yet Registered" });
    }
    const matchedpass = await bcrypt.compare(password, user.password);
    if (!matchedpass) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ name: user.name }, "GUVI");
    res.status(200).json({token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
});

app.get('/',async(req,res)=>{
  try {
    const todo = await TodoModel.find()
    if(!todo){
      return res.status(400).send("no data found")
    }
    res.status(200).send(todo)
  } catch (error) {
    res.status(500).json({error:error})
  }
})

app.post('/create',async(req,res)=>{
  const data = new TodoModel(req.body)
  try {
    const saveddata = await data.save()
    res.status(201).send(saveddata)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.put('/edit/:id',async(req,res)=>{
  try {
    const data = await TodoModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).send(data)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.delete('/delete/:id',async(req,res)=>{
  try {
    const data = await TodoModel.findByIdAndDelete(req.params.id)
    res.send(data)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.listen(3000, () => {
  console.log("server is Running on port 3000");
});
