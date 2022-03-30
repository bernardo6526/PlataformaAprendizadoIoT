const http = require('http')
const fs = require('fs')
const port = 3000

var index = require('./index');

const server = http.createServer(function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html'})
    fs.readFile('index.html', function(error,data){
        if(error){
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else{
            res.write(data)
        }
        res.end()
    })   

})

server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port'+port)
    }
})

fs.writeFile('result.txt', 'This is my text', function (err) {
    if (err) throw err;               console.log('Results Received');
  }); 



