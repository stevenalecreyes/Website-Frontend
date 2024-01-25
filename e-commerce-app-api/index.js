const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require('./routes/userRoutes');
const product = require('./routes/productRoutes');


const app = express();
const port = 4000;

mongoose.connect("mongodb+srv://admin:admin123@cluster0.dorhhxo.mongodb.net/E_Commerce_Website?retryWrites=true&w=majority&appName=AtlasApp", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => console.log("We're connected to the cloud database"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/users', user); 
app.use('/products', product);

if(require.main == module) {
	app.listen(port, () => console.log(`Server is running at port ${port}`));
}

module.exports = app;

