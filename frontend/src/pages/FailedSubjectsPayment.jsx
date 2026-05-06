import SkeletonPage, { SkeletonProfileCard, SkeletonTableCard } from "../components/SkeletonPage";

export default function FailedSubjectsPayment({ onBack }) {
  return (
    <SkeletonPage
      title="Failed Subjects Payment"
      subtitle="Payment for failed subjects and course retakes"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonTableCard />
    </SkeletonPage>
  );
}
