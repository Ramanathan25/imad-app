var counter1=document.getElementById('counter');
var count = document.getElementById('count');
var counter=0;
counter1.onclick=function(){
    var request= new XMLHttpRequest();
    console.log(request);
    request.onreadystatechange=function(){
    if(request.readyState==XMLHttpRequest.DONE){
        console.log(request.readyState);
        if(request.status==200){
            count.innerHTML=request.responseText;
        }
    }
    };
    request.open('GET','http://rsdramanathan.imad.hasura-app.io/counter',true);
    request.send()
};



var submit= document.getElementById('submit-name');
submit.onclick=function(){
    
     var request= new XMLHttpRequest();
    console.log(request);
    request.onreadystatechange=function(){
    if(request.readyState==XMLHttpRequest.DONE){
        console.log(request.readyState);
        if(request.status==200){
           var names3=request.responseText;
            names3=JSON.parse(names3);
            var list='';
            console.log(names3);
    for(var i=0;i<names3.length;i++){
        
        list +='<li>'+names3[i]+'</li>';
    
        }
    var ul=document.getElementById('nameslist');
    ul.innerHTML=list;    
    }
    }
    };
    


var name1 = document.getElementById('name');
var names1=name1.value;
request.open('GET','http://rsdramanathan.imad.hasura-app.io/submit-name?name='+names1,true);
request.send();
};



var submt= document.getElementById('submit-name');
submt.onclick=function(){
    
     var req= new XMLHttpRequest();
    console.log(req);
    req.onreadystatechange=function(){
    if(req.readyState==XMLHttpRequest.DONE){
        console.log(req.readyState);
        if(req.status==200){
              console.log('logged in successfully');
              alert('credentials are correcct!!');
            
        }else if(req.status==403){
            console.log('incorrect credentials');
            alert('invalid credentials, please type correct username/password');
            
        }else if(req.status==500){
            console.log('incorrect site');
        }
    }
    };
    


var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
req.open('POST', 'http://rsdramanathan.imad.hasura-app.io/login', true);
req.setRequestHeader('Content-type', 'application/json');
req.send();
};