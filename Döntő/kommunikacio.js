function keresKuldes(method,url,data){
    const xml=new XMLHttpRequest();

    xml.open(method,url);

    xml.setRequestHeader("Content-Type","application/json");

    xml.onload= () => {
        if(xml.status>=400){
            console.log("Hiba történt")
        }
        else{
            console.log("Sikeres kommunikáció")
            return xml.response;
        }
    };

    xml.send(JSON.stringify(data));
}
function osszesFeladatKeres(){
    //Összes feladat id-je
    data.id="all";
    //Kommunikáció
    const valasz=JSON.parse(keresKuldes("POST","url",data));
    //Kiíratás a html-be
    const valaszokDiv=document.getElementById("valaszok");
    valaszokDiv.innerHTML+="<p>"+String(valasz)+"</p>";

    //####################################################
    
}

function feladatKeres(){
    //Itt adhatod meg hányadik feladatot kérje
    data.id="1"
    //Kommunikáció, valasz változóba a szerver válasza található
    url="";
    const valasz = JSON.parse(keresKuldes("POST",url,data));
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
}


const keresButton=document.getElementById("GET");
const kuldesButton=document.getElementById("Kesz");

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
/*keresButton.addEventListener("click",kuldes("GET","https://randomuser.me/api/"));
kuldesButton.addEventListener("click",kuldes("POST","https://randomuser.me/api/",data));*/
