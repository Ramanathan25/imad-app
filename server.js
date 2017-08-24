var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool= require('pg').Pool;
var app = express();
app.use(morgan('combined'));



var column={
     "article-one": {
    title:"Article One",
    date:"Aug 15,2017",
    heading:"Article-One",
    paragraph: `<p> This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.</p>
            <p> This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.</p>
            <p> This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.</p>`
},
   "article-two": {
    title:"Article two",
    date:"Aug 15,2017",
    heading:"Article-two",
    paragraph: "<p> This paragraph is my article two creation in HTML format.</p>"
},
   "article-three": {
    title:"Article three",
    date:"Aug 15,2017",
    heading:"Article-three",
    paragraph: "<p> This paragraph is my first article one creation in HTML format.</p>"

   }
};
function innerHTMLtemplate(data){
    var createHTML =
    `<!Doctype html>
<html>
    <head>
    <title> ${data.title} </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
 <body>
    <div class="container">
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <div>
            <h2> ${data.heading}</h2>
        </div>
        <div>
            ${data.date}
        </div>
        <div>
            ${data.paragraph}
        </div>
    </div>
 </body>
</html>`;
return createHTML;
}
var name1=[];
app.get('/submit-name',function(req,res){
    name2=req.query.name;
    
    name1.push(name2);
    res.send(JSON.stringify(name1));
});

var config={
    user: 'rsdramanathan',
    database: 'rsdramanathan',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var zero=new Pool(config);
app.get('/test-db',function(req,res){
    zero.query('select * from test', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function (req,res){
   counter=counter+1;
   res.send(counter.toString());
});
app.get('/:articlename',function(req,res){
    var articlename=req.params.articlename;
    res.send(innerHTMLtemplate(column[articlename]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
