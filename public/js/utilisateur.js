let hme = document.querySelector(".home")
let msg = document.querySelector(".messenger")
let schl = document.querySelector(".schools")
let inf = document.querySelector(".info-app")
let infP = document.querySelector(".info-profil")
let schlAdd = document.querySelector(".create-school")
let schlJoin = document.querySelector(".join-school")
let body = document.querySelector(".body")
let couleur = true
hme.style.display="block"
let el = [inf,msg,schl,infP,schlAdd,schlJoin]
el.forEach(e => {
  e.style.display="none"
})
const sidebar = document.getElementById('default-sidebar');
const sidebarInstance = new Drawer(sidebar);
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
function openSidebar() {
    sidebarInstance.show();
}
function closeSidebar() {
    sidebarInstance.hide();
}

function home() {
  closeSidebar()
  hme.style.display="block"
  let el = [inf,msg,schl,infP,schlAdd,schlJoin]
  el.forEach(e => {
  e.style.display="none"
})
}
function messaging() {
  closeSidebar()
let el = [inf,hme,schl,infP,schlAdd,schlJoin]
el.forEach(e => {
  e.style.display="none"
})
msg.style.display="block"
}
function school() {
  closeSidebar()
let el = [inf,msg,hme,infP,schlAdd,schlJoin]
el.forEach(e => {
  e.style.display="none"
})
schl.style.display="block"
}
function info() {
  closeSidebar()
let el = [hme,msg,schl,infP,schlAdd,schlJoin]
el.forEach(e => {
  e.style.display="none"
})
inf.style.display="block"
}
function profil() {
  closeSidebar()
let el = [hme,msg,schl,inf,schlAdd,schlJoin]
el.forEach(e => {
  e.style.display="none"
})
infP.style.display="block"
}
function createSchool() {
  closeSidebar()
let el = [hme,msg,schl,inf,infP,schlJoin]
el.forEach(e => {
  e.style.display="none"
})
schlAdd.style.display="block"
}
function joinSchool() {
  closeSidebar()
let el = [hme,msg,schl,inf,infP,schlAdd]
el.forEach(e => {
  e.style.display="none"
})
schlJoin.style.display="block"
}
function openJoinSchoolModal() {
    document.getElementById('joinSchoolModal').classList.remove('hidden');
    document.getElementById('joinSchoolModal').classList.add('flex');
  }
function closeJoinSchoolModal() {
    document.getElementById('joinSchoolModal').classList.add('hidden');
    document.getElementById('joinSchoolModal').classList.remove('flex');
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeJoinSchoolModal();
    }
  });

document.addEventListener("DOMContentLoaded",() => {
  home()
})