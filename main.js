const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

app.use(fileUpload());

app.use(cors());

app.get("/", (req, res, next) => {
	res.status(200).send('');
});

app.post("/upload", (req, res, err) => {
	console.log(req.files);
	const file = req.files.data;
	file.mv("./uploads/"+file.name, (err, result) => {
	});
	res.send({
		success: true,
		message: "File uploaded"
	});
});
app.get("/getAirportList", (req, res, err) => {
	let rawdata = fs.readFile('./uploads/airports.json', (err, data) => {
    	if (err) throw err;
	let airports = JSON.parse(data);
	airports = airports.slice(0,50);
	res.send({
		success: true,
		airports: airports
	});
    });
});
app.listen(3200, () => {
	console.log('listening on 3200');
});
