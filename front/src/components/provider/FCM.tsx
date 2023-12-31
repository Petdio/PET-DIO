"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useAlert } from "./AlertProvider";

interface FcmTokenContextType {
  fcmToken: string;
  setFcmToken: React.Dispatch<React.SetStateAction<string>>;
}

const FcmTokenContext = createContext<FcmTokenContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const FcmTokenProvider = ({ children }: Props) => {
  const [fcmToken, setFcmToken] = useState("");

  return (
    <FcmTokenContext.Provider value={{ fcmToken, setFcmToken }}>
      {children}
    </FcmTokenContext.Provider>
  );
};

export const useFcmToken = () => {
  const context = useContext(FcmTokenContext);
  if (!context) {
    throw new Error("useFcmToken must be used within a FcmTokenProvider");
  }
  return context;
};

export default function FcmTokenFetcher() {
  const { setFcmToken } = useFcmToken();
  const { failed } = useAlert();

  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return;
    }

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
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
    })
      .then((token) => {
        if (token) {
          // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
          setFcmToken(token);
          localStorage.setItem("fcmToken", token);
          console.log(token);
        } else {
          failed("Error : 사용 가능한 fcm 토큰이 없습니다.");
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        failed("Error : fcm 토큰 발급에 실패했습니다.");
        console.log("An error occurred while retrieving token. ", err);
      });

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    // });
  };

  useEffect(() => {
    onMessageFCM();
  }, []);

  return <></>;
}
