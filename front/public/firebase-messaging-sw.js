importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  apiKey: "AIzaSyA8dm4dLdq6ulaKX60GN5TcOz5duaMU-9w",
  authDomain: "pet-dio.firebaseapp.com",
  projectId: "pet-dio",
  storageBucket: "pet-dio.appspot.com",
  messagingSenderId: "64465647149",
  appId: "1:64465647149:web:e6b3c9823e78c668daeaa4",
  measurementId: "G-4HGPR7ZWG3",
});

const messaging = firebase.messaging();

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  console.log("메세지:", resultData);
  // self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
