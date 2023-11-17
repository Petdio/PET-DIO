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

  const resultData = e.data.json();

  const notificationOptions = {
    icon: resultData.data.url, // 웹 푸시 이미지는 icon
  };

  console.log("메세지:", resultData);
  if (resultData.data.url === "image fail") {
    self.registration.showNotification("이미지 생성 실패!");
  } else if (resultData.data.url === "model fail") {
    self.registration.showNotification("모델 생성 실패!");
  } else if (resultData.data.url === "model") {
    self.registration.showNotification("모델 생성 완료!");
  } else {
    self.registration.showNotification(
      "이미지 생성 완료!",
      notificationOptions
    );
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click", event.notification.icon);
  event.notification.close();

  if (resultData.data.url === "image fail") {
    event.waitUntil(clients.openWindow(`/studio`));
  } else if (
    resultData.data.url === "model fail" ||
    resultData.data.url === "model"
  ) {
    event.waitUntil(clients.openWindow(`/ai-studio`));
  } else {
    const imageKey = event.notification.icon.match(/\/([^/]+)\.jpg$/);
    event.waitUntil(clients.openWindow(`/studio/result?img=${imageKey[1]}`));
  }
});
