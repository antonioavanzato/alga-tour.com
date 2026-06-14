/* ============================================================
   ALGA · Service Worker для фоновых push-уведомлений (FCM)
   Файл ДОЛЖЕН лежать рядом с index.html (в той же папке /admin/)
   ============================================================ */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyArhh8lUUpDOQXgYMIZgzt-E3fjCsHs3v8",
  authDomain: "alga-booking.firebaseapp.com",
  projectId: "alga-booking",
  storageBucket: "alga-booking.firebasestorage.app",
  messagingSenderId: "344302117820",
  appId: "1:344302117820:web:7a36b0c06d6d13786881b9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  const data = payload.data || {};
  self.registration.showNotification(n.title || '🔔 Новая заявка ALGA', {
    body: n.body || data.body || '',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%230e5f76'/%3E%3Cpath d='M4 14c3 0 3-3 6-3s3 3 6 3 3-3 4-3' stroke='%237fe3d0' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M4 18c3 0 3-3 6-3s3 3 6 3 3-3 4-3' stroke='%23fff' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
    tag: 'alga-booking',
    data: { url: self.registration.scope }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
