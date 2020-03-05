var express = require('express'); // Express web server framework
// var request = require('request'); 
var cors = require('cors');
// const path = require('path')

// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');;
var bodyParser = require('body-parser');
// var serverController = require('./serverController.js');
// const fileUpload = require('express-fileupload');

var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/../public'))
.use(cors());
console.log(__dirname + '/../public');
// .use(cookieParser())
// .use(fileUpload({
// 	//cuts off file if its larger than specified number but does not throw error
//   limits: { fileSize: 6 * 1024 * 1024 },
// }));

// serverController.handleRequests(app);

var PORT = process.env.PORT || 5000;
console.log('Listening on 5000....');
app.listen(PORT);