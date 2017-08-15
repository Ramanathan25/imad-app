var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var column = {
    title:"Article One",
    date:"Aug 15,2017",
    heading:"Article-One",
    paragraph: `<p> This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.</p>
            <p> This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.</p>
            <p> This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.This paragraph ia my first article one creation in HTML format.</p>`
}

function innerHTMLtemplate(data){
    var createHTML =
    `<!Doctype html>
<html>
    <head>
    <title> $(data.title) </title>
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
            <h2> $(data.heading)</h2>
        </div>
        <div>
            $(data.date)
        </div>
        <div>
            $(data.paragraph)
        </div>
    </div>
 </body>
</html>`;
return createHTML;
}
app.get('/ui/article-one',function(req,res){
    res.send(innerHTMLtemplate(column));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/article-two',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/ui/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
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
