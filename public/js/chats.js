let body = document.querySelector(".body")
let couleur = false
function theme() {
  if(!couleur){
    body.classList.add("dark")
    couleur = true
  }
  else {
    body.classList.remove("dark")
    couleur = false
  }
}


