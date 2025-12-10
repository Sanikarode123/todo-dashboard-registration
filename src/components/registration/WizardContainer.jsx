// src/components/registration/WizardContainer.jsx
import React from 'react';
import { useStepper } from '../../hooks/useStepper';
import Step1 from './Step1_Personal';
import Step2 from './Step2_Address';
import Step3 from './Step3_DocUpload';
import Step4 from './Step4_ReviewSubmit';

const steps = [Step1, Step2, Step3, Step4];

export default function WizardContainer() {
  const { currentStep, nextStep, prevStep, goToStep, totalSteps } = useStepper(steps.length);

  const Step = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        Step {currentStep + 1} of {totalSteps}
      </div>
      <Step next={nextStep} back={prevStep} goTo={goToStep} />
    </div>
  );
}
