"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card";
import useSignAttendance from "~~/hooks/studentHooks/useSignAttendance";

export default function SubmitAttendanceID() {
  const [attendanceId, setAttendanceId] = useState("");
  const { signAttendance, isConfirming } = useSignAttendance(attendanceId);

  const handleOnChange = (e: any) => {
    setAttendanceId(e.target.value);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    signAttendance();
  };

  return (
    <div>
      {/* Guidelines */}
      <div className="flex flex-col w-full mt-4 text-red-600">
        <h5 className="text-sm text-red-600">Guidelines</h5>
        <ol className="text-xs text-red-600 list-decimal list-inside">
          <li>
            Upon the mentor&apos;s creation of the attendance record and notification of the corresponding ID, you will
            be able to sign in.
          </li>
          <li>
            After the ID is announced, please enter it into the designated input field and submit to complete the
            attendance signing process.
          </li>
          <li>Attendance signing can be facilitated through your digital wallet.</li>
          <li>Please note that attendance can only be signed once per instance.</li>
          <li>
            Important: Failure to sign attendance in a timely manner may result in the closure of the attendance record.
          </li>
          <li>
            All attendance signed can be found here :
            <Link href="/user/attendance" className="ml-1 underline">
              attendance
            </Link>
          </li>
        </ol>
      </div>
      <Card className="w-[90%] md:w-[50%] shadow-lg mt-20 mx-auto bg-gray-200/70 border-color2/20 hover:border-color2/40">
        <div>
          <CardHeader>
            <CardTitle className="capitalize text-bg-color2/20">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-3">Enter ID</CardDescription>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter Lecture ID"
              className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color2 border-color2/60 bg-color1/5 text-color3"
              value={attendanceId}
              onChange={handleOnChange}
            />
          </CardContent>
          <div className="flex justify-end ">
            <CardFooter className="gap-2">
              <Button
                className="text-black transition-all ease-in-out"
                onClick={handleOnSubmit}
                disabled={isConfirming}
              >
                Submit
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
