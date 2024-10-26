class Muhely{
    constructor(x,y,img,width,height){
        this.xPos=x;
        this.yPos=y;
        this.arany=c.width/c.height
        this.img=img;
        
        this.eredetiWidth=width;
        this.eredetiHeight=height;

        this.width=width*this.arany;
        this.height=height*this.arany;
        this.radius=150*this.arany;


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
    
    //mozgatás
    mozgas(context,event){
        console.log("Mozgatott műhely:",this)
        this.xPos=event.offsetX;
        this.yPos=event.offsetY;
        console.log(event.offsetX,event.offsetY)
        //Minden elem törlése a canvasról
        torles(context)
        //Újrarajzolás
        muhelyek.forEach(muhely => {
            muhely.draw(context)
        })
        console.log(muhelyek)

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

function torles(context){
    context.clearRect(0, 0, c.width, c.height);
}
// Méret beállítása a szülő elem méretéhez képest
function resizeCanvas() {
    // Canvas belső felbontásának igazítása a szülő méretéhez
    
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const scaleX = canvas.width / eredetiCanvasWidth;
    const scaleY = canvas.height / eredetiCanvasHeight;

    if (arany!=c.width/c.height){
        arany=c.width/c.height
        console.log(arany)
        muhelyek.forEach(muhely => {
            muhely.width*=arany;
            muhely.height*=arany;
            muhely.draw(ctx)
        })
    }
    // Ha szükséges, itt újrarajzolhatod a canvas tartalmát, mivel méretezéskor a rajz eltűnik
    // draw(); // Ezt a függvényt hozd létre a rajzolási tartalom megjelenítéséhez
}

const c = document.getElementById("jatek");
const ctx = c.getContext("2d");

const windowHeight=window.innerHeight;
const windowWidth=window.innerWidth;

c.style.border="1px black solid"
const eredetiCanvasWidth=c.width;
const eredetiCanvasHeight=c.height;

var muhelyek=[];
var mouseDown=false;
var kekOn = false;
var narancsOn = false;
var zoldOn = false;
var arany
var mozgatott;
/*c.width=windowWidth-700;
c.height=windowHeight-300;*/

// Az ablak méretezésekor automatikus canvas átméretezés
window.addEventListener('resize', resizeCanvas);

// Kezdeti méretbeállítás betöltéskor
resizeCanvas();

//var cavasRect = c.getBoundingClientRect();


//Mozgatható terület vaan mit javítani rajta
/*
const contentWidth = 2000;   // Tartalom szélessége
const contentHeight = 1500;  // Tartalom magassága
let offsetX = 0;
let offsetY = 0;
// Görgetési esemény figyelése
c.addEventListener('wheel', (event) => {
    

    offsetX += event.deltaX;
    offsetY += event.deltaY;

    // Korlátozzuk az eltolást a tartalom méretére
    offsetX = Math.max(0, Math.min(offsetX, contentWidth - c.width));
    offsetY = Math.max(0, Math.min(offsetY, contentHeight - c.height));

    drawContent();
});

// Tartalom kirajzolása az eltolás figyelembevételével
function drawContent() {
    ctx.clearRect(0, 0, c.width, c.height); // Canvas törlése

    // Tartalom kirajzolása az eltolás figyelembevételével
    ctx.save();
    ctx.translate(-offsetX, -offsetY); // Eltolás alkalmazása
    // Ide jön a tartalom rajzolása
    ctx.fillRect(100, 100, 400, 400); // Példa: egy négyzet rajzolása
    ctx.restore();
}

// Kezdeti rajzolás
drawContent();
*/

c.addEventListener('mousedown',function (event){
    /*const rect = c.getBoundingClientRect();
    const scaleX = c.width / rect.width;    // Skála a szélességhez
    const scaleY = c.height / rect.height;  // Skála a magassághoz

    // Arányosított koordináták számítása
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    */
    let x = event.offsetX;
    let y = event.offsetY;
    console.log("Egérlenyomás koordinátái:"+x+" "+y)
    muhelyek.forEach(muhely => {
        //console.log(muhely)
        if (x >= muhely.xPos - muhely.width/2 && x <= muhely.xPos + muhely.width/2 &&
            y >= muhely.yPos - muhely.height && y <= muhely.yPos) {
            console.log('Erre a képre kattintottál:', muhely.img);
            //Egérmozgás lekövetésének engedélyezése, miután megvan a kattintott műhely
            mouseDown=true;
            mozgatott=muhely
        }
    })
})

//Műhely mozgatása, egér koordinátáit átadja a
c.addEventListener("mousemove",(event)=>{
    if (mouseDown){
        mozgatott.mozgas(ctx,event)
    }
})
//Ha felengedi az egeret a műhely mozgatása is álljon meg
c.addEventListener("mouseup",function (event){
    mouseDown=false;
})

c.addEventListener('click', function (event) {
    //console.log(event)
    let x = event.offsetX;
    let y = event.offsetY;

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
        let muhely = new Muhely(x,y,img,100,100);
        muhelyek.push(muhely)
        muhely.draw(ctx);
        narancsOn=false;
    }
    if (kekOn == true) {
        let img = document.getElementById("allomasKek")
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,100,100);
        muhelyek.push(muhely)
        muhely.draw(ctx);
        kekOn=false;
    }
    
}, false);
/*var xPos = event.clientX - cavasRect.left; 
var yPos = event.clientY - cavasRect.top; 
console.log(xPos,yPos)*/

