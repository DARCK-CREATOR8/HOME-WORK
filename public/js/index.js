async function initPush() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker non supporté");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Permission refusée");
    return;
  }

  const registration = await navigator.serviceWorker.register("/sw.js");
  console.log("Service Worker enregistré");

 const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(
    "BIo_hsQ3pb93rTa8kjU1DjCjJZ1tMlGZ3YflnxJJLps0PrTpqwa5yqISByjZ-RiY7Tm14oiMDQDwuk7uQjhMR2s"
  )
});

  console.log("Subscription:", subscription);

  await fetch("/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription)
  });

  console.log("Abonnement envoyé au serveur");
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
const anime = document.querySelectorAll(".anime")
const observer = new IntersectionObserver((entries) => {
  entries.forEach(item => {
    if (item.isIntersecting) {
      item.target.classList.add("late")
    }else {
      item.target.classList.remove("late")
    }
  });
},{
  threshold: 0.1
  })
anime.forEach(ani => observer.observe(ani))
document.addEventListener("DOMContentLoaded",() => {
    initPush()
})
