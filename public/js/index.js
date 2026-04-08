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
    applicationServerKey: "TA_PUBLIC_VAPID_KEY_ICI"
  });

  console.log("Subscription:", subscription);

  await fetch("/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription)
  });

  console.log("Abonnement envoyé au serveur");
}

document.addEventListenter("DOMContentLoaded",() => {
    initPush()
})
