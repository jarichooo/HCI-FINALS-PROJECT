import SkeletonPage, { SkeletonProfileCard, SkeletonTableCard } from "../../components/SkeletonPage";

export default function PaymentHistory({ onBack }) {
  return (
    <SkeletonPage
      title="Payment History"
      subtitle="View your payment transaction history"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonTableCard />
    </SkeletonPage>
  );
}
