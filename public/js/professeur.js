window.addEventListener("load",function () {
  document.getElementById("loader").style.display="none"
})
const modalEl = document.getElementById("successModal")
let bdy= document.querySelector(".body");
let color = "dark";
const form = document.querySelector(".form");
const modal = new Modal(modalEl)
let homePage = document.querySelector(".home-page");
let workPage = document.querySelector(".add-work");
let studentPage = document.querySelector(".list-student");
  const date = document.getElementById("deadline");

  const now = new Date();
  now.setDate(now.getDate() + 4); // +2 jours

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  date.value = `${year}-${month}-${day}T${hours}:${minutes}`;
workPage.style.display = "none";
homePage.style.display = "block";
studentPage.style.display = "none";

function openModal(message) {
  document.querySelector(".result").innerHTML = message;
  modal.show();
}
function closeModal() {
    modal.hide()
  }
function addWork() { 
  homePage.style.display = "none"
  workPage.style.display = "block"; }
function closeWork() { homePage.style.display = "block"; workPage.style.display = "none"; 
}
function closeListStudent() { 
  homePage.style.display = "block";
  workPage.style.display = "none"; 
  studentPage.style.display = "none"; 
}
function showListStudent() { 
  homePage.style.display = "none"; 
  workPage.style.display = "none"; 
  studentPage.style.display = "block"; 
  
}
function theme() {
    if (color == "dark") {
      bdy.classList.add("dark")
      bdy.classList.remove("light")
        color = "light";
    } else {
      bdy.classList.add("light")
      bdy.classList.remove("dark")
        color = "dark";
    }
}
async function loadStudent() {
  try{
    const response = await fetch("https://home-work-test.onrender.com/students")
    const eleves = await response.json()
    const tbody = document.querySelector(".tbody")
    tbody.innerHTML=""
    document.querySelector(".student").textContent= eleves.length
    eleves.forEach(eleve => {
  const tr = document.createElement("tr")
  tr.classList.add("border-b", "dark:border-gray-700", "hover:bg-gray-50", "dark:hover:bg-gray-600", "transition-colors")
  tr.innerHTML = `
    <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
      ${eleve.name}
    </th>
    <td class="px-4 py-3 text-gray-700 dark:text-gray-300">
      ${eleve.email || "--"}
    </td>
    <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
      ${eleve.note || "--"}
    </td>
    <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
      ${eleve._id ? eleve._id.slice(-6) : "--"}
    </td>
    <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
      ${eleve.createdAt ? new Date(eleve.createdAt).toLocaleDateString() : "--"}
    </td>
  `
  tbody.appendChild(tr)
})
  }
  catch (error){
    console.log("Erreur students : ",error)
    openModal("Impossible de charger la liste des eleves ")
  }
}
async function loadProfile(){
  try {
    const response = await fetch("https://home-work-test.onrender.com/me",{
      credentials: "include"
    });
    if (!response.ok) return;
    
    const user = await response.json()
    document.querySelector(".profil-letter").textContent = user.name[0].toUpperCase()
    document.querySelector(".profil-name").textContent =`${user.name.toUpperCase()}`
    document.querySelector(".profil-role").textContent = `Role: ${user.role}`
    document.querySelector(".profil-number").textContent = `Number: ${user.number}`
    document.querySelector(".profil-email").textContent =`Email: ${user.email}`
    document.querySelector(".profil-id").textContent =`ID: ${user._id.slice(-6)}`
    
  } catch (err) {
    console.error('Error:', err);
    
  }
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.querySelector(".btn-work")
  const inp = document.querySelectorAll(".inp")
  btn.disabled = true
  btn.innerHTML = `<div class="animate-spin spin-work"></div>`
  const formData = new FormData(form);

  const data = {
    title: formData.get("title"),
    note: formData.get("note"),
    classe: formData.get("classe"),
    deadline: formData.get("deadline"),
    description: formData.get("description"),
    type: formData.get("type")
  };
  inp.forEach(np => {
    np.disabled = true
  })
console.log("Données envoyées:", data);
  try {
    const response = await fetch("https://home-work-test.onrender.com/works", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      closeWork();
      form.reset();
      openModal(result.message || "Envoi effectuer");
      btn.innerHTML=`<i class="bi bi-plus-circle mr-2"></i>
          Ajouter le devoir`
      disabled = false 
      inp.forEach(np => {
    np.disabled = false
  })
    } else {
      openModal(result.message || "Impossible d'envoyer le fichier");
      btn.innerHTML=`<i class="bi bi-plus-circle mr-2"></i>`
      inp.forEach(np => {
    np.disabled = false
  })
      disabled = false
    }

  } catch (error) {
    console.error("Erreur:", error);
    openModal("Erreur de connexion au serveur");
      btn.innerHTML=` <i class="bi bi-plus-circle mr-2"></i>
          Ajouter le devoir`
    btn.disabled = false
    inp.forEach(np => {
    np.disabled = false
  })
  }
});
async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("/sw.js");
    return registration;
  }
}
async function subscribeUser() {
  const registration = await registerServiceWorker();

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Permission refusée !");
    return;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array("BIo_hsQ3pb93rTa8kjU1DjCjJZ1tMlGZ3YflnxJJLps0PrTpqwa5yqISByjZ-RiY7Tm14oiMDQDwuk7uQjhMR2s")
  });

  await fetch("https://home-work-test.onrender.com/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  });

  console.log("Utilisateur abonné !");
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('late');
    }
    else {
      entry.target.classList.remove('late');
    }
  });
}, {
  threshold: 0.1
});
function animeObser() {
  document.querySelectorAll(".anime").forEach(el => observer.observe(el))
}
async function loadWork() {
  const container = document.getElementById("works-container")
  try {
    const response = await fetch('https://home-work-test.onrender.com/works',{
      credentials: "include"
    })
    if (!response.ok){
      
      console.log("Erreur de recuperation !")
      return;
    };
    const works = await response.json()
    const devoirCount = works.filter(work => work.type === "devoir").length;
    const lessonCount = works.filter(work => work.type === "lecon").length;
    const exerciceCount = works.filter(work => work.type === "exercice").length;
    console.log(exerciceCount)
    document.querySelector(".lecon").textContent = lessonCount || "0"
    document.querySelector(".devoir").textContent = devoirCount || "0"
    document.querySelector(".exercice").textContent = exerciceCount || "0"
    container.innerHTML = ""
    works.forEach(work => {
      const deadlineDate = new Date(work.deadline);
      let today = new Date()
    const dls = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
      const formattedDate = deadlineDate.toLocaleDateString();

      const card = document.createElement("li");
      card.className = "ml-6 bg-white dark:bg-gray-700 p-4 rounded-lg  border border-gray-200 dark:border-gray-600 overflow-hidden works-container"
      card.innerHTML+=`
           <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full -left-4 ring-0 span">
          <i class="bi bi-clock-fill text-blue-600 dark:text-blue-300"></i>
         
        </span>

        <time class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 time anime">
          <i class="bi bi-calendar3 mr-1"></i> le : ${formattedDate}
        </time>

        <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white title overflow-x-auto anime">
          ${work.title ?? "Pas de titre"}
        </h3>
        
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 text-comment overflow-x-auto anime">
          ${work.description ?? "Pas de description !"}
        </p>
        
        <button class="btn-link text-blue-700 dark:text-blue-400 hover:underline font-medium">
          <a href="#" class="inline-flex items-center">
            Voir l'activité &nbsp;
            <i class="bi bi-arrow-right"></i>
          </a>
        </button>
      `
      container.appendChild(card)
      animeObser()
    })
} catch (error) {
    console.error('Error:', error);
    container.innerHTML=`
      <div class="flex flex-col empty items-center justify-center py-16 px-4 text-center">
  <div class="w-32 h-32  rounded-full flex items-center justify-center mb-6">
    <i class="bi bi-search text-6xl text-gray-400 dark:text-gray-600"></i>
  </div>
  

  <h3 class="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2 tracking-wider">
    SEARCH
  </h3>
  
  <p class="text-gray-500 dark:text-gray-500 text-lg mb-2">
    Aucun résultat
  </p>
  
  <p class="text-gray-400 dark:text-gray-600 text-sm max-w-md">
    Désolé, nous n'avons trouvé aucune activiter correspondante.
  </p>
  ${error}
</div>`
  }
}

const anim = document.querySelectorAll('.anime');

anim.forEach(ani => observer.observe(ani));


document.addEventListener("DOMContentLoaded", () => {
  theme()
  loadProfile()
  loadStudent()
  loadWork()
  subscribeUser();
});
