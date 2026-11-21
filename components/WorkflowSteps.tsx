type WorkflowStepsProps = { steps: readonly string[] };

export function WorkflowSteps({ steps }: WorkflowStepsProps) {
  return (
    <ol>
      {steps.map((step) => <li key={step}>{step}</li>)}
    </ol>
  );
}
