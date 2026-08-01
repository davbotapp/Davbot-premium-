// ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS P1
// Firebase + Database + Storage
// ==========================================


// ================= FIREBASE IMPORT =================

import {

initializeApp

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


import {

getDatabase,
ref,
get,
set,
push,
update,
remove,
onValue

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


import {

getStorage,
ref as storageRef,
uploadBytes,
getDownloadURL,
deleteObject

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";




// ================= CONFIG FIREBASE =================


const firebaseConfig = {


apiKey:
"AIzaSyA24p20b8BWiZssPtep--MMBd7c8_Lu4U",


authDomain:
"starlink-investit.firebaseapp.com",


databaseURL:
"https://starlink-investit-default-rtdb.firebaseio.com",


projectId:
"starlink-investit",


storageBucket:
"starlink-investit.appspot.com"

};




// ================= INITIALISATION =================


const app = initializeApp(firebaseConfig);


const db = getDatabase(app);


const storage = getStorage(app);




// ================= VARIABLES =================


let allApps = [];


let currentEditID = null;


let currentApp = null;



// Mot de passe temporaire

let ownerPassword = "";






// ================= CHARGER LES APK =================


export function loadApps(){


const box =
document.getElementById("apps");



if(!box)
return;



onValue(

ref(db,"apps"),

(snapshot)=>{


allApps=[];


box.innerHTML="";



snapshot.forEach((child)=>{


const data={


id:child.key,


...child.val()


};



allApps.push(data);



displayApp(data,box);



});



}



);



}







// ================= AFFICHAGE APK =================


function displayApp(app,box){



box.innerHTML += `


<div class="app-card">



<div class="app-header">


<img src="${app.icon}"

class="app-icon">



<div>


<h2>

${app.name}

</h2>


<p>

👨‍💻 ${app.developer || "Développeur"}

</p>


</div>


</div>



<p class="description">

${app.description}

</p>



<div class="info">


<span class="tag">

${app.category}

</span>



<span class="tag">

${app.version}

</span>



<span class="tag">

${app.size}

</span>



</div>



<p>

📥 ${app.downloads || 0}

 téléchargements

</p>



<button class="btn"

onclick="downloadAPK('${app.id}')">

📲 Installer

</button>



<button class="btn"

onclick="editAPK('${app.id}')">

✏️ Modifier

</button>



<button class="btn"

style="background:#dc2626;color:white"

onclick="deleteAPK('${app.id}')">

🗑 Supprimer

</button>



</div>


`;



}








// ================= INITIALISATION =================


window.addEventListener(

"DOMContentLoaded",

()=>{


loadApps();


}

);
// ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS P2
// UPLOAD APPLICATION
// ==========================================



// ================= INITIALISATION UPLOAD =================


export function initUploadPage(){


const publishBtn =
document.getElementById("publishBtn");



if(!publishBtn)
return;




// aperçu icône


const iconInput =
document.getElementById("iconFile");



const preview =
document.getElementById("iconPreview");



if(iconInput){


iconInput.addEventListener(

"change",

()=>{


const file =
iconInput.files[0];


if(file){


preview.src =
URL.createObjectURL(file);


preview.style.display="block";


}



}

);


}






publishBtn.onclick = uploadAPK;



}









// ================= UPLOAD APK =================


async function uploadAPK(){



const name =
document.getElementById("appName").value;



const category =
document.getElementById("category").value;



const version =
document.getElementById("version").value;



const size =
document.getElementById("size").value;



const description =
document.getElementById("description").value;



const iconFile =
document.getElementById("iconFile").files[0];



const apkFile =
document.getElementById("apkFile").files[0];



const password =
document.getElementById("ownerPassword")?.value;







if(
!name ||
!iconFile ||
!apkFile ||
!password
){


alert(

"Remplissez tous les champs"

);


return;

}






try{



showMessage(
"Upload en cours..."
);






// ================= UPLOAD ICON =================



const iconRef =

storageRef(

storage,

"apps/icons/"+
Date.now()+
iconFile.name

);



await uploadBytes(

iconRef,

iconFile

);



const iconURL =

await getDownloadURL(

iconRef

);








// ================= UPLOAD APK =================



const apkRef =

storageRef(

storage,

"apps/apk/"+
Date.now()+
apkFile.name

);



await uploadBytes(

apkRef,

apkFile

);



const apkURL =

await getDownloadURL(

apkRef

);








// ================= DATABASE =================



const appRef =

push(

ref(db,"apps")

);



await set(

appRef,

{


name:name,


category:category,


version:version,


size:size,


description:description,


icon:iconURL,


apk:apkURL,



developer:

"Utilisateur Davbot",




ownerPassword:password,



downloads:0,


createdAt:

Date.now()



}

);






alert(

"✅ Application publiée"

);



location.href="index.html";




}

catch(error){


console.error(error);



alert(

"Erreur upload : "

+error.message

);



}



}









// ================= MESSAGE =================


function showMessage(text){



const box =

document.getElementById("message");



if(box)

box.innerHTML=text;



}
// ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS P3
// DOWNLOAD + EDIT OWNER
// ==========================================



// ================= TELECHARGEMENT APK =================


window.downloadAPK = async function(id){



const snap = await get(

ref(db,"apps/"+id)

);



if(!snap.exists())
return;



const app = snap.val();



// Ajouter téléchargement


await update(

ref(db,"apps/"+id),

{


downloads:

Number(app.downloads || 0)+1


}

);



// Ouvrir APK


window.open(

app.apk,

"_blank"

);



};









// ================= MODIFIER APK =================



window.editAPK = async function(id){



const snap = await get(

ref(db,"apps/"+id)

);



if(!snap.exists())
return;



const app = snap.val();




// Demande mot de passe


const pass = prompt(

"🔐 Mot de passe propriétaire"

);



if(pass !== app.ownerPassword){



alert(

"❌ Mot de passe incorrect"

);



return;

}




currentEditID=id;



document.getElementById("appId").value=id;



document.getElementById("appName").value=

app.name;



document.getElementById("category").value=

app.category;



document.getElementById("version").value=

app.version;



document.getElementById("size").value=

app.size;



document.getElementById("description").value=

app.description;





const btn =

document.getElementById("updateBtn");



if(btn)

btn.style.display="block";





const del =

document.getElementById("deleteBtn");



if(del)

del.style.display="block";





};









// ================= MODIFICATION =================



const updateBtn =

document.getElementById("updateBtn");



if(updateBtn){



updateBtn.onclick = async()=>{



if(!currentEditID)
return;



const snap = await get(

ref(db,"apps/"+currentEditID)

);



if(!snap.exists())
return;




const app=snap.val();



const pass = prompt(

"🔐 Confirmation mot de passe"

);




if(pass !== app.ownerPassword){


alert(

"Mot de passe incorrect"

);


return;


}





await update(

ref(db,"apps/"+currentEditID),

{


name:

document.getElementById("appName").value,


category:

document.getElementById("category").value,


version:

document.getElementById("version").value,


size:

document.getElementById("size").value,


description:

document.getElementById("description").value,


updatedAt:

Date.now()



}

);




alert(

"✅ Application modifiée"

);



location.reload();



};



}
// ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS P4
// DELETE + SEARCH + FILTER
// ==========================================



// ================= SUPPRIMER APK =================



window.deleteAPK = async function(id){



const snap = await get(

ref(db,"apps/"+id)

);



if(!snap.exists())
return;



const app = snap.val();




// Vérification mot de passe


const pass = prompt(

"🔐 Mot de passe propriétaire"

);



if(pass !== app.ownerPassword){


alert(

"❌ Mot de passe incorrect"

);



return;

}






const confirmDelete = confirm(

"Supprimer cette application ?"

);



if(!confirmDelete)
return;






try{


// Supprimer base de données


await remove(

ref(db,"apps/"+id)

);





alert(

"🗑 Application supprimée"

);



location.reload();



}

catch(error){


console.error(error);



alert(

"Erreur suppression"

);



}



};









// ================= RECHERCHE =================



window.searchApps = function(value){



value =

value.toLowerCase();



const box =

document.getElementById("apps");



if(!box)
return;



box.innerHTML="";




allApps

.filter(app=>


app.name

.toLowerCase()

.includes(value)



)

.forEach(app=>{


displayApp(

app,

box

);



});



};









// ================= FILTRE CATEGORIE =================



window.filterCategory=function(category){



const box =

document.getElementById("apps");



if(!box)
return;



box.innerHTML="";




if(category==="Tous"){



allApps.forEach(app=>{


displayApp(

app,

box

);


});



return;

}





allApps

.filter(app=>

app.category===category

)

.forEach(app=>{


displayApp(

app,

box

);



});



};









// ================= NOMBRE APK =================



export function totalApps(){



const box =

document.getElementById(
"totalApps"
);



if(box){


box.innerHTML=

allApps.length;


}



}
// ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS P5
// SECURITY + STORAGE + STATS
// ==========================================



// ================= HASH PASSWORD =================



async function hashPassword(password){



const encoder =

new TextEncoder();



const data =

encoder.encode(password);



const hash =

await crypto.subtle.digest(

"SHA-256",

data

);



return Array.from(

new Uint8Array(hash)

)

.map(

b=>b.toString(16).padStart(2,"0")

)

.join("");



}









// ================= VERIFICATION PASSWORD =================



async function checkOwner(password,hash){



const encrypted =

await hashPassword(password);



return encrypted === hash;



}









// ================= SUPPRIMER FICHIER STORAGE =================



async function deleteStorageFile(url){



try{



if(!url)
return;



const fileRef =

storageRef(

storage,

url

);



await deleteObject(

fileRef

);



}

catch(error){



console.log(

"Storage déjà supprimé"

);



}



}









// ================= STATS DOWNLOAD =================



export function loadStatistics(){



const totalBox =

document.getElementById(
"totalDownloads"
);



onValue(

ref(db,"apps"),

snapshot=>{


let total=0;



snapshot.forEach(app=>{


total +=

Number(

app.val().downloads || 0

);



});




if(totalBox){


totalBox.innerHTML=

total.toLocaleString()

+

" téléchargements";



}



}

);



}









// ================= FAVORIS =================



window.addFavorite=function(id){



let fav =

JSON.parse(

localStorage.getItem(
"favorites"
)

||"[]"

);



if(!fav.includes(id)){



fav.push(id);



localStorage.setItem(

"favorites",

JSON.stringify(fav)

);



alert(

"⭐ Ajouté aux favoris"

);



}

};









// ================= VERIFIER FAVORIS =================



export function isFavorite(id){



let fav =

JSON.parse(

localStorage.getItem(
"favorites"
)

||"[]"

);



return fav.includes(id);



}









// ================= NOTE APPLICATION =================



window.rateApp = async function(id,note){



await update(

ref(db,"apps/"+id),

{


rating:

note



}

);



alert(

"⭐ Merci pour votre note"

);



};
// ==========================================
// ⚡ DAVBOT APK STORE PRO
// APP.JS P6
// FINAL INITIALISATION
// ==========================================




// ================= PAGE INDEX =================



function initStore(){



const appsBox =

document.getElementById("apps");



if(appsBox){



loadApps();



loadStatistics();



}



}









// ================= PAGE UPLOAD =================



function initUpload(){



const uploadPage =

document.getElementById("publishBtn");



if(uploadPage){



initUploadPage();



}



}









// ================= AUTO DEMARRAGE =================



window.addEventListener(

"DOMContentLoaded",

()=>{



initStore();



initUpload();



}

);









// ================= EXPORT GLOBAL =================



window.DavbotStore={



loadApps,



downloadAPK,



editAPK,



deleteAPK,



searchApps,



filterCategory,



rateApp



};









// ==========================================
// FIN APP.JS DAVBOT APK STORE PRO
// ==========================================
