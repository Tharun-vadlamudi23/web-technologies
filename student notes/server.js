const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");   // added

const app = express();

app.use(express.json());
app.use(cors());                // added

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentNotes")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const NoteSchema = new mongoose.Schema({
 title: String,
 subject: String,
 description: String,
 created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model("Note", NoteSchema);

// Add Note
app.post("/notes", async (req,res)=>{
 const note = new Note(req.body);
 await note.save();
 res.json(note);
});

// View Notes
app.get("/notes", async(req,res)=>{
 const notes = await Note.find();
 res.json(notes);
});

// Update Note
app.put("/notes/:id", async(req,res)=>{
 await Note.findByIdAndUpdate(req.params.id, req.body);
 res.json({message:"Note Updated"});
});

// Delete Note
app.delete("/notes/:id", async(req,res)=>{
 await Note.findByIdAndDelete(req.params.id);
 res.json({message:"Note Deleted"});
});

app.listen(3000, ()=>console.log("Server running on port 3000"));