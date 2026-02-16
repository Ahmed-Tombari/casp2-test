import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo-casp.png"
        alt="logo"
        width={60}
        height={60}
        className="w-auto h-12"
        quality={100}
      />
    </Link>
  );
};

export default Logo;
