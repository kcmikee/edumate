import dynamic from "next/dynamic";

// import Upload from "~~/components/admin/Upload";

const Upload = dynamic(() => import("~~/components/admin/Upload"), { ssr: false });

export default function FileUpload() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Upload />
    </main>
  );
}
