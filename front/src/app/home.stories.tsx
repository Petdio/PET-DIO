import RootLayout from "./layout";
import Home from "./page";

export default {
  title: "Pages/Home",
  component: Home,
};

export const HomePage = () => (
  <RootLayout>
    <Home />
  </RootLayout>
);
