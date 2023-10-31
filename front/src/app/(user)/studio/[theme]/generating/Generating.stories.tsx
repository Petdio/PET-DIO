import Generating from "./page";
import RootLayout from "@/app/layout";
import UserLayout from "../../../layout";

export default {
  title: "Pages/Generating",
  component: Generating,
};

export const GeneratingPage = () => (
  <RootLayout>
    <UserLayout>
      <Generating />
    </UserLayout>
  </RootLayout>
);
