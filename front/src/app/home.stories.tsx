import RootLayout from "./layout";
import Home from "./page";

export default {
  title: "Pages/Home",
  component: RootLayout,
};

export const HomePage = () => (
  <RootLayout>
    <Home />
  </RootLayout>
);
