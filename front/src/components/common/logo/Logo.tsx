import Image from "next/image";
import { theme } from "@/styles/ThemeRegistry";

interface Props {
  size?: "large" | "small";
}

function Logo({ size = "small", ...props }: Props) {
  const primaryColor = theme.palette.primary.main;
  switch (size) {
    case "small":
      return (
        <Image src="/assets/PETDIO.svg" alt="logo" width={52} height={12} />
      );
    case "large":
      return (
        <Image src="/assets/PETDIO.svg" alt="logo" width={296} height={94} />
      );
  }
}

export default Logo;
