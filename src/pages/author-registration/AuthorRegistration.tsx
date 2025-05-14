import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNavigate } from "react-router-dom";

const AuthorRegistration = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // ✅ hook to handle navigation

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    navigate("/"); // ✅ go to home page after step 3 is done
  };

  return (
    <div className="dark:bg-[linear-gradient(to_right,_#111,_#222,_#111)] dark:text-white">
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <Step3 onBack={handleBack} onFinish={handleFinish} />}{" "}
      {/* ✅ added onFinish */}
    </div>
  );
};

export default AuthorRegistration;
