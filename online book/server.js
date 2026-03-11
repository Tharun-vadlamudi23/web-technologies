const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// ---------------- MONGODB CONNECTION ----------------

mongoose.connect("mongodb://127.0.0.1:27017/studentNotes")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// ---------------- BOOK SCHEMA ----------------

const BookSchema = new mongoose.Schema({
 title: String,
 author: String,
 category: String,
 price: Number,
 rating: Number,
 year: Number
});

const Book = mongoose.model("Book", BookSchema);


// ---------------- SEARCH BOOK BY TITLE ----------------

app.get("/books/search", async(req,res)=>{

 const title = req.query.title;

 const books = await Book.find({
  title: { $regex: title, $options: "i" }
 });

 res.json(books);

});


// ---------------- FILTER BY CATEGORY ----------------

app.get("/books/category/:category", async(req,res)=>{

 const books = await Book.find({
  category: req.params.category
 });

 res.json(books);

});


// ---------------- SORT BY PRICE ----------------

app.get("/books/sort/price", async(req,res)=>{

 const books = await Book.find().sort({ price: 1 });

 res.json(books);

});


// ---------------- SORT BY RATING ----------------

app.get("/books/sort/rating", async(req,res)=>{

 const books = await Book.find().sort({ rating: -1 });

 res.json(books);

});


// ---------------- TOP RATED BOOKS ----------------

app.get("/books/top", async(req,res)=>{

 const books = await Book.find({
  rating: { $gte: 4 }
 }).limit(5);

 res.json(books);

});


// ---------------- PAGINATION ----------------

app.get("/books", async(req,res)=>{

 const page = parseInt(req.query.page) || 1;
 const limit = 5;

 const books = await Book.find()
 .skip((page - 1) * limit)
 .limit(limit);

 res.json(books);

});


// ---------------- SERVER ----------------

app.listen(3000, ()=>console.log("Server running on port 3000"));