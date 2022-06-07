const fs = require('fs')
const request = require('request');

// Imports
const express = require('express')
const app = express()
const port = 3000

var https = require('https');
const { Console } = require('console');
var server = https.createServer(app);

var logado = false;
var user;
var id_user;


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
    logado=false;
})

app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/views/about.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.post('/gosign', function(req, res) {
    res.render('signup.ejs');
});

app.post('/signup', function(req, res) {
    let usuario = {
        id: Math.random().toString().replace('0.', ''), 
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha, 
    };

    let json = fs.readFileSync('../db/usuario.json', 'utf8');

    json = json.split("\n");

    let obj = [];
    for(i=0;i<json.length-1;i++){ // length-1 ignore extra line
        let new_obj = JSON.parse(json[i]);
        obj = [...obj,new_obj];
    }
    
    obj = [...obj,usuario];

    //console.log("my object: %o", obj);

    let data = JSON.stringify(usuario);

    fs.appendFile('../db/usuario.json', data+"\n", function (err) {
        if (err) throw err;               console.log('Usuario Salvo');
    });
    res.render('index.ejs') ;
    teste();
});

app.post('/login', function(req, res) {
    let usuario = {
        id: Math.random().toString().replace('0.', ''), 
        login: req.body.login,
        senha: req.body.loginpwd
    };

    //let inputNome = document.getElementById('loginUsuario');
    //inputNome.style.borderColor = '#8f9799';
    usuarios = getObj('usuario.json');
    acheiUser = false;
    for(i=0;i<usuarios.length;i++){
        //console.log('SENHA INSERIDA:'+ usuario.senha);
        //console.log('SENHA REAL:'+ usuarios[i].senha);
        if(usuarios[i].email == usuario.login && usuarios[i].senha == usuario.senha){
            acheiUser = true;
            id_user = usuarios[i].id;
            break;
        }
    }
    if(acheiUser || logado){
        if(!logado){ 
            user = usuario.login;
        }
        logado = true;
        res.render('home',{name:user,listaConteudo:getObj('conteudo.json')}) ;
        res.render('home.ejs');
        console.log("USUARIO LOGADO: "+user);

    }else{
        console.log("[ERRO] logado ="+logado);
        console.log("[ERRO] logado ="+user)
        console.log("Erro ao logar");
    }

});

app.post('/profile', function(req, res) {
    let conteudo = getObj('conteudo.json');
    console.log('id_user: '+id_user);
    conteudo = conteudo.filter(obj => obj.id_user == id_user);
    //console.log("conteudo filtrado: %o", conteudo);
    console.log("name:"+user+"/idUser:"+id_user);
    res.render('perfil',{name:user,idUser:id_user,listaConteudo:conteudo}) ;
    res.render('perfil.ejs');
});

app.post('/content', function(req, res) {
    let conteudo = getObj('conteudo.json');
    console.log('id_user: '+id_user);
    conteudo = conteudo.filter(obj => obj.id_user == id_user);
    //console.log("conteudo filtrado: %o", conteudo);
    console.log("name:"+user+"/idUser:"+id_user);
    res.render('content',{name:user,idUser:id_user,listaConteudo:conteudo}) ;
    res.render('content.ejs');
});

app.post('/newcontent', function(req, res) {
    console.log('CONTENT: '+user);
    res.render('newcontent',{name:user,idUser:id_user}) ;
    res.render('newcontent.ejs');
});

app.post('/savecontent', function(req, res) {
    let conteudo = {
        id: Math.random().toString().replace('0.', ''),
        id_user: id_user, 
        nome: req.body.titulo,
        conteudo: req.body.conteudo,
        tipo: req.body.tipo
    };

    let obj = getObj('conteudo.json');    
    obj = [...obj,conteudo];

    //console.log("my object: %o", obj);

    let data = JSON.stringify(conteudo);

    fs.appendFile('../db/conteudo.json', data+"\n", function (err) {
        if (err) throw err;               console.log('Conteudo Salvo');
    });


    res.redirect(307,'/profile');

});

server.listen(process.env.PORT, process.env.IP);

var teste = function (){
    console.log('FOISE');
}

var getObj = function (path){
    path = '../db/'+ path;
    let json = fs.readFileSync(path, 'utf8');

    json = json.split("\n");

    let obj = [];
    for(i=0;i<json.length-1;i++){ // length-1 ignore extra line
        let new_obj = JSON.parse(json[i]);
        obj = [...obj,new_obj];
    }
    
    //("GET OBJ: %o", obj);

    return obj;
}

var saveJSON = function (obj,path){
    path = '../db/'+ path;
    let data = JSON.stringify(obj);
    fs.appendFile(path, data+"\n", function (err) {
        if (err) throw err;               console.log('Obj Salvo em:'+path);
    });
}

