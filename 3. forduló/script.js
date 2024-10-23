class Muhely{
    constructor(x,y,img,width,height){
        this.xPos=x;
        this.yPos=y;
        this.img=img;
        this.width=width;
        this.height=height;
        this.radius=150;


    }
    draw(context){
        //Muhely megrajzolása, az xPos-ból meg yPos-ból kivonjuk a szélsesség és magasság felét hogy középre rakja
        this.korzet(context)
        context.drawImage(this.img,this.xPos-this.width/2,this.yPos-this.height,this.width,this.height)
        
    }
    //Lefedettség kirajzolása
    korzet(context){
        context.beginPath();
        context.arc(this.xPos,this.yPos,this.radius,0,Math.PI*2,false);
        context.fillStyle="lightgreen";
        context.fill();
        context.stroke();
    }
}

class Telepules{
    constructor(x,y,img,width,height,igeny){
        this.xPos=x;
        this.yPos=y;
        this.img=img;
        this.width=width;
        this.height=height;
        this.igeny=igeny;
    }
    draw(context){
        context.drawImage(this.img,this.xPos,this.yPos)
    }
}

/*function init(){
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
}*/

var c = document.getElementById("jatek");
var ctx = c.getContext("2d");

var windowHeight=window.innerHeight-300;
var windowWidth=window.innerWidth-300;

c.style.border="1px black solid"
c.width=windowWidth;
c.height=windowHeight;

//var cavasRect = c.getBoundingClientRect();

var muhelyek=[];

var kekOn = false;
var narancsOn = false;
var zoldOn = false;

c.addEventListener('click', function (event) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x, y)
    if (zoldOn == true) {
        let img = document.getElementById("allomasZold");
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,100,100);
        muhelyek.push(muhely)
        muhely.draw(ctx);
        zoldOn=false;
    }
    if (narancsOn == true) {
        let img = document.getElementById("allomasNarancs")
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,200,200);
        muhelyek.push(muhely)
        muhely.draw(ctx);
        narancsOn=false;
    }
    if (kekOn == true) {
        let img = document.getElementById("allomasKek")
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,200,200);
        muhelyek.push(muhely)
        muhely.draw(ctx);
        kekOn=false;
    }
    
}, false);
/*var xPos = event.clientX - cavasRect.left; 
var yPos = event.clientY - cavasRect.top; 
console.log(xPos,yPos)*/
function kekCheck(img) {
    kekOn = true;
    zoldOn = false;
    narancsOn = false;
    img.classList.add("selected");
    console.log(kekOn)
}
function narancsCheck(img) {
    kekOn = false;
    zoldOn = false;
    narancsOn = true;
    img.classList.add("selected");
    
    console.log(narancsOn)
}
function zoldCheck(img) {
    kekOn = false;
    zoldOn = true;
    narancsOn = false;
    img.classList.add("selected");
    console.log(zoldOn)
}

