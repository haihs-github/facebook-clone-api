// Import the Express library
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// doc file .env
dotenv.config();

//ket noi db
mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("loi:", err));

// taoj express app
const app = express();
const port = 8800; //cong 

// middlewares
app.use(cors()); // cho phep React goi api
app.use(express.json()); // de doc json tu request body

// tao route
app.get("/", (req, res) => {
	res.send("hello world");
});

//import route auth
const authRoute = require('./routes/auth');
app.use("/api/auth", authRoute);

//import route user
const userRoute = require('./routes/user');
app.use("/api/users", userRoute)

// chạy server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
