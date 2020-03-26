const express = require('express')
const app = express()
const port = 3000

var objects = {}

function generateId() {
	var id = 0;
	do {
		for (var i = 0; i < 5; ++i) {
			id *= 10;
			id += Math.floor(Math.random()*10)
		}
	} while (objects.hasOwnProperty(id.toString()));
	return id.toString();
}
// express configuration
app.use(express.json({type: '*/*'}));

// Set your routes
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', function (req, res) {
    
    res.send(`Received object. ${JSON.stringify(req.body)}`);

});
app.post('/share/', function (req, res) {
	id = generateId();
	objects.id = req.body;
    result = {"success":true,"link":"http://localhost:3000/"+id};
	app.get('/'+id, function (req, res) {
		res.send(`${JSON.stringify(objects.id)}`);
		objects.id = {"success":false,"error":404,"message":"Not Found"}
	});
    res.send(`${JSON.stringify(result)}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))