import LogIn from "./page";
import RootLayout from "@/app/layout";

export default {
  title: "Pages/LogIn",
  component: LogIn,
};

export const LogInPage = () => (
  <RootLayout>
    <LogIn />
  </RootLayout>
);
