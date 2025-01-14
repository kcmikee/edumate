import Image from "next/image";

const Logo = () => {
  return (
    <a href={`/`} className="flex items-end">
      <Image src={"/logo.png"} width={20} height={20} alt={"logo"} className="object-contain shrink-0" />
      <span className="text-color2 md:text-lg">edumate</span>
    </a>
  );
};

export default Logo;
