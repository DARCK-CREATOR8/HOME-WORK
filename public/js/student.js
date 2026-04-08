let nots = document.querySelector(".note")
let dev = document.querySelector(".devoirs")
let lcon = document.querySelector(".lecons")
let prfl= document.querySelector(".profil")
let dashboard = document.querySelector(".dashboard")
let messenger  = document.querySelector(".messenger")
let clsse  = document.querySelector(".classe")
let table = [dev,nots,lcon,prfl,messenger,dashboard,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
dashboard.style.display="block"
function note() {
  let table = [dev,lcon,prfl,messenger,dashboard,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
nots.style.display="block"
}
function profil() {
  let table = [dev,nots,lcon,messenger,dashboard,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
prfl.style.display="block"
}
function msg() {
  let table = [dev,nots,lcon,prfl,dashboard,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
messenger.style.display="block"
}
function dash() {
  let table = [dev,nots,lcon,prfl,messenger,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
dashboard.style.display="block"
}
function work() {
  let table = [nots,lcon,prfl,messenger,dashboard,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
dev.style.display="block"
}
function lecon() {
  let table = [dev,nots,prfl,messenger,dashboard,clsse]
table.forEach(tab => {
  tab.style.display="none"
})
lcon.style.display="block"
}
function classe() {
  let table = [dev,nots,lcon,prfl,messenger,dashboard]
table.forEach(tab => {
  tab.style.display="none"
})
clsse.style.display="block"
}
let bg = "dark"
function theme() {
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
let ctx = document.getElementById("rendusChart")
let data = {
  labels: ["Mathematique","Francais","Anglais","Tic","Religion"],
  datasets: [{
    label: "Moyenne",
    data: [10.8,20,8.10,40,10],
    backgroundColor: "blue",
    borderRadius: 8,
    borderWidth: 1
  }]
}
  new Chart(ctx,{
    type: "bar",
    data,
    options: {
      title:{
        display: true,
        text: "Moyenne de matiere"
      },
      legend: {
        position: "top"
      },
      responsive: true
    }
  })

