import LogIn from "./page";
import ThemeRegistry from "@/styles/ThemeRegistry";

export default {
  title: "Pages/LogIn",
  component: LogIn,
};

export const LogInPage = () => (
  <ThemeRegistry>
    <LogIn />
  </ThemeRegistry>
);
