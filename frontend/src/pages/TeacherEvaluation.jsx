import SkeletonPage, { SkeletonProfileCard, SkeletonFormCard } from "../components/SkeletonPage";

export default function TeacherEvaluation({ onBack }) {
  return (
    <SkeletonPage
      title="Teacher Evaluation"
      subtitle="Evaluate your instructors and provide feedback"
      onBack={onBack}
    >
      <SkeletonProfileCard />
      <SkeletonFormCard />
    </SkeletonPage>
  );
}
