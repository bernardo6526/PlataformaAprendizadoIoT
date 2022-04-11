const fs = require('fs')

// Imports
const express = require('express')
const app = express()
const port = 3000

var https = require('https');
const { Console } = require('console');
var server = https.createServer(app);

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
    let usuario = {
        id: Math.random().toString().replace('0.', ''), 
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha, 
    };

    let json = fs.readFileSync('./db/usuario.json', 'utf8');

    json = json.split("\n");

    let obj = [];
    try{
        for(i=0;i<json.length;i++){
            json[i] = JSON.stringify(json[i]);
            console.log(json[i]);
            let new_obj = JSON.parse(json[i]);
            console.log(new_obj.username);
            obj = [...obj,new_obj];
        }
    }catch(Exception){
        console.log(Exception);
    }
    
    obj = [...obj,usuario];

    console.log('HI');
    for(i=0;i++;i<obj.length){
        console.log(obj[i].username);
    }

    console.log("my object: %o", obj);

    let data = JSON.stringify(usuario);

    fs.appendFile('./db/usuario.json', data+"\n", function (err) {
        if (err) throw err;               console.log('Usuario Salvo');
    });
    res.redirect('back'); 
    teste();
});

server.listen(process.env.PORT, process.env.IP);

var teste = function (){
    console.log('FOISE');
}




