var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool= require('pg').Pool;
var crypto= require('crypto');
var body=require('body-parser');
var session = require('express-session');


var config={
    user:'rsdramanathan',
    database:'rsdramanathan',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(body.json());
app.use(session({
    secret : 'someRandomValue',
    cookie : {maxAge: 1000*60*60*24*30}
    
}));



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
            ${data.date.toDateString()}
        </div>
        <div>
            ${data.paragraph}
        </div>
        <div>
        Comment:
        </div>
        <textarea rows='3' cols='50' name='Comment'></textarea><br/>
        <input type='submit' value='Submit'/>
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
app.get('/hash/:pwd',function(req,res){
    var string=hash(req.params.pwd,'this is my password');
    res.send(string);
});
function hash(password,salt){
    var hash=crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512');
    console.log(hash);
    return['pbkdf2','1000',salt,hash.toString('hex')].join('$');
}


var pool=new pool(config);
app.get('/test-db',function(req,res){
pool.query('SELECT * FROM test',function(err,result){
    if(err){
        console.log(err);
        res.status(500).send(err.toString());
        console.log(res.status);
        } else
        {
            res.send(JSON.stringify(result.rows));
            console.log(res.status);
        }
});
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var pwd=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring=hash(pwd,salt);
    pool.query('update "user" set password=$2 where username=$1',[username,dbstring],function(err,result){
        if(err){
            res.status(500).send(err.toString());
             }
        else {
            res.send("User successfully created: " + username);
        }
        
    });
});

app.post('/login',function(req,res){
    var username=req.body.username;
    var pwd=req.body.password;
    pool.query('select * from "user" where username=$1',[username],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else if(result.rows.length===0)
        {
            res.status(403).send('Username/password is inavlid');      
            
        }
    
    else{
        var dbstring=result.rows[0].password;
        var salt = dbstring.split('$')[2];
        var hashstring=hash(pwd,salt);//creating a hash value on the password and salt submitted.
        if(hashstring==dbstring){
            req.session.auth={userId: result.rows[0].id};//set the session
            
            //session middleware setting a cookie with session id 
            //server side, it maps the session id to an object(auth)
            //auth maps to userid which contains our id value stored in dB.
            res.send("user logged in successfully: "+ username);
            
        }
        else{
            res.send('incorrect credentials');
        }
    }
    
});
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in successfully :' + req.session.auth.userId.toString());
   } 
   else{
       res.send('you are not logged in');
   }
});

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('Logged out successfully');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function (req,res){
   counter=counter+1;
   res.send(counter.toString());
});
app.get('/articles/:articlename',function(req,res){
    //select * from article where title='';delete from article where 'a'='a';
    console.log('var');
   pool.query("SELECT * FROM article WHERE title=$1",[req.params.articlename], function(err,result)
   {
       console.log ("SELECT * FROM article WHERE title=$1",[req.params.articlename]);
       if(err){
        console.log(err);
        res.status(500).send(err.toString());
        console.log(res.status);
        } 
        else{
            if(result.rows.length === 0){
               res.status(404).send('Article Not found');
            }
        else
        {
            var articledata=result.rows[0];
            console.log (articledata);
            res.send(innerHTMLtemplate(articledata));
            console.log(innerHTMLtemplate(articledata));
        }}
});
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
