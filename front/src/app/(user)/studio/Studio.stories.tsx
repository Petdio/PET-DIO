import Studio from "./page";
import RootLayout from "@/app/layout";
import UserLayout from "../layout";

export default {
  title: "Pages/Studio",
  component: Studio,
};

export const StudioPage = () => (
  <RootLayout>
    <UserLayout>
      <Studio />
    </UserLayout>
  </RootLayout>
);
