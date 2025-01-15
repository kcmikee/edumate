import dynamic from "next/dynamic";

// import ProfileSettings from "~~/components/admin/ProfileSettings";

const ProfileSettings = dynamic(() => import("~~/components/admin/ProfileSettings"), { ssr: false });

export default function Settings() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <ProfileSettings />
    </main>
  );
}
