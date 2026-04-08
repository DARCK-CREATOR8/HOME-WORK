couleur = true
let body = document.querySelector(".body")
function theme() {
  if(couleur){
    body.classList.add("dark")
    couleur = false
  }
  else if(!couleur) {
    body.classList.remove("dark")
    couleur = true
  }
}