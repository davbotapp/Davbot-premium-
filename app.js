
    // ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS
// SaaS 3D BLUE BLACK GOLD
// Sans Firebase
// ==========================================



// ================= APPLICATIONS =================


let APPS = [


{
id:1,

name:"DAVBOT AI",

icon:"https://i.ibb.co/chckV4z9/Dav-Bot-IA-128x128-4ko.webp",

developer:"David Mpongo",

category:"IA",

version:"3.0",

size:"1 MB",

downloads:3,2k,

stars:5,

vip:true,

description:
"Assistant IA intelligent avec génération de texte, images et outils avancés.",

apk:"#"

},



{
id:2,

name:"DAVBOT VPN",

icon:"https://i.ibb.co/4ZLPR3CJ/logo-reduit-56ko.webp",

developer:"DAVBOT",

category:"VPN",

version:"2.5",

size:"4 MB",

downloads:18k,

stars:5,

vip:true,

description:
"VPN rapide et sécurisé avec technologie nouvelle génération.",

apk:"#"

},



{
id:3,

name:"DAVBOT GAMES",

icon:"https://cdn-icons-png.flaticon.com/512/686/686589.png",

developer:"DAVBOT Studio",

category:"Jeux",

version:"1.5",

size:"120 MB",

downloads:9500,

stars:4,

vip:false,

description:
"Collection de jeux Android divertissants.",

apk:"#"

},



{
id:4,

name:"DAVBOT TOOLS",

icon:"https://cdn-icons-png.flaticon.com/512/2919/2919592.png",

developer:"DAVBOT",

category:"Outils",

version:"1.0",

size:"30 MB",

downloads:7000,

stars:5,

vip:false,

description:
"Une suite d'outils puissants pour Android.",

apk:"#"

}


];






// ================= ELEMENTS =================


const appsBox =
document.getElementById("apps");


const search =
document.getElementById("search");


const bar =
document.getElementById("bar");


const downloadBox =
document.getElementById("downloadBox");


const downloadText =
document.getElementById("downloadText");







// ================= AFFICHAGE =================


function renderApps(list){


appsBox.innerHTML="";



list.forEach(app=>{


appsBox.innerHTML += `


<div class="app-card">


<img class="app-icon"

src="${app.icon}">



<h2 class="app-name">

${app.name}

${app.vip ? " 👑":""}

</h2>




<p class="dev">

👨‍💻 ${app.developer}

</p>





<div class="info">


<span>

📥 ${app.downloads}

</span>



<span>

📦 ${app.size}

</span>


</div>





<div class="info">


<span>

⭐ ${app.stars}/5

</span>



<span class="badge">

${app.category}

</span>


</div>





<p class="description">

${app.description}

</p>





<button class="download-btn"

onclick="downloadAPK(${app.id})">


⬇ Télécharger


</button>



</div>


`;



});



}






// ================= RECHERCHE =================



search.addEventListener("input",()=>{


let value =
search.value.toLowerCase();



let result =
APPS.filter(app=>


app.name

.toLowerCase()

.includes(value)


);



renderApps(result);



});







// ================= CATEGORIES =================



document

.querySelectorAll(".category")

.forEach(button=>{


button.onclick=()=>{


document

.querySelectorAll(".category")

.forEach(btn=>{


btn.classList.remove("active");


});



button.classList.add("active");



let cat =
button.innerText;



if(cat==="Tous"){


renderApps(APPS);


}

else{


renderApps(

APPS.filter(app=>

app.category===cat

)

);


}



};



});








// ================= TELECHARGEMENT =================



window.downloadAPK=function(id){



let app =

APPS.find(a=>a.id===id);



if(!app)return;





downloadBox.style.display="block";



let progress=0;



bar.style.width="0%";



downloadText.innerHTML=

"Connexion au serveur...";







let timer=setInterval(()=>{


progress +=10;



bar.style.width=

progress+"%";




if(progress===30){


downloadText.innerHTML=

"⬇ Téléchargement de "+app.name;


}



if(progress===70){


downloadText.innerHTML=

"⚡ Optimisation APK...";


}



if(progress>=100){



clearInterval(timer);



downloadText.innerHTML=

"✅ Installation prête !";



app.downloads++;



setTimeout(()=>{


if(app.apk!=="#"){


window.open(app.apk,"_blank");


}

else{


alert(

"APK bientôt disponible"

);


}



downloadBox.style.display="none";


},1200);



}



},300);



};






// ================= START =================


renderApps(APPS);



console.log(

"⚡ DAVBOT APK STORE PRO chargé"

);
