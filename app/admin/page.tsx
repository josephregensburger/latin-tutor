import { WorkflowSteps } from "@/components/WorkflowSteps";

const workflow = [
  "Enter an authentic or generated Latin sentence.",
  "Review candidate morphology and dependency analysis from the NLP service.",
  "Correct the token annotations and translation; retain alternate analyses when needed.",
  "Approve the reviewed sentence before it becomes available to students.",
];

export default function AdminPage() {
  return (
    <main className="admin-page">
      <p className="admin-eyebrow">LINGUA · AUTHORING</p>
      <h1>Sentence truthing</h1>
      <p className="admin-intro">
        NLP output is a proposal. Review and approve every analysis before it enters student practice.
      </p>
      <WorkflowSteps steps={workflow} />
      <p className="admin-note">
        The authoring interface and persistence are scaffolded next. The current student prototype is
        available at <a href="/student">/student</a>.
      </p>
    </main>
  );
}
