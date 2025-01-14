"use client";

import { FormEvent, useState } from "react";
import { Button } from "~~/components/ui/button";
import useEditStudentsName from "~~/hooks/nameEditingHooks/useEditStudentsName";
import useRequestNameCorrection from "~~/hooks/nameEditingHooks/useRequestNameCorrection";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`;

  /* started handling the request for the change of name */
  const { requestNameCorrection } = useRequestNameCorrection();

  const handleRequestNameChange = () => {
    requestNameCorrection();
  };
  /* Ended handling the request for the change of name */

  const { editStudentsName } = useEditStudentsName(fullName);

  const handleNameChange = (e: FormEvent) => {
    e.preventDefault();
    editStudentsName();
  };

  return (
    <section className="flex flex-col w-full py-6">
      <main className="flex flex-col w-full gap-7">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Basic Details</h1>
          <h4 className="text-lg tracking-wider text-color2">Personal Information</h4>
          {/* Guidelines */}
          <div className="flex flex-col w-full mt-4 text-red-600">
            <h5 className="text-sm text-red-600">Guidelines</h5>
            <ol className="text-xs text-red-600 list-decimal list-inside">
              <li>
                If you identify an error in your registered name, you may submit a request for a name change Using the
                button below.
              </li>
              <li>You will then be prompted to sign the transaction to authorize the update.</li>
              <li>
                Once the initial transaction has been successfully signed, you will be able to enter your desired new
                name in the designated input field and submit to complete the name change process.
              </li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col items-center w-full mt-6">
          <div className="flex flex-col items-center mb-3">
            <button
              className="px-3 py-2 text-white capitalize transition-all ease-in-out rounded-md bg-color2 hover:bg-color1"
              onClick={handleRequestNameChange}
            >
              request name change
            </button>
          </div>
          <form className="lg:w-[50%] md:w-[70%] w-full grid gap-4" onSubmit={handleNameChange}>
            <div className="flex flex-col">
              <label htmlFor="firstname" className="ml-1 font-medium text-color3">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your first name"
                className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color2 border-color2/60 bg-color1/5 text-color3"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="ml-1 font-medium text-color3">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter your last name"
                className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color2 border-color2/60 bg-color1/5 text-color3"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col mt-3">
              <Button
                type="submit"
                className="transition-all ease-in-out bg-color2 hover:bg-color1"
                onClick={handleNameChange}
              >
                Upload Data
              </Button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}
