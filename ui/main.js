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


var list='';
var submit= document.getElementById('submit-name');
submit.onclick=function(){
    
     var request= new XMLHttpRequest();
    console.log(request);
    request.onreadystatechange=function(){
    if(request.readyState==XMLHttpRequest.DONE){
        console.log(request.readyState);
        if(request.status==200){
            names1=request.responseText;
            names1=JSON.parse(names1);
    for(var i=0;i<names1.length;i++){
        
        list +='<li>'+names1[i]+'</li>';
    
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