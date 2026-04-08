window.addEventListener("load",function () {
  document.getElementById("loader").style.display="none"
})

let couleur = "dark"
let form = document.getElementById("formulaire")
  function change(){
    
    const body = document.querySelector(".body")
    if (couleur == "dark") {
      body.classList.add("dark")
      body.classList.remove("light")
      couleur = "light"
    } else {
      body.classList.add("light")
      body.classList.remove("dark")
      couleur = "dark"
    }
  
  }
let pP= "password"
  function pwd() {
    const pPwd = document.getElementById("password")
    const icon = document.getElementById("ipwd")
    if (pP == "password") {
      icon.classList.add("bi-eye-slash")
      icon.classList.remove("bi-eye")
      pPwd.type = "password"
      pP= "text"
    } else if (pP == "text") {
      icon.classList.add("bi-eye")
      icon.classList.remove("bi-eye-slash")
      pPwd.type = "text"
      pP= "password"
    }
  }
  const modalElement = document.getElementById('successModal');
const modal = new Modal(modalElement);

function openModal(message) {
  document.querySelector(".result").innerHTML = message;
  modal.show();
}
  function closeModal() {
    modal.hide()
  }
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("formulaire envoyer")
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    number: formData.get("number"),
    password: formData.get("password"),
    role: formData.get("role"),
  };
try {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();

if (response.ok) {
  if (result.role === "professeur") {
    window.location.href = "/professeur.html";
  } 
  
  else if (result.role === "eleve") {
    window.location.href = "/student.html";
  }

} else {
  openModal(result.message || "Erreur lord de l'inscription")
}
} catch (error) {
  console.error('Error:', err);
  openModal(`
    Erreur de connexion au serveur \n\n 
    <p class="text-sm text-1xl">Vérifiez votre connexion internet ou réessayez dans quelques instants.
    </p> 
    <p class="text-sm text-1xl text-red-600">
    ${error}
    </p>
    `)
}
});
window.addEventListener("DOMContentLoaded", () => {
  change()
  pwds()
})