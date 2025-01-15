import dynamic from "next/dynamic";

// import UserAssessment from "~~/components/user/Assessment";

const UserAssessment = dynamic(() => import("~~/components/user/Assessment"), { ssr: false });

const Assessment = () => {
  return (
    <section>
      <UserAssessment />
    </section>
  );
};

export default Assessment;
