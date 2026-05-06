import SkeletonPage, { SkeletonProfileCard, SkeletonSummaryCard } from "../components/SkeletonPage";

export default function AmountDue({ onBack }) {
  return (
    <SkeletonPage
      title="Amount Due"
      subtitle="View your current account balance and charges"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonSummaryCard />
    </SkeletonPage>
  );
}
