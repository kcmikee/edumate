"use client";

import { useAccount } from "wagmi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import useGetStudentScore from "~~/hooks/studentHooks/useGetStudentScore";

const UserAssignment = () => {
  const { address } = useAccount();
  const { list, listOfScoreURIIsPending } = useGetStudentScore(address);

  return (
    <section className="flex flex-col w-full py-6">
      <main className="flex flex-col w-full gap-7">
        <div className="flex flex-col items-start justify-between w-full gap-3 md:flex-row md:gap-0 md:items-end">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Score List</h1>
            <h4 className="text-lg tracking-wider text-color2"> Your score list </h4>
            {/* Guidelines */}
            <div className="flex flex-col w-full mt-4 text-red-600">
              <h5 className="text-sm text-red-600">Guideline</h5>
              <p className="text-xs text-red-600">Your scores will be displayed here as you progress...</p>
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

        <div className="w-full ">
          <Table>
            <TableHeader>
              <TableRow className="text-gray-300 bg-color2 hover:bg-color2">
                <TableHead className="font-semibold text-gray-300">S/N</TableHead>
                <TableHead className="font-semibold text-gray-300">Score List</TableHead>
                <TableHead className="font-semibold text-gray-300">Student</TableHead>
                <TableHead className="font-semibold text-gray-300">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((lis, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lis.scorelist}</TableCell>
                  <TableCell>{lis.student}</TableCell>
                  <TableCell>{lis.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
};

export default UserAssignment;
