import SkeletonPage, { SkeletonProfileCard, SkeletonFormCard } from "../components/SkeletonPage";

export default function GetTransactionNumber({ onBack }) {
  return (
    <SkeletonPage
      title="Get Transaction Number"
      subtitle="Generate a transaction number for payment"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonFormCard />
    </SkeletonPage>
  );
}
