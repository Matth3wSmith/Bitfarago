function keresKuldes(method,url,data){
    const xhttp=new XMLHttpRequest();

    xhttp.open(method,url);

    xhttp.setRequestHeader("Content-Type","application/json");

    xhttp.onload= () => {
        if(xhttp.status>=400){
            console.log("Hiba történt")
        }
        else{
            console.log("Sikeres kommunikáció")
            return xhttp.response;
        }
    };

    xhttp.send(JSON.stringify(data));
}
function osszesFeladatKeres(){
    //Összes feladat id-je
    data.id="all";

    //Kommunikáció
    const valasz=JSON.parse(keresKuldes("POST","url",data));

    //Kiíratás a html-be
    const valaszokDiv=document.getElementById("osszesFeladat");
    valaszokDiv.innerHTML+="<p>"+String(valasz)+"</p>";

    //####################################################
}

function feladatKeres(){
    //Itt adhatod meg hányadik feladatot kérje
    data.id="1"

    //Kommunikáció, valasz változóba a szerver válasza található
    url="";
    const valasz = keresKuldes("POST",url,data);
    console.log("Ezt mentsd el egy txt-be a feladat leírással együtt:",valasz)
    valasz=JSON.parse(valasz)

    //Kiíratás a html-be
    const valaszokDiv=document.getElementById("valaszok");
    valaszokDiv.innerHTML+="<p>"+String(valasz.data)+"</p>";
    document.getElementById("leiras").href=url+valasz.data.description;

    //A válasz beküldése során a szerver számára kötelező adatok elmentése
    answer.original_data=valasz.data;
    answer.original_hash=valasz.hash;
    answer.id=data.id;

    //Itt kell megoldani a feladatot a végén answer objectbe megadni a válaszokat


    //Válaszok elmentése
    //answer.answer_data={};
}

function feladatMegoldasKuldes(){
    const valasz = JSON.parse(keresKuldes("POST","url",answer));
    console.log("A feladat megoldásra küldött válasz:",valasz)
}


const keresButton=document.getElementById("ossz");
const kuldesButton=document.getElementById("kesz");

let data={
    id:"",
    teamcode:"",
};

let answer={
    id:"",
    teamcode:"",
    original_data:"",
    original_hash:"",
    answer_data:"",
};


