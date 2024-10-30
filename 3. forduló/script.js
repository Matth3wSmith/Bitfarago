class Muhely{
    constructor(x,y,img,width,height,tipus){
        this.xPos=x;
        this.yPos=y;
        this.arany=c.width/c.height
        this.img=img;
        
        this.eredetiWidth=width;
        this.eredetiHeight=height;

        this.width=width*this.arany;
        this.height=height*this.arany;

        this.eredetiRadius=80
        this.radius=80*this.arany
        this.szin=tipus


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
        context.fillStyle="rgb(0,255,0,0.5)";
        context.fill();
        context.stroke()
    }
    
    //mozgatás
    mozgas(context,event){
        console.log("Mozgatott műhely:",this)
        this.xPos=event.offsetX;
        this.yPos=event.offsetY;
        console.log(event.offsetX,event.offsetY)
        //Canvas újrarajzolása
        canvasRajzolas();

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
        this.teljesulAzIgeny=false;
    }
    draw(context){
        context.drawImage(this.img,this.xPos-this.width/2,this.yPos-this.height/2, this.width, this.height)
    }
    igenyNemTeljesul(ctx){
        ctx.beginPath();
        ctx.arc(this.xPos,this.yPos,100,0,2*Math.PI)
        ctx.fillStyle="rgba(255, 0, 0, 0.7)"
        ctx.fill();
        this.draw(ctx);
    }
}
class To{
    constructor(x,y,img,width,height){
        this.xPos=x;
        this.yPos=y;
        this.img=img;
        this.width=width;
        this.height=height;
    }
    draw(){
        ctx.drawImage(this.img,this.xPos-this.width/2,this.yPos-this.height/2,this.width,this.height)
        //ctx.rect(this.xPos-this.width/2,this.yPos-this.height/2,this.width,this.height)
        //ctx.arc(this.xPos,this.yPos,10,0,Math.PI*2)
        //ctx.stroke()
    }
    ellenorzes(x,y,mozgatott){
        if (x>=this.xPos-this.width/3 && x<=this.xPos+this.width/5*2 &&
            y>=this.yPos-this.height/3 && y<=this.yPos+this.height/5*2){
                    alert("Tóra nem helyezhetsz műhelyt!")
                    let muhelyIndex = muhelyek.indexOf(mozgatott)
                    muhelyek.splice(muhelyIndex,1)
                    canvasRajzolas();
                    if (mozgatott.szin=="Kek"){
                        kekMuhelyMennyiseg++
                    }
                    else if (mozgatott.szin=="Zold"){
                        zoldMuhelyMennyiseg++
                    }
                    else if (mozgatott.szin=="Narancs"){
                        narancsMuhelyMennyiseg++
                    }
                    canvasRajzolas();
                    return true;
            }
        else{
            return false
        }
    }
}
    //Automata generáláshoz (ha lesz)
    /*ellenorzes(){
        telepulesek.forEach(telepules => {
            //Ha a tó generálás koordinátája érintetne egy várost generáljon új koordinátát
            if(this.xPos >= telepules.xPos && this.xPos <= telepules.xPos+telepules.width &&
                this.yPos >= telepules.yPos && this.yPos <= telepules.yPos+telepules.height){ 
                    this.xPos=Math.random() * c.width
                    this.yPos=Math.random() * c.height
                }
            else{
                this.draw()
            }

        });
    }*/

class Hegy{
    constructor(x,y,img,width,height){
        this.xPos=x;
        this.yPos=y;
        this.img=img;
        this.width=width;
        this.height=height;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(this.img,this.xPos-this.width/2,this.yPos-this.height/2,this.width,this.height)
        //ctx.arc(this.xPos,this.yPos,10,0,Math.PI*2)
        //ctx.rect(this.xPos-this.width/3 ,this.yPos-this.height/3,this.width/5*3,this.height/5*3)
        //ctx.arc(this.xPos,this.yPos,10,0,Math.PI*2)
        //ctx.stroke()
    }
    ellenorzes(x,y,mozgatott){
        if (x>=this.xPos-this.width/3 && x<=this.xPos+this.width/5*2 &&
            y>=this.yPos-this.height/3 && y<=this.yPos+this.height/5*2){
                alert("Hegyre nem helyezhetsz műhelyt!")
                let muhelyIndex = muhelyek.indexOf(mozgatott)
                muhelyek.splice(muhelyIndex,1)
                canvasRajzolas();
                if (mozgatott.szin=="Kek"){
                    kekMuhelyMennyiseg++
                }
                else if (mozgatott.szin=="Zold"){
                    zoldMuhelyMennyiseg++
                }
                else if (mozgatott.szin=="Narancs"){
                    narancsMuhelyMennyiseg++
                }
                canvasRajzolas();
                return true
            }
        else {
            return false
        }
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

function nyertCheck(){
    let nincsTeljesitve=[]
    telepulesek.forEach(telepules => {
        if (telepules.teljesulAzIgeny){
            done+=1
            console.log(done)
        }
        else{
            nincsTeljesitve.push(telepules)
        }
    })
    console.log(telepulesek)
    if (done==required){
        console.log("nyert")
        alert("GRATULÁLOK TELJESÍTETTED")
    }
    else{
        alert("A városok nincsenek megfelelően ellátva!")
        nincsTeljesitve.forEach(telepules => {
            telepules.igenyNemTeljesul(ctx)
        })

    }
    done=0
}

function Done(){
    telepulesek.forEach(telepules => {
        if (telepules.teljesulAzIgeny && telepules.igeny=="Kek"){
            telepules.img=varosKekD
        }
        if (telepules.teljesulAzIgeny && telepules.igeny=="Narancs"){
            telepules.img=varosNarancsD
        }
        if (telepules.teljesulAzIgeny && telepules.igeny=="Zold"){
            telepules.img=varosZoldD
        }
        if (!telepules.teljesulAzIgeny && telepules.igeny=="Kek"){
            telepules.img=varosKek
        }
        if (!telepules.teljesulAzIgeny && telepules.igeny=="Narancs"){
            telepules.img=varosNarancs
        }
        if (!telepules.teljesulAzIgeny && telepules.igeny=="Zold"){
            telepules.img=varosZold
        }

    })
}

function torles(context){
    context.clearRect(0, 0, c.width, c.height);
}

// Méret beállítása a szülő elem méretéhez képest
function resizeCanvas() {
    // Canvas belső felbontásának igazítása a szülő méretéhez
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

    /*const scaleX = c.width / eredetiCanvasWidth;
    const scaleY = c.height / eredetiCanvasHeight;
    console.log(scaleX,scaleY)*/
    //Ha magasságban kicsinyítjük az ablakot akkor nagyobb lesz az arany es a kepek
    //let arany=c.width/c.height
    muhelyek.forEach(muhely => {
        muhely.radius=muhely.eredetiRadius * arany
        muhely.width = muhely.eredetiWidth * arany;
        muhely.height = muhely.eredetiHeight * arany;
        muhely.draw(ctx)
    })
}
//Elemek kirajzolása
function muhelyekRajzolas(){
    muhelyek.forEach(muhely => {
        muhely.draw(ctx)
    })
}

function telepulesekRajzolas(){
    telepulesek.forEach(telepules => {
        telepules.draw(ctx)
    })
}
function tavakRajzolas(){
    tavak.forEach(to => {
        to.draw()
    })
}
function hegyekRajzolas(){
    hegyek.forEach(hegy => {
        hegy.draw()
    })
}
function canvasRajzolas(){
    torles(ctx);
    menuRajzolas();
    menuGombRajzolas();
    tavakRajzolas();
    hegyekRajzolas();
    muhelyekRajzolas();
    telepulesekRajzolas();
   
}

//####################################################//
//Menü függvényei
function menuRajzolas(){
    ctx.beginPath();
    ctx.strokeStyle="black";
    ctx.lineWidth=2;
    ctx.fillStyle="gray"
    ctx.rect(menuX,menuY,menuWidth,-menuAktualisHeight) // menü területe
    ctx.fill()
    ctx.stroke();
}

function menuGombRajzolas(){

    ctx.beginPath();
    ctx.rect(menuGombX,menuGombY,menuGombWidth,menuGombHeight) //gomb rajzolása
    ctx.stroke();

    //Nyíl rajzolása
    ctx.beginPath();
    ctx.moveTo(menuGombX+menuGombWidth/2, menuGombY+10); // felső középpont
    ctx.lineTo(menuGombX+10, menuGombY+40);  // bal felső pont
    ctx.lineTo(menuGombX+(menuGombWidth-10), menuGombY+40);  // jobb felső pont
    ctx.fillStyle = 'black'; // nyíl színe
    ctx.fill();
    ctx.closePath();
    if (menuOpen){
        muhelyMenu();
    }
}

function menuNyitas(){

    if (menuAktualisHeight < menuHeight) {
        menuAktualisHeight += 5; // Animációs lépés mérete
        menuGombY = c.height-menuGombHeight-menuAktualisHeight; //Gomb y koordinátákjának feljebb tolása
        canvasRajzolas();
        requestAnimationFrame(menuNyitas); // Következő animációs lépés
    } else {
        menuAktualisHeight = menuHeight; // Biztosítjuk, hogy pontosan a max szélesség legyen
        console.log("Kinyitás vége")
        muhelyMenu()
        animacio = false; // Animáció vége
    }
    

}


function menuBezaras(ctx){
    if (menuAktualisHeight > 0) {
        menuAktualisHeight -= 5; // Animációs lépés mérete
        menuGombY = c.height-menuGombHeight-menuAktualisHeight; //Gomb y koordinátákjának feljebb tolása
        canvasRajzolas();
        requestAnimationFrame(menuBezaras); // Következő animációs lépés
    } else {
        menuAktualisHeight = 0; // Biztosítjuk, hogy pontosan a max szélesség legyen
        animacio = false; // Animáció vége
    }

}

function muhelyMenu(){
    let zold=document.getElementById("allomasZold");
    let kek=document.getElementById("allomasKek");
    let narancs=document.getElementById("allomasNarancs");
    let imgWidth=100;
    //Műhelyek kerete
    ctx.beginPath()
    ctx.lineWidth=1
    ctx.fillStyle="cyan"
    ctx.rect(menuMuhelyekXY["zoldKeretX"],menuMuhelyekXY["keretY"],keretSize[0],keretSize[1])
    ctx.rect(menuMuhelyekXY["kekKeretX"],menuMuhelyekXY["keretY"],keretSize[0],keretSize[1])
    ctx.rect(menuMuhelyekXY["narancsKeretX"],menuMuhelyekXY["keretY"],keretSize[0],keretSize[1])
    ctx.fill()
    ctx.stroke()

    //Mennyi lehelyezhető műhely
    
    function lehelyezhetoMuhely(menuMuhelyekXY_XKoordNev,mennyiseg){
        ctx.beginPath()
        ctx.fillStyle="black"
        ctx.font = "25px Copperplate";
        ctx.fillText(mennyiseg, menuMuhelyekXY[menuMuhelyekXY_XKoordNev]+5, menuMuhelyekXY["keretY"]+23);
        ctx.moveTo(menuMuhelyekXY[menuMuhelyekXY_XKoordNev]+25,menuMuhelyekXY["keretY"])
        ctx.lineTo(menuMuhelyekXY[menuMuhelyekXY_XKoordNev]+25,menuMuhelyekXY["keretY"]+30)
        ctx.lineTo(menuMuhelyekXY[menuMuhelyekXY_XKoordNev],menuMuhelyekXY["keretY"]+30)
        ctx.stroke()
    }
    
    lehelyezhetoMuhely("zoldKeretX",zoldMuhelyMennyiseg)
    lehelyezhetoMuhely("narancsKeretX",narancsMuhelyMennyiseg)
    lehelyezhetoMuhely("kekKeretX",kekMuhelyMennyiseg)

    //Menü műhelyek rajzolása
    ctx.drawImage(zold,menuMuhelyekXY["zoldX"],menuMuhelyekXY["Y"],menuMuhelySize[0],menuMuhelySize[1])
    ctx.drawImage(kek,menuMuhelyekXY["kekX"],menuMuhelyekXY["Y"],menuMuhelySize[0],menuMuhelySize[1])
    ctx.drawImage(narancs,menuMuhelyekXY["narancsX"],menuMuhelyekXY["Y"],menuMuhelySize[0],menuMuhelySize[1])
    ctx.stroke()

}

//overlap vizsgálat
function touch(elementX, elementY, centerX, centerY, radius){
    const distance = Math.sqrt((Math.abs(elementX - centerX))**2 + (Math.abs(elementY - centerY))**2);
    return distance <= radius;
}

//###########################################################################
/*Változók*/
const c = document.getElementById("jatek");
const ctx = c.getContext("2d");

const windowHeight=window.innerHeight;
const windowWidth=window.innerWidth;
//const cavasRect = c.getBoundingClientRect();
c.style.border="1px black solid"
const eredetiCanvasWidth=c.width;
const eredetiCanvasHeight=c.height;

var animacio = false;
var muhelyek=[];
var tavak=[];
var hegyek = [];
var mouseDown=false;
var kekOn = false;
var narancsOn = false;
var zoldOn = false;
var arany
var mozgatott;
//városok száma legyen benne mert ha a teljesülő igények(done) száma egyenlő ezzel akkor nyert a játékos
var required= 2;
var done =0;
/*c.width=windowWidth-700;
c.height=windowHeight-300;*/

// Kezdeti méretbeállítás betöltéskor, töröl mindent
//resizeCanvas();
c.width = c.offsetWidth; //Ez a kettő nem kell ha resizecanvas bent van
c.height = c.offsetHeight;

const menuWidth = c.width
const menuHeight = 130;
var menuAktualisHeight = 0;
const menuGombWidth = 50;
const menuGombHeight = 50
const menuX = 0
var menuY = c.height
var menuGombX = c.width/2-menuGombWidth/2;
var menuGombY = c.height-menuGombHeight-menuAktualisHeight;
var menuOpen=false;
const keretSize=[100,100]
const menuMuhelySize = [70,70]
const menuMuhelyekXY={"kekX":menuWidth/4*2-menuMuhelySize[0]/2,"zoldX":menuWidth/4-menuMuhelySize[0]/2, "narancsX":menuWidth/4*3-menuMuhelySize[0]/2, "Y":menuY-menuHeight/2-menuMuhelySize[1]/2, "kekKeretX":menuWidth/4*2-keretSize[0]/2, "zoldKeretX":menuWidth/4-keretSize[0]/2,"narancsKeretX":menuWidth/4*3-keretSize[0]/2, "keretY":menuY-menuHeight/2-keretSize[1]/2}

//#########
//Feladványtól függően lehet állítani
var kekMuhelyMennyiseg = 2
var narancsMuhelyMennyiseg = 2
var zoldMuhelyMennyiseg = 2
//##########
var varosKek = document.getElementById("VarosKek")
var varosNarancs = document.getElementById("VarosNarancs")
var varosZold = document.getElementById("VarosZold")
var varosKekD = document.getElementById("VarosKekD")
var varosNarancsD = document.getElementById("VarosNarancsD")
var varosZoldD = document.getElementById("VarosZoldD")
var telepulesek = [new Telepules(10,10,varosKek,100,100,"Kek"), new Telepules(800,100,varosZold,100,100,"Zold")]
var muhelySize=100;
//változók vége
//##################################

canvasRajzolas();



// Az ablak méretezésekor automatikus canvas átméretezés
//window.addEventListener('resize', resizeCanvas);

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


    if (menuOpen && x>=menuX && x<=menuX+menuWidth &&
        y<=menuY && y>=menuY-menuHeight){
        let muhely
        //Ha a zöld műhelyre kattintunk
        if (x>=menuMuhelyekXY["zoldKeretX"] && x<=menuMuhelyekXY["zoldKeretX"]+menuMuhelySize[0] &&
            y>=menuMuhelyekXY["keretY"] && y<=menuMuhelyekXY["keretY"]+menuMuhelySize[1] && zoldMuhelyMennyiseg>0){
                console.log("A zöld műheylre nyomtál");
                let img = document.getElementById("allomasZold")
                muhely = new Muhely(x,y,img,muhelySize,muhelySize,"Zold")
                muhelyek.push(muhely)
                muhely.draw(ctx)
                mozgatott=muhely;
                zoldMuhelyMennyiseg--
        }
        //Ha a kék műhelyre kattintunk
        else if (x>=menuMuhelyekXY["kekKeretX"] && x<=menuMuhelyekXY["kekKeretX"]+menuMuhelySize[0] &&
            y>=menuMuhelyekXY["keretY"] && y<=menuMuhelyekXY["keretY"]+menuMuhelySize[1] && kekMuhelyMennyiseg>0){
                console.log("A kék műheylre nyomtál");
                let img = document.getElementById("allomasKek")
                muhely = new Muhely(x,y,img,muhelySize,muhelySize,"Kek")
                muhelyek.push(muhely)
                muhely.draw(ctx)
                mozgatott=muhely;
                kekMuhelyMennyiseg--
        }
        //Ha a narancs műhelyre kattintunk
        else if (x>=menuMuhelyekXY["narancsKeretX"] && x<=menuMuhelyekXY["narancsKeretX"]+menuMuhelySize[0] &&
            y>=menuMuhelyekXY["keretY"] && y<=menuMuhelyekXY["keretY"]+menuMuhelySize[1] && narancsMuhelyMennyiseg>0){
                console.log("A narancs műheylre nyomtál");
                let img = document.getElementById("allomasNarancs")
                muhely = new Muhely(x,y,img,muhelySize,muhelySize,"Narancs")
                muhelyek.push(muhely)
                muhely.draw(ctx)
                mozgatott=muhely;
                narancsMuhelyMennyiseg--
        }
    }
    
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
        telepulesek.forEach(telepules => {
            if (touch(telepules.xPos - telepules.width/2, telepules.yPos - telepules.height/2, mozgatott.xPos - mozgatott.width/2,mozgatott.yPos - mozgatott.height, mozgatott.radius)&& mozgatott.szin==telepules.igeny){
                console.log("érintkezik")
                telepules.teljesulAzIgeny=true;
            }
            else if (!touch(telepules.xPos - telepules.width/2, telepules.yPos - telepules.height/2, mozgatott.xPos - mozgatott.width/2,mozgatott.yPos - mozgatott.height, mozgatott.radius)&& mozgatott.szin==telepules.igeny) {
                telepules.teljesulAzIgeny=false;
                console.log(telepules.teljesulAzIgeny)
            }
        })


        telepulesek.forEach(telepules => {
            telepules.teljesulAzIgeny=false;
        });

        telepulesek.forEach(telepules => {
            muhelyek.forEach(egyMuhely=> {
                if (touch(telepules.xPos - telepules.width/2, telepules.yPos - telepules.height/2, egyMuhely.xPos - egyMuhely.width/2,egyMuhely.yPos - egyMuhely.height, egyMuhely.radius)&& egyMuhely.szin==telepules.igeny){
                    console.log("érintkezik")
                    telepules.teljesulAzIgeny=true;
                }
            });
        });
    }
    Done()
    
    
})

//Ha felengedi az egeret a műhely mozgatása is álljon meg
c.addEventListener("mouseup",function (event){
    mouseDown=false;
   
    if (muhelyek.length>0){
        for (let i=0;i<tavak.length;i++){
            if(tavak[i].ellenorzes(mozgatott.xPos,mozgatott.yPos,mozgatott)){
                break
            }
        }
        for (let i=0;i<hegyek.length;i++){
            if(hegyek[i].ellenorzes(mozgatott.xPos,mozgatott.yPos,mozgatott)){
                break
            }
        }
    }       
})

c.addEventListener('click', function (event) {
    
    //console.log(event)
    let x = event.offsetX;
    let y = event.offsetY;

    //Műhely lehelyezés
    if (zoldOn == true) {
        let img = document.getElementById("allomasZold");
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,muhelySize,muhelySize,"Zold");
        muhelyek.push(muhely)
        muhely.draw(ctx);
        zoldOn=false;
    }
    if (narancsOn == true) {
        let img = document.getElementById("allomasNarancs")
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,muhelySize,muhelySize,"Narancs");
        muhelyek.push(muhely)
        muhely.draw(ctx);
        narancsOn=false;
    }
    if (kekOn == true) {
        let img = document.getElementById("allomasKek")
        img.classList.remove("selected");
        let muhely = new Muhely(x,y,img,muhelySize,muhelySize,"Kek");
        muhelyek.push(muhely)
        muhely.draw(ctx);
        kekOn=false;
    }
    
    //Menu nyitogatás
    if (x>=menuGombX && x<=menuGombX+menuGombWidth && 
        y >= menuGombY && y<= menuGombY+menuGombHeight){
            animacio = true; // Animáció indítása
            if (!menuOpen) {
                menuNyitas(); // Menü nyitása
            } else {
                menuBezaras(); // Menü zárása
            }
            menuOpen = !menuOpen; // Menü állapotának váltása
        }
        Done()
    

}, false);

// POPUP NE HAGYD KI :-)
function openPopup() {
    document.getElementById("myPopup").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("myPopup").style.display   
   = "none";
  }