import Image from 'next/image';
import Link from 'next/link';

interface Props {
  size?: 'large' | 'small';
}

function Logo({ size = 'small' }: Props) {
  switch (size) {
    case 'small':
      return (
        <Link href={'/studio'}>
          <Image
            src="/assets/Logo_inapp_primary.svg"
            alt="logo"
            width={96}
            height={48}
          />
        </Link>
      );
    case 'large':
      return (
        <Image
          src="/assets/PETDIO.svg"
          alt="logo"
          width={250}
          height={94}
        />
      );
  }
}

export default Logo;
