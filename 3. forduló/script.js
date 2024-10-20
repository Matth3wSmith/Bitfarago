
function init(){
    var c = document.getElementById("jatek"); 
    var ctx = c.getContext("2d"); 
    var cavasRect = c.getBoundingClientRect();
    c.addEventListener('click', function(event){
        var x = event.clientX; 
        var y = event.clientY; 
        console.log(x,y);
        let img=document.getElementById("allomasKek");
        ctx.drawImage(img, x, y,10,10);
    });
}