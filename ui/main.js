var counter1=document.getElementById('counter');
var count = document.getElementById('count');
var counter=0;
counter1.onclick=function(){
    var request= new XMLHttpRequest();
    if(this.onreadystatechange==XMLHttpRequest.Done){
        if(this.status==200){
            count.innerHTML=this.responsetext;
        }
    }
    request.open('GET','/counter',true);
}