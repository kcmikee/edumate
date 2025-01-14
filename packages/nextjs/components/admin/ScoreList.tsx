"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ReactPaginate from "react-paginate";
import useGetScores from "~~/hooks/adminHooks/useGetScores";

const ScoreList = () => {
  const { list, listOfScoreURIIsPending } = useGetScores();

  // Pagination
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, list, list.length]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <section className="flex flex-col w-full py-6">
      <main className="flex flex-col w-full gap-7">
        <div className="flex flex-col items-start justify-between w-full gap-3 md:flex-row md:gap-0 md:items-end">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Score List</h1>
            <h4 className="text-lg tracking-wider text-color2"> List of students score </h4>
            <p className="text-sm text-color2">
              To upload student&apos;s score,{" "}
              <Link href="/admin/uploadscore" className=" text-color1 hover:underline">
                Click here
              </Link>
            </p>

            {/* Guidelines */}
            <div className="flex flex-col w-full mt-4 text-red-600">
              <h5 className="text-sm text-red-600">Guidelines</h5>
              <ol className="text-xs text-red-600 list-decimal list-inside">
                <li>List of students scores will be displayed here.</li>
                <li>Score lists are sorted in ascending order. Eg. first - last</li>
                <li>Click on the &apos;View Score&apos; button to view the score in tabular format.</li>
              </ol>
            </div>
          </div>
        </div>

        {listOfScoreURIIsPending ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-lg font-bold text-center md:text-2xl text-color1">Fetching scores...</h1>
          </div>
        ) : listOfScoreURIIsPending === false && list?.length === 0 ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-lg font-bold text-center md:text-2xl text-color1">No scores uploaded yet</h1>
          </div>
        ) : null}

        <div className="grid w-full gap-4 lg:grid-cols-3 md:grid-cols-2 md:gap-6">
          {currentItems?.map((lis, index) => (
            <div className="flex flex-col items-start w-full gap-2 px-5 py-4 bg-gray-200 rounded" key={index}>
              <h3 className="font-semibold text-color3">{lis.score}</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border-none outline-none rounded px-3 bg-color1 hover:bg-color2 text-gray-200 py-1.5">
                    View Score
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[625px] max-w-full h-[450px]">
                  <DialogHeader>
                    <DialogTitle>{lis.score} Score</DialogTitle>
                    <DialogDescription>Students {lis.score} sheet</DialogDescription>
                  </DialogHeader>
                  <main className="w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="text-gray-300 bg-color2 hover:bg-color2">
                          <TableHead className="font-semibold text-gray-300">S/N</TableHead>
                          <TableHead className="font-semibold text-gray-300">Student</TableHead>
                          <TableHead className="font-semibold text-gray-300">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lis.data.map((td: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className=" text-nowrap">{td.student}</TableCell>
                            <TableCell className=" text-nowrap">{td.score}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </main>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* pagination */}
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

export default ScoreList;
