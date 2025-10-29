const express = require('express'); // Import the Express library
// taoj express app
const app = express();
const port = 8800; //cong 

// tao route
app.get("/", (req, res) => {
	res.send("hello world")
})

// chạy server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
