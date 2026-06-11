// sw.js - Service Worker for Magpas Room Booker

// Install event - activates the worker immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('Service Worker installed.');
});

// Activate event - takes control of the page immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('Service Worker activated.');
});

// Listen for incoming push notifications sent from the server/script
self.addEventListener('push', (event) => {
    let data = { title: 'Room Booking Reminder', body: 'Time to book your room for your upcoming shift!' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: './icon.png', // Placeholder icon link
        badge: './badge.png',
        vibrate: [200, 100, 200],
        requireInteraction: true // Keeps the notification on screen until tapped
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
