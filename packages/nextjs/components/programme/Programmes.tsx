"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import CreateProgram from "./modals/CreateProgram";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useAccount } from "wagmi";
import useGetUserOrganisations from "~~/hooks/authentication/useGetUserOrganisation";

const Programmes = ({ apiKey, secretKey }: any) => {
  const { isConnected, address } = useAccount();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // redirect to programme page if not connected
  const change = useCallback(async () => {
    if (!isConnected) {
      router.push("/programme");
    }
  }, [isConnected, router]);

  useEffect(() => {
    change();
  }, [change, isConnected]);

  // getting list of organisations
  const { list: listOfOrganisations, isLoading } = useGetUserOrganisations(address);

  // route handling
  const handleRouting = (contract_address: string, mentor: boolean, student: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("active_organisation", JSON.stringify(contract_address));
      if (mentor) {
        router.push(`/admin`);
      } else if (student) {
        router.push(`/user`);
      } else {
        return toast.error("You're not allowed access !", {
          position: "top-right",
        });
      }
    }
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listOfOrganisations.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listOfOrganisations.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, listOfOrganisations.length, listOfOrganisations.length]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % listOfOrganisations.length;
    setItemOffset(newOffset);
  };

  return (
    <section className="flex flex-col w-full !mt-20">
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-color1">MY PROGRAMMES</h1>
          {/* <p className="text-lg text-color3">Welcome to Classmate + Programmes</p> */}
        </div>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          type="button"
          className="flex items-center gap-1 text-white bg-eduBlack hover:bg-eduBlack/80"
        >
          Create new programmes {/* <IoIosAddCircleOutline className="text-xl" /> */}
        </Button>
      </div>
      {isLoading ? (
        <div className="w-full h-[250px] flex justify-center items-center">
          <h1 className="text-lg font-bold text-center md:text-2xl text-color1">Fetching organisations...</h1>
        </div>
      ) : isLoading === false && listOfOrganisations?.length === 0 ? (
        <div className="w-full h-[250px] flex justify-center items-center">
          <h1 className="text-lg font-bold text-center md:text-2xl text-color1">No programmes created yet</h1>
        </div>
      ) : null}
      <main className="grid w-full gap-8 mt-16 lg:grid-cols-3 md:grid-cols-2 md:gap-6 lg:gap-8">
        {currentItems?.map((organisation, index) => (
          <div
            key={index}
            className="relative flex flex-col w-full gap-4 border rounded-lg shadow-lg cursor-pointer p-7 border-color2/10 hover:border-color1"
            onClick={() => handleRouting(organisation.address, organisation.isMentor, organisation.isStudent)}
          >
            <div className="w-[120px] h-[120px] rounded-full bg-gray-200 relative">
              <Image
                src={organisation.imageURI}
                alt={organisation.name}
                fill
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <h3 className="text-xl font-medium text-color1">{organisation.name}</h3>
            {/* <div className="w-[15%] h-1.5 rounded-lg bg-color1"></div> */}

            <h5 className="text-sm capitalize text-color3">{organisation.cohort}</h5>

            <div className="flex items-end justify-between w-full mt-4">
              <div className="flex flex-col">
                <small className="text-xs text-color3">Role</small>
                {organisation.isMentor && <h4 className="font-bold text-color1">Admin</h4>}
                {organisation.isStudent && <h4 className="font-bold text-color1">Student</h4>}
              </div>
            </div>

            <div className="absolute flex flex-col items-center top-6 right-6">
              <small className="text-xs text-color3">Status</small>
              <h4
                className={`${organisation.status ? "text-green-500 bg-green-100" : "text-red-600 bg-red-100"}  rounded-lg px-2 py-1.5 font-medium text-xs`}
              >
                {organisation.status ? "Ongoing" : "Ended"}
              </h4>
            </div>
          </div>
        ))}
      </main>
      <div className="flex flex-col items-center justify-center w-full gap-4 md:flex-row">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center items-center mt-8 gap-1 pb-4"
          pageLinkClassName="py-2 md:px-4 px-3 md:text-base text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 transition-all duration-300"
          previousLinkClassName="py-2 md:px-4 px-3 md:text-base text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 transition-all duration-300"
          nextLinkClassName="py-2 md:px-4 px-3 md:text-base text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 transition-all duration-300"
          activeLinkClassName="rounded-xl"
        />
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

export default Programmes;
