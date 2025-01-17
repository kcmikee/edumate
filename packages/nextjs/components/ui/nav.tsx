import Image from "next/image";

// import Link from "next/link";

// const navlink = [
//   { name: "Home", link: "/" },
//   { name: "About", link: "/" },
//   { name: "Contact", link: "/" },
// ];

const NavHeader = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <div className="flex gap-1 shrink-0">
          <Image src={"/logo.png"} width={20} height={20} alt={"logo"} className="object-contain shrink-0" />
          <p className="font-semibold">edumate</p>
        </div>
      </div>
      {/* <nav className="flex items-center gap-7">
        {navlink.map((_link, index) => (
          <Link key={index} href={_link.link} className={`hover:text-eduGreen transition-colors duration-100 ease-in`}>
            {_link.name}
          </Link>
        ))}
      </nav> */}
      <a href="/programme" className="px-4 py-2 text-white rounded-full bg-eduBlack hover:bg-eduBlack/90">
        Launch app
      </a>
    </header>
  );
};

export default NavHeader;
