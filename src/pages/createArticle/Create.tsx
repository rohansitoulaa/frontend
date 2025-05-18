import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step5 from "./Step5";
import Step4 from "./Step4";

import { useNavigate } from "react-router-dom";

const Create = () => {
  const [step, setStep] = useState(1); // Track which step the user is on
  const navigate = useNavigate();
  const handleNext = () => {
    if (step === 1) {
      setStep(2); // Move to Step 2 once Step 1 is completed
    } else if (step === 2) {
      setStep(3); // Move to Step 3 once Step 2 is completed
    } else if (step === 3) {
      setStep(4); // Move to Step 3 once Step 2 is completed
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // Decrease the step to go back
    }
  };
  const handleFinish = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Step3 onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <Step4 onNext={handleNext} onBack={handleBack} />}

        {step === 5 && <Step5 onFinish={handleFinish} />}
      </div>
    </div>
  );
};

export default Create;
