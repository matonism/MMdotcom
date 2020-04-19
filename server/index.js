var express = require('express'); // Express web server framework
// var request = require('request'); 
var cors = require('cors');
var fs = require('fs');
// const path = require('path')

// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');;
var bodyParser = require('body-parser');
// var serverController = require('./serverController.js');
// const fileUpload = require('express-fileupload');

var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/../public', {index: '/../public/pages/home/home.html'}))
.use(cors());
console.log(__dirname + '/../public');

app.get('/pages/*', handleRedirect);


function handleRedirect(req, res) {

    //TODO: Make this legible
    let requestUrl = req.originalUrl.replace('%23', '#');
    let relativeLinkSplit = requestUrl.split('#');
    var isFile = true; 
    fs.stat(__dirname + '/../public' + requestUrl, function(err, stats) {
        if (stats.isDirectory()) {
            isFile = false;
        }
        
        let splitURL = relativeLinkSplit[0].split('/pages/');
        if(splitURL.length > 1){
            if(!isFile){
                console.log('Request is for directory...');
                let targetUrl = req.originalUrl + '/index.html';
                res.sendFile(targetUrl, { root: __dirname + '/../public/' });
    
            }else if(!splitURL[1].includes('.html')){
                let targetUrl = req.originalUrl + splitURL[1].split('/')[0] + '.html';
                if(relativeLinkSplit.length > 1){
                    console.log('redirecting to...');
                    targetUrl = splitURL[0] + '/pages/' + splitURL[1] + '/' +  splitURL[1].split('/')[0] + '.html#' + relativeLinkSplit[1];
                    console.log(targetUrl);
                    res.redirect(targetUrl);
                }else{
                    console.log(targetUrl);
                    res.sendFile(targetUrl, { root: __dirname + '/../public/' });
                }
            }
    
        }
    });
    
}
// .use(cookieParser())
// .use(fileUpload({
// 	//cuts off file if its larger than specified number but does not throw error
//   limits: { fileSize: 6 * 1024 * 1024 },
// }));

// serverController.handleRequests(app);

var PORT = process.env.PORT || 3000;
console.log('Listening on 3000....');
app.listen(PORT);