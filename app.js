
// ==========================================
// ⚡ DAVBOT APK STORE PREMIUM
// APP.JS P1
// Firebase + Chargement Applications
// ==========================================



// ================= FIREBASE =================


import {

initializeApp

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


import {

getDatabase,
ref,
onValue,
update,
get

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";




// ================= CONFIG FIREBASE =================

const firebaseConfig = {

apiKey:"AIzaSyA24pBo8mB8WiZssPtep--MMBdB7c8_Lu4U",

authDomain:"starlink-investit.firebaseapp.com",

databaseURL:"https://starlink-investit-default-rtdb.firebaseio.com",

projectId:"starlink-investit",

storageBucket:"starlink-investit.appspot.com",

};
// ================= INITIALISATION =================


const firebaseApp = initializeApp(firebaseConfig);


const db = getDatabase(firebaseApp);






// ================= VARIABLES =================


let APPS = [];

let currentApp = null;

let currentList = [];







// ================= CHARGER LES APK =================


function loadApps(){



const box = document.getElementById("apps");



if(!box) return;




onValue(

ref(db,"apps"),

(snapshot)=>{


APPS=[];



snapshot.forEach((item)=>{


APPS.push({

id:item.key,

...item.val()

});


});





currentList = APPS;



renderApps(APPS);



}

);



}







// ================= DEMARRAGE =================



window.addEventListener(

"DOMContentLoaded",

()=>{


loadApps();



}

);

// ==========================================
// ⚡ DAVBOT APK STORE PREMIUM
// APP.JS P2
// Affichage + Recherche + Catégories
// ==========================================



// ================= AFFICHAGE APPLICATIONS =================


function renderApps(list){



const box = document.getElementById("apps");



if(!box) return;



box.innerHTML = "";




list.forEach(app=>{



box.innerHTML += `


<div class="app-card">



<div class="app-top">



<img

src="${app.icon}"

class="app-icon">



<div>


<h3>

${app.name}

</h3>



<p class="dev">

👨‍💻 ${app.developer || "Davbot"}

</p>


</div>


</div>






<div class="stars">

${"★".repeat(app.stars || 5)}

</div>






<p class="description">

${app.desc || app.description || "Application Android premium"}

</p>







<div class="badges">



<span>

${app.version || "1.0"}

</span>



<span>

${app.size || "0 MB"}

</span>



<span>

${app.category || "APK"}

</span>



</div>







<p class="downloads">


📥 ${app.downloads || 0} téléchargements


</p>







<button

class="download-btn"

onclick="downloadAPK('${app.id}')">


📲 Télécharger


</button>





</div>



`;



});



}







// ================= RECHERCHE =================



const search = document.getElementById("search");



if(search){



search.addEventListener(

"input",

()=>{


const value =

search.value.toLowerCase();





const result = APPS.filter(app=>


app.name

.toLowerCase()

.includes(value)


);



renderApps(result);



}



);


}







// ================= CATEGORIES =================



document

.querySelectorAll(".category")

.forEach(button=>{


button.onclick = ()=>{



document

.querySelectorAll(".category")

.forEach(btn=>{

btn.classList.remove("active");

});





button.classList.add("active");





const category = button.innerText;






if(category==="Tous"){


renderApps(APPS);


}

else{


renderApps(


APPS.filter(app=>


app.category === category


)


);



}



};



});

// ==========================================
// ⚡ DAVBOT APK STORE PREMIUM
// APP.JS P3
// Download + Compteur Firebase
// ==========================================



// ================= TELECHARGEMENT APK =================


window.downloadAPK = async function(id){



const app = APPS.find(a=>a.id === id);



if(!app)
return;



currentApp = app;




// Ajouter +1 téléchargement


const oldCount = Number(app.downloads || 0);



await update(

ref(db,"apps/"+id),

{

downloads: oldCount + 1

}

);




// Ouvrir APK GitHub


if(app.apk && app.apk !== "#"){


window.open(

app.apk,

"_blank"

);


}

else{


alert(

"APK non disponible"

);


}




};









// ================= POPUP DETAILS =================



window.openDetails = function(id){



const app = APPS.find(a=>a.id===id);



if(!app)
return;



currentApp = app;



document.getElementById("detailIcon").src = app.icon;


document.getElementById("detailName").innerText = app.name;


document.getElementById("detailDesc").innerText = app.desc || app.description;


document.getElementById("detailVersion").innerText =

"Version : "+app.version;



document.getElementById("detailSize").innerText =

"Taille : "+app.size;



document.getElementById("detailCategory").innerText =

app.category;



document

.getElementById("detailsModal")

.classList.remove("hidden");



};







// ================= BOUTON DOWNLOAD POPUP =================



const detailBtn = document.getElementById("detailDownload");



if(detailBtn){



detailBtn.onclick = ()=>{


if(currentApp){


downloadAPK(currentApp.id);


}



};



}
