import Loading from "./page";
import RootLayout from "../../layout";

export default {
  title: "Pages/Loading",
  component: Loading,
};

export const LoadingPage = () => (
  <RootLayout>
    <Loading />
  </RootLayout>
);
