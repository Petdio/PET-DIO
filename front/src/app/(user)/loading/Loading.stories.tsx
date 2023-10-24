import Loading from "./page";
import RootLayout from "@/app/layout";
import UserLayout from "../layout";

export default {
  title: "Pages/Loading",
  component: Loading,
};

export const LoadingPage = () => (
  <RootLayout>
    <UserLayout>
      <Loading />
    </UserLayout>
  </RootLayout>
);
