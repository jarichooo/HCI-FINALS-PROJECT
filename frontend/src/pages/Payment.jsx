import SkeletonPage, { SkeletonProfileCard, SkeletonTableCard } from "../components/SkeletonPage";

export default function Payment({ onBack }) {
  return (
    <SkeletonPage
      title="Payment"
      subtitle="View and manage your payment transactions"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonTableCard />
    </SkeletonPage>
  );
}
