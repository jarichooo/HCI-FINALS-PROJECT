import SkeletonPage, { SkeletonProfileCard, SkeletonFormCard } from "../components/SkeletonPage";

export default function Enrollment({ onBack }) {
  return (
    <SkeletonPage
      title="Enrollment"
      subtitle="Enroll in courses for the current semester"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonFormCard />
    </SkeletonPage>
  );
}
