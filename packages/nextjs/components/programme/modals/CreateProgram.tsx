import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { PencilIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { CustomModal } from "~~/components/CustomModal";
import LoadingModal from "~~/components/LoadingModal";
import { Button } from "~~/components/ui/button";
import useCreateNewProgramme from "~~/hooks/authentication/useCreateNewProgramme";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  secretKey: string;
}

const CreateProgram = ({ isOpen, onClose, apiKey, secretKey }: IProps) => {
  const { isConnected } = useAccount();
  //   const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  //   const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

  const [instName, setInstName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [programmeName, setProgrammeName] = useState<string>("");
  const [imageURI, setImageURI] = useState<string>("");

  const { createProgramme, isWriting, isConfirming, isSuccess } = useCreateNewProgramme(
    instName,
    programmeName,
    imageURI,
    adminName,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isConnected) return toast.error("Please connect wallet", { position: "top-right" });
    if (instName === "")
      return toast.error("Please enter institution name", {
        position: "top-right",
      });
    if (adminName === "") return toast.error("Please enter admin name", { position: "top-right" });
    if (programmeName === "")
      return toast.error("Please enter programme name", {
        position: "top-right",
      });
    if (imageURI === "") return toast.error("Please select image", { position: "top-right" });

    createProgramme();
    if (isSuccess) {
      setInstName("");
      setAdminName("");
      setProgrammeName("");
      setImageURI("");
    }
  };

  const [selectedFile, setSelectedFile] = useState<any>();

  const handleSelectImage = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
  };

  const getImage = useCallback(async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        formData.append("file", selectedFile!);
        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: `${apiKey}`,
            pinata_secret_api_key: `${secretKey}`,
          },
        });

        const fileUrl = response.data.IpfsHash;
        const gateWayAndhash = `https://chocolate-rainy-cuckoo-594.mypinata.cloud/ipfs/${fileUrl}`;
        setImageURI(gateWayAndhash);

        toast.success("Image URI fetched successfully", {
          position: "top-right",
        });

        return fileUrl;
      } catch (error) {
        console.log("Pinata API Error:", error);
        toast.error("Error fetching Image URI", { position: "top-right" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      getImage();
    }
  }, [selectedFile, getImage]);

  //   const handleRoute = () => {
  //     if (!isConnected) {
  //       // return toast.error("Please connect wallet", { position: "top-right" });
  //     } else {
  //       router.push("/viewprogramme");
  //     }
  //   };
  return (
    <CustomModal
      title="Edumate"
      description="Create new programme on Edumate"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[425px] bg-white"
    >
      <form className="grid w-full gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full">
          <div className="w-[80px] h-[80px] border rounded-md relative ">
            {selectedFile ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="profile"
                className="object-cover w-full h-full"
                width={440}
                height={440}
                priority
                quality={100}
              />
            ) : (
              <span className="relative flex items-center justify-center w-full h-full">
                <PhotoIcon className="relative inline-flex h-8 w-8 !text-2xl text-gray-300 rounded" />
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              className="hidden"
              id="selectFile"
              onChange={handleSelectImage}
            />
            <label
              htmlFor="selectFile"
              className=" absolute -right-1 p-1 rounded-full -bottom-1 cursor-pointer bg-gray-100 border-[0.5px] border-gray-200 font-Bebas tracking-wider dark:text-white"
            >
              <PencilIcon className="w-4 h-4 text-gray-500" />
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="institutionName" className="ml-1 font-medium text-color3 dark:text-black">
            Institution Name
          </label>
          <input
            type="text"
            name="institutionName"
            id="institutionName"
            placeholder="Enter institution name"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
            value={instName}
            onChange={e => setInstName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="adminName" className="ml-1 font-medium text-color3 dark:text-black">
            Administrator Name
          </label>
          <input
            type="text"
            name="adminName"
            id="adminName"
            placeholder="Enter admin name"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
            value={adminName}
            onChange={e => setAdminName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="programmeName" className="ml-1 font-medium text-color3 dark:text-black">
            Programme Name
          </label>
          <input
            type="text"
            name="programmeName"
            id="programmeName"
            placeholder="Enter programme name"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
            value={programmeName}
            onChange={e => setProgrammeName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="imageURI" className="ml-1 font-medium text-color3 dark:text-black">
            Image URI
          </label>
          <input
            type="text"
            name="imageURI"
            id="imageURI"
            placeholder="Choose an image for URI to show"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
            value={imageURI}
            readOnly
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            // disabled={isWriting || isConfirming}
            className="w-full text-white bg-eduBlack"
          >
            Submit
          </Button>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <LoadingModal isOpen={isWriting || isConfirming} onClose={() => {}} />
      </form>
    </CustomModal>
  );
};

export default CreateProgram;
