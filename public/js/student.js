
window.addEventListener("load",function () {
  document.getElementById("loader").style.display="none"
})
const modalEl = document.getElementById("successModal")
const modal = new Modal(modalEl)
async function loadProfile(){
  try {
    const response = await fetch("https://home-work-test.onrender.com/me",{
      credentials: "include"
    });
    if (!response.ok) return;
    const user = await response.json()
    
    document.querySelector(".profil-letter").textContent = user.name[0].toUpperCase()
    document.querySelector(".profil-name").textContent =`${user.name.toUpperCase()}`
    document.querySelector(".profil-role").textContent =`Role: ${user.role}`
    document.querySelector(".profil-number").textContent = `Number: ${user.number}`
    document.querySelector(".profil-email").textContent = `Email: ${user.email}`
    document.querySelector(".profil-id").textContent =`ID: ${user._id.slice(-6)}`
    
  } catch (error) {
    console.error('Error:', error);
  }
}
async function loadWork() {
    const container = document.getElementById("works-container");
  try {
    const response = await fetch("https://home-work-test.onrender.com/works", {
      credentials: "include"
    })

    if (!response.ok){
      console.log("Erreur de recuperation !")
      return;
    };
    
    const works = await response.json()
    const filterValue = document.getElementById("simple-search").value;
    let workFilter = works;
    if (filterValue !== "all") {
      workFilter = works.filter(work => work.type === filterValue)
    }
    const devoirCount = works.filter(work => work.type === "devoir").length;
    const lessonCount = works.filter(work => work.type === "lecon").length;
    container.innerHTML = "";
    if (workFilter.length === 0) {
      container.innerHTML = `
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
    Désolé, nous n'avons trouvé aucun élément correspondant à votre recherche.
  </p>
</div>
      `;
      return;
    }
    workFilter.forEach(work => {

      const deadlineDate = new Date(work.deadline);
      let today = new Date()
    const dls = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
      const formattedDate = deadlineDate.toLocaleDateString();

      const card = document.createElement("div");
      card.className = "px-4 mx-auto max-w-4xl mb-4";

      card.innerHTML = `
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-2">    
      <div class="md:flex">    <div class="md:w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">    
      <svg class="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">    
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356.257l-1.68 1.684a.999.999 0 01-.356.257l-2.172.931a1 1 0 000 1.84l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.84L16.75 11.5a.999.999 0 01-.356-.257l1.68-1.684a.999.999 0 01.356-.257l2.172-.931a1 1 0 000-1.84l-7-3zM10 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>    
      </svg>    
    </div>    
        

    <div class="p-6 flex-1">    
      <div class="flex items-start justify-between">    
        <div>    
          <span class="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">${work.type?.toUpperCase() ?? "--"}</span>    
          <h3 class="mt-3 text-xl font-bold text-gray-900 dark:text-white">${work.title ?? "--"}</h3>    
          <p class="mt-2 text-gray-600 dark:text-gray-400">Professeur M. ${work.teacher?.name || "--"}</p>    
        </div>    
        <span class="px-3 py-1 text-sm font-medium text-gray-700 bg-orange-500 rounded-full dark:bg-gray-50">À rendre dans ${dls} jours</span>    
      </div>    
          
      <p class="mt-4 max-h-24 sm:max-h-32 md:max-h-40 overflow-y-auto pr-2 text-gray-700 dark:text-gray-300 overflow-auto">    
      ${work.description ?? "--"}
      </p>    
          
      <div class="mt-4 flex items-center gap-4">    
        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">    
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>    
          <span>Date limite: ${work.deadline ? new Date(work.deadline).toLocaleDateString() : "--"}</span>    
        </div>    
      </div>    
          
      <div class="mt-4">    
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600" onclick="downloadPdf('${work._id}', '${work.title}')">    
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>    
          Télécharger les fichiers    
        </button>    
      </div>    
    </div>    
  </div>    
</div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error:', error);
      container.innerHTML = `
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
    Désolé, nous n'avons trouvé aucun élément correspondant à votre recherche.
  </p>
</div>
      `
  }
}

function downloadPdf(workID, workTitle) {
  fetch(`https://home-work-test.onrender.com/export-work/${workID}`)
    .then(res => {
      if (!res.ok) throw new Error("Impossible de télécharger");
      return res.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${workTitle.replace(/\s+/g, "_")}.pdf`;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(err => openModal(err.message));
}






async function loadNotifications() {
  try {
     const response = await fetch("https://home-work-test.onrender.com/notifications",{
    credentials: "include"
  })
  if (!response.ok) {
    console.log("Erreur de connexion")
    return;
  }
  const notifications = await response.json()
  const container = document.getElementById("notif")
  container.textContent=""
  notifications.forEach((notify) => {
     const time = new Date(notify.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
    container.innerHTML+=`
    <div>
              <a href="#" class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                <div class="flex-shrink-0" id="notifications">
                  <i class="bi bi-journal-plus text-2xl text-primary-600 mr-3"></i>
                </div>
                <div class="pl-1 w-full">
                  <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                    <span class="font-semibold text-gray-900 dark:text-white">NEW ${notify.type.toUpperCase()}</span> : ${notify.title}
                  </div>
                  <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                    Envoyer à ${time} 
                  </div>
                </div>
              </a>
            </div>
    `
  });
  } catch (err) {
    console.error('Error:', err);
    
  }
}
function openModal(message) {
  document.querySelector(".result").innerHTML = message;
  modal.show();
}
function closeModal() {
    modal.hide()
  }
const theme = document.querySelector(".theme")
let bg = "dark"
function color() {
  const body = document.querySelector(".body")
  if (bg == "dark") {
    body.classList.add("dark")
    body.classList.remove("light")
    bg= "light"
  } else {
    body.classList.remove("dark")
    body.classList.add("light")
    bg= "dark"
  }
}



async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("/sw.js");
    return registration;
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
setInterval(() => {
  loadNotifications()
}, 5000);
document.addEventListener("DOMContentLoaded",() => {
  loadProfile()
  loadNotifications()
  loadWork()
  subscribeUser()
  document.getElementById("simple-search").addEventListener("change",loadWork)
  color()
})
