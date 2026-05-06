import SkeletonPage, { SkeletonProfileCard, SkeletonFormCard } from "../components/SkeletonPage";

export default function DisableIDCard({ onBack }) {
  return (
    <SkeletonPage
      title="Disable ID Card"
      subtitle="Request to disable or block your student ID card"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonFormCard />
    </SkeletonPage>
  );
}
