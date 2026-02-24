// public/sw.js
self.addEventListener('push', function(event) {
    if (!event.data) return;
    
    try {
        const data = event.data.json();
        
        const options = {
            body: data.body || 'Nouvelle notification',
            icon: 'https://raw.githubusercontent.com/DARCK-CREATOR8/HOME-WORK/3ab55eb700f5a9381ffe6fc6a780fa11dfe72ac3/Screenshot_20260215-195450.png',
            badge: 'https://raw.githubusercontent.com/DARCK-CREATOR8/HOME-WORK/3ab55eb700f5a9381ffe6fc6a780fa11dfe72ac3/Screenshot_20260215-195450.png',
            vibrate: [500, 300, 500],
            data: {
                workId: data.data?.workId,
                url: data.data?.url || '/'
            },
            actions: data.actions || [
                {
                    action: 'open',
                    title: 'Ouvrir'
                }
            ],
            requireInteraction: true,
            silent: false
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'Notification', options)
        );
        
    } catch (error) {
        console.error('Erreur parsing notification:', error);
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    // Action spécifique
    if (event.action === 'view') {
        // Ouvre la page du devoir
        event.waitUntil(
            clients.openWindow(urlToOpen)
        );
    } 
    else if (event.action === 'close') {
        // Ne fait rien, juste ferme
        return;
    }
    else {
        // Clic principal - ouvre la page
        event.waitUntil(
            clients.openWindow(urlToOpen)
        );
    }
});

// Pour gérer l'ouverture quand l'app est déjà ouverte
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    const url = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function(clientList) {
            // Si une fenêtre est déjà ouverte, focus dessus
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // Sinon, ouvre une nouvelle fenêtre
            return clients.openWindow(url);
        })
    );
});