"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import CreateProgram from "./modals/CreateProgram";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const StartProgramme = ({ apiKey, secretKey }: any) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoute = () => {
    if (!isConnected) {
      // return toast.error("Please connect wallet", { position: "top-right" });
    } else {
      router.push("/enrolled");
    }
  };

  return (
    <section className="flex flex-col w-full gap-10 mt-10">
      <div className="flex flex-col w-full gap-1">
        <h1 className="text-2xl font-bold text-eduBlack dark:text-white">Welcome to Edumate</h1>
        <h3 className="text-xl font-medium -mt-2.5">
          Discover the features this platform has to offer and so much more:
        </h3>
      </div>

      <div className="flex flex-col w-full gap-2 mt-0">
        <div className="w-full p-6 rounded-lg md:p-10 bg-eduBlack">
          <ul className="flex flex-col gap-2 ">
            {lists.map((list, index) => (
              <li key={index} className="flex items-start gap-1 ">
                {/* <FaCheckToSlot className="text-base text-white mt-1.5" /> */}
                <p className="flex flex-col text-white">
                  <span className="font-semibold">{list.caption}: </span>
                  <span className="text-base">{list.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-4 md:flex-row">
        {isConnected ? (
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type="button"
            className="flex items-center gap-1 text-white bg-eduBlack hover:bg-eduBlack/80"
          >
            Create new programmes {/* <IoIosAddCircleOutline className="text-xl" /> */}
          </Button>
        ) : (
          <Button
            onClick={() => toast.error("Please connect wallet", { position: "top-right" })}
            type="button"
            className="flex items-center gap-1 text-white hover:bg-gray-100 hover:text-black"
          >
            Create new programmes {/* <IoIosAddCircleOutline className="text-xl" /> */}
          </Button>
        )}
        <Button type="button" variant={`outline`} onClick={handleRoute} className="flex items-center gap-1 border ">
          Go to your programmes {/* <HiOutlineViewfinderCircle className="text-xl" /> */}
        </Button>
      </div>
      <CreateProgram
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        apiKey={apiKey}
        secretKey={secretKey}
      />
    </section>
  );
};

export default StartProgramme;

type ListsType = {
  caption: string;
  text: string;
};

const lists: ListsType[] = [
  {
    caption: "Program Highlights",
    text: "Dive into a clear breakdown of your chosen program, showcasing its structure, lesson count, and course lineup to guide your learning journey.",
  },
  {
    caption: "Learning Modules",
    text: "Uncover a step-by-step outline of all topics covered, giving you a complete view of the knowledge and skills you’ve acquired.",
  },
  {
    caption: "Performance Tracking",
    text: "Stay on top of your progress with transparent evaluation methods and grading systems designed to measure your achievements effectively.",
  },
  {
    caption: "Meet Your Instructors",
    text: "Access essential details about your instructors and facilitators, making it easy to reach out for guidance and support whenever needed.",
  },
];
