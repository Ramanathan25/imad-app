var counter1=document.getElementById('counter');
var count = document.getElementById('count');
var counter=0;
counter1.onclick=function(){
    var request= new XMLHttpRequest();
    console.log(request);
    if(request.onreadystatechange==XMLHttpRequest.DONE){
        console.log(request.onreadystatechange);
        if(request.status==200){
            count.innerHTML=request.responseText;
        }
    }
    request.open('GET','https://rsdramanathan.imad.hasura-app.io',true);
}