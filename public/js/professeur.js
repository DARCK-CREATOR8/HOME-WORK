let color = "dark"
let bdy = document.querySelector(".body")
let clsse = document.querySelector(".classe")
let dashb = document.querySelector(".dashboard")
let messenger = document.querySelector(".messenger")
let workL = document.querySelector(".work-list")
let workR = document.querySelector(".work-rendu")
let workAd = document.querySelector(".new-work")
let profl = document.querySelector(".profil")
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
 const ctx = document.getElementById('rendusChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['3ème A', '6ème B', 'Terminale L'],
        datasets: [{
          label: 'Rendus reçus',
          data: [12, 18, 8],
          backgroundColor: '#3b82f6',
          borderRadius: 0
        }, {
          label: 'Total élèves',
          data: [28, 24, 30],
          backgroundColor: '#9ca3af',
          borderRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
    const ctx1 = document.getElementById("moyenChart")
    let data = {
      labels: ["1HSC","1HL","2HSC","2HL"],
      datasets: [{
        label: "Moyenne",
        data: [56.8,67.8,18.8,40],
        backgroundColor:"blue"
      },{
        label: "Total Eleve",
        data: [33,11,17,80],
        backgroundColor:"cyan"
      }
      ]
    }
    new Chart(ctx1,{
      type: "bar",
      data,
      options: {
        plugins:{
          title:{
            display: true,
            text:"Moyenne de classe"
          },
          legend: {
            position: "top"
          }
        },
        responsive: true
      }
    })
let el = [messenger,workAd,workR,workL,clsse,profl]
el.forEach(e => {
  e.style.display="none"
})
dashb.style.display="block"
function dash() {
  let el = [messenger,workAd,workR,workL,clsse,profl]
el.forEach(e => {
  e.style.display="none"
})
dashb.style.display="block"
}
function msg() {
  let el = [dashb,workAd,workR,workL,clsse,profl]
el.forEach(e => {
  e.style.display="none"
})
messenger.style.display="block"
}
function workAdd() {
  let el = [dashb,messenger,workR,workL,clsse,profl]
el.forEach(e => {
  e.style.display="none"
})
workAd.style.display="block"
}
function workList() {
  let el = [dashb,messenger,workR,workAd,clsse,profl]
el.forEach(e => {
  e.style.display="none"
})
workL.style.display="block"
}
function classe() {
  let el = [dashb,messenger,workR,workAd,workL,profl]
el.forEach(e => {
  e.style.display="none"
})
clsse.style.display="block"
}
function profil() {
  let el = [dashb,messenger,workR,workAd,workL,clsse]
el.forEach(e => {
  e.style.display="none"
})
profl.style.display="block"
}
function workRendu() {
  let el = [dashb,messenger,workR,workAd,workL,clsse,profl]
el.forEach(e => {
  e.style.display="none"
})
workR.style.display="block"
  
}


