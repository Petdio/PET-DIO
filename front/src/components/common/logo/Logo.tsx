import Image from "next/image";

interface Props {
  size?: "large" | "small";
}

function Logo({ size = "small" }: Props) {
  switch (size) {
    case "small":
      return (
        <Image src="/assets/PETDIO.svg" alt="logo" width={60} height={20} />
      );
    case "large":
      return (
        <Image src="/assets/PETDIO.svg" alt="logo" width={296} height={94} />
      );
  }
}

export default Logo;
