import SkeletonPage, { SkeletonProfileCard, SkeletonTableCard } from "../components/SkeletonPage";

export default function AddDropSubject({ onBack }) {
  return (
    <SkeletonPage
      title="Add / Drop Subject"
      subtitle="Add or drop subjects from your current enrollment"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonTableCard />
    </SkeletonPage>
  );
}
