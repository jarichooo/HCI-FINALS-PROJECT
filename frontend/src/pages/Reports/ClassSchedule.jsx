import SkeletonPage, { SkeletonProfileCard, SkeletonTableCard } from "../../components/SkeletonPage";

export default function ClassSchedule({ onBack }) {
  return (
    <SkeletonPage
      title="Class Schedule"
      subtitle="View your course schedule for the current semester"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonTableCard />
    </SkeletonPage>
  );
}
