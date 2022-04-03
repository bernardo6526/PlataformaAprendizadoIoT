const fs = require('fs')

// Imports
const express = require('express')
const app = express()
const port = 3000

var http = require('http');
var server = http.createServer(app);

// Static Files
app.use(express.static('public'));
// Specific folder example
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index', { text: 'Hey' })
})

app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/views/about.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.post('/', function(req, res) {
    console.log(req.body.email);
    //res.sendStatus(200);
    teste();
});

server.listen(process.env.PORT, process.env.IP);

var teste = function (){
    console.log('FOISE');
}

fs.writeFile('result.txt', 'This is my text', function (err) {
    if (err) throw err;               console.log('Results Received');
}); 



