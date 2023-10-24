import Studio from "./page";
import UserLayout from "../layout";

export default {
  title: "Pages/Studio",
  component: Studio,
};

export const StudioPage = () => (
  <UserLayout>
    <Studio />
  </UserLayout>
);
