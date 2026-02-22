importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDuV0ajg1O-Aw9CFFelwJlXy3_QDte7vPs",
  authDomain: "physioflow-7fcfd.firebaseapp.com",
  databaseURL: "https://physioflow-7fcfd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "physioflow-7fcfd",
  storageBucket: "physioflow-7fcfd.firebasestorage.app",
  messagingSenderId: "1065055310692",
  appId: "1:1065055310692:web:ae35f143f6aad77b8c6071"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  var n = payload.notification || {};
  return self.registration.showNotification(n.title || 'PhysioFlow', {
    body: n.body || '',
    icon: 'PhysioFlowPatient.png',
    badge: 'PhysioFlowPatient.png',
    requireInteraction: true
  });
});

const CACHE = 'physioflow-patient-v16';
const ASSETS = ['./index.html', './manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebasedatabase.app') || e.request.url.includes('googleapis.com') || e.request.url.includes('gstatic.com')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
