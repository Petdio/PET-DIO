import Loading from "./page";
import UserLayout from "../layout";

export default {
  title: "Pages/Loading",
  component: Loading,
};

export const LoadingPage = () => (
  <UserLayout>
    <Loading />
  </UserLayout>
);
