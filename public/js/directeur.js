let couleur = true
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
let prof = document.querySelector(".prof")
let clsse = document.querySelector(".classe")
let hme = document.querySelector(".home")
let student = document.querySelector(".eleve")
let addStudent = document.querySelector(".add-student")
let addTeacher = document.querySelector(".add-teacher")
let avatar = document.querySelector(".profil")
let infoSchool = document.querySelector(".info-school")
let keyAccess = document.querySelector(".keyAccess")
let messenger = document.querySelector(".messenger")
let param = document.querySelector(".settings")
let statistiques = document.querySelector(".stats")
const sidebar = document.getElementById('default-sidebar');
const sidebarInstance = new Drawer(sidebar);
let pages = [
  prof,clsse,student,avatar,infoSchool,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  
pages.forEach(page => {
  page.style.display="none"
})
function openSidebar() {
    sidebarInstance.show();
}
function closeSidebar() {
    sidebarInstance.hide();
}
function home() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,infoSchool,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  hme.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function profil() {
  closeSidebar()
  let pages = [
  prof,clsse,student,hme,infoSchool,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  avatar.style.display="block"
pages.forEach(page => {
  page.style.display="none"
});
}
function classe() {
  closeSidebar()
  let pages = [
  prof,hme,student,avatar,infoSchool,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  clsse.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function professeurs() {
  closeSidebar()
  let pages = [
  hme,clsse,student,avatar,infoSchool,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  prof.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function eleves() {
  closeSidebar()
  let pages = [
  prof,clsse,hme,avatar,infoSchool,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  student.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function messaging() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,infoSchool,keyAccess,hme,param,addStudent,addTeacher,statistiques
  ]
messenger.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function access() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,infoSchool,hme,messenger,param,addStudent,addTeacher,statistiques
  ]
  keyAccess.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function info() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,hme,keyAccess,messenger,param,addStudent,addTeacher,statistiques
  ]
  infoSchool.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
}
function school() {
  info()
}
function settings() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,hme,keyAccess,messenger,infoSchool,statistiques
  ]
  param.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})

}
function teacher() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,hme,keyAccess,messenger,infoSchool,param,addStudent,statistiques
  ]
  addTeacher.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
} 
function addEleve() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,hme,keyAccess,messenger,infoSchool,param,addTeacher,statistiques
  ]
  addStudent.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
} 
function stats() {
  closeSidebar()
  let pages = [
  prof,clsse,student,avatar,hme,keyAccess,messenger,infoSchool,param,addTeacher,addStudent
  ]
  statistiques.style.display="block"
pages.forEach(page => {
  page.style.display="none"
})
} 

let pieCtx = document.getElementById("pieTotal")
let barCtx = document.getElementById("barTotal")
new Chart(barCtx,{
  type: "bar",
  data: {
    labels: ["1HSC","2HL","1HL","3HSC"],
    datasets: [{
      data: [10,20,12,22],
      label: "Nombre d'eleve: ",
      backgroundColor: "blue",
      borderRadius: 5
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        color: "blue",
        text: "Information",
        font: {
          size: 25,
          weight: "bold"
        }
      }
    }
  }
})
new Chart(pieCtx,{
  type: "pie",
  data : {
  labels: ["Professeurs","Eleves","Classe"],
  datasets: [{
    data: [108,100,10],
    label: "Total : "
  }]
},
  options:{
    plugins: {
      title: {
      display: true,
      text: "Information Graphiques",
      color: "blue",
      font: {
        size: 25,
        weight: "bold"
      }
    }
    }
  }
})



