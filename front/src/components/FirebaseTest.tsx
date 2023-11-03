"use client";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { useEffect } from "react";

export default function FirebaseTest() {
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
    });

    const messaging = getMessaging(firebaseApp);

    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, {
      vapidKey:
        "BC60OZIIBclHRXfrERSFZU5JR_FIIxuMx40afieyYUHuY_Jy8llU8rJvSjw5QuZU55lS7h69GAEK1cRc9H9RtWQ",
    })
      .then((currentToken) => {
        if (currentToken) {
          // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
          console.log(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  };

  useEffect(() => {
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .register("/firebase-messaging-sw.js")
    //     .then(function (registration) {
    //       console.log("Registration successful, scope is:", registration.scope);
    //     })
    //     .catch(function (err) {
    //       console.log("Service worker registration failed, error:", err);
    //     });
    // }
    onMessageFCM();
  }, []);

  return <></>;
}
