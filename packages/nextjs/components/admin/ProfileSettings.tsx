"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import useEditMentorsName from "~~/hooks/nameEditingHooks/useEditMentorsName";
import useRequestNameCorrection from "~~/hooks/nameEditingHooks/useRequestNameCorrection";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`;

  /* started handling the request for the change of name */
  const { requestNameCorrection } = useRequestNameCorrection();

  const handleRequestNameChange = () => {
    requestNameCorrection();
  };
  /* Ended handling the request for the change of name */

  const { editMentorsName } = useEditMentorsName(fullName);

  const handleNameChange = (e: FormEvent) => {
    e.preventDefault();
    editMentorsName();
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
              <li>Only signed in user can update his/her name.</li>
              <li>Click on the &apos;Request Name Change&apos; button to request for name update first.</li>
              <li>Then, fill-in the form with your new names.</li>
              <li>Click on the &apos;Update data&apos; button to update your name.</li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col items-center w-full mt-6">
          <div className="flex flex-col items-center mb-3">
            <Button
              className="border-none outline-none px-3 py-1.5 rounded bg-color1 text-gray-200 capitalize hover:bg-color2 text-sm"
              onClick={handleRequestNameChange}
            >
              request name change
            </Button>
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
                className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
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
                className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-3">
              <Button type="submit" className="bg-color1 hover:bg-color2" onClick={handleNameChange}>
                Upload Data
              </Button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default ProfileSettings;
