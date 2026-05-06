import SkeletonPage, { SkeletonProfileCard, SkeletonFormCard } from "../components/SkeletonPage";

export default function PreEnlistment({ onBack }) {
  return (
    <SkeletonPage
      title="Pre-enlistment"
      subtitle="Pre-enlist subjects for the upcoming semester"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonFormCard />
    </SkeletonPage>
  );
}
