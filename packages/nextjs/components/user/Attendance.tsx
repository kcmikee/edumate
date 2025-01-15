"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ReactPaginate from "react-paginate";
import { useAccount } from "wagmi";
import useGetSignedAttendanceImages from "~~/hooks/studentHooks/useGetSignedAttendanceImages";

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @next/next/no-img-element */
const UserAttendenceNFT = () => {
  const { address } = useAccount();
  const { signedAttendanceImages, isLoading } = useGetSignedAttendanceImages(address);

  // Pagination
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(signedAttendanceImages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(signedAttendanceImages.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, signedAttendanceImages.length, signedAttendanceImages.length]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % signedAttendanceImages.length;
    setItemOffset(newOffset);
  };
  return (
    <section className="flex flex-col w-full py-6">
      <main className="flex flex-col w-full gap-7">
        <div className="flex flex-col ">
          <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Attendence</h1>
          <h4 className="text-lg tracking-wider text-color2">All Attendence NFTs</h4>
        </div>
        {isLoading ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-lg font-bold text-center md:text-2xl text-color1">Fetching signed attendance...</h1>
          </div>
        ) : isLoading === false && signedAttendanceImages?.length === 0 ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-lg font-bold text-center md:text-2xl text-color1">No attendance signed yet</h1>
          </div>
        ) : null}
        <section className="grid w-full gap-6 lg:grid-cols-3 md:grid-cols-2 lg:gap-6 md:gap-8">
          {currentItems?.map((list, index) => (
            <div className="w-full p-3 rounded bg-color2" key={index}>
              <div className="flex flex-col justify-between w-full gap-3 bg-transparent">
                <div className="w-full h-[250px] relative overflow-hidden rounded">
                  <img src={list.imageURI} alt="NFtImage" className="object-cover object-top w-full h-full" />
                </div>
                <h2 className="text-sm font-medium text-gray-300">Topic: {list.topic}</h2>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
                  <div className="flex flex-col">
                    <h3 className="font-bold uppercase text-color1">NFT ID</h3>
                    <h5 className="text-color2">{list.lectureId}</h5>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-sm text-white bg-color1 hover:bg-color2">View</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader>
                        <DialogTitle>edumate</DialogTitle>
                        <DialogDescription>Attendence Detail</DialogDescription>
                      </DialogHeader>
                      <main className="flex flex-col w-full gap-4 mb-3 overflow-y-auto md:flex-row">
                        <div className="flex-1">
                          <div className="w-full h-[200px] overflow-hidden rounded">
                            <img src={list.imageURI} alt="NFtImage" className="object-cover object-top w-full h-full" />
                          </div>
                          <section>
                            <div>{list.mentorName}</div>
                            <div>{list.topic}</div>
                          </section>
                        </div>
                      </main>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </section>
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
      </main>
    </section>
  );
};
export default UserAttendenceNFT;
