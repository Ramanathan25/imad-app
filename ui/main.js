var counter1=document.getElementById('counter');
var count = document.getElementById('count');
var counter=0;
counter1.onclick=function(){
    var request= new XMLHttpRequest();
    if(request.onreadystatechange==XMLHttpRequest.DONE){
        if(request.status==200){
            count.innerHTML=request.responsetext;
        }
    }
    request.open('GET','https://rsdramanathan.imad.hasura-app.io',true);
}