import dynamic from "next/dynamic";

// import UserSettings from "~~/components/user/UserSettings";

const UserSettings = dynamic(() => import("~~/components/user/UserSettings"), { ssr: false });

export default function Form() {
  return (
    <section>
      <UserSettings />
    </section>
  );
}
