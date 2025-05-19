import { useFormik } from "formik";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import TextArea from "../../components/common/textArea/TextArea";
import AuthorBread from "../../components/features/breadCrumbs/AuthorBread";
import { Step2Schema } from "../../schema/authorSchema/registrationSchema/step2Schema";
import { useState, useEffect } from "react";
import { AuthApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2 = ({ onNext, onBack }: Step2Props) => {
  const navigate = useNavigate();
  const breadValues: string[] = [
    "Introduction",
    "Professional Details",
    "Preferences",
  ];
  const [initialData] = useState({
    bio: "",
    portfolioURL: "",
    termsAgreed: false,
    newsletterUpdates: false,
  });
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema: Step2Schema,
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      try {
        const res = await AuthApi.bio({
          bio: values.bio,
          portfolioURL: values.portfolioURL,
          termsAgreed: values.termsAgreed,
          newsletterUpdates: values.newsletterUpdates,
        });
        console.log("🚀 ~ onSubmit: ~ res:", res);
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        onNext();
      } catch (error) {
        console.log("🚀 ~ step-2 onSubmit: ~ error:", error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthApi.getSessionData();
        console.log("🚀 ~ fetchData ~ res:", res);
        if (res.step2Data) {
          formik.setValues({
            bio: res.step2Data.bio || "",
            portfolioURL: res.step2Data.portfolioURL || "",
            termsAgreed: res.step2Data.termsAgreed || false,
            newsletterUpdates: res.step2Data.newsletterUpdates || false,
          });
        }
      } catch (err) {
        console.log("🚀 ~ fetchData ~ err:", err);
      }
    };
    fetchData();
  }, []);
  const handleNext = () => {
    console.log("👉 Clicked Next");
    console.log("Form is valid?", formik.isValid);
    formik.handleSubmit();
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start min-h-screen ">
      <section className="flex flex-col gap-6 w-1/2 md:w-[45%] md:m-3">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl">Join us to Inspire Globally</h1>
          <Button
            onClick={() => navigate("/")}
            value="Cancel"
            btnTheme="noBg"
            chevronPosition="left"
            className="text-sm"
          />
        </div>

        <div className="flex flex-col gap-6 items-center w-full md:w-[85%]">
          <AuthorBread  crumbsValue={breadValues} currentCrumb={2} />

          <div className="flex flex-col gap-1 w-full max-w-max">
            <TextArea
              placeholder="Short Description about yourself"
              names="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-red-600 min-h-7 ">
              {formik.touched.bio && formik.errors.bio}
            </div>

            <Input
              placeholder="Website/Portfolio URL (optional)"
              name="portfolioURL"
              value={formik.values.portfolioURL}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-red-600 min-h-7">
              {formik.touched.portfolioURL && formik.errors.portfolioURL}
            </div>
          </div>

          {/* Checkbox Section */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                className="w-5"
                type="checkbox"
                name="termsAgreed"
                checked={formik.values.termsAgreed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <div>
                By signing up, you agree to our
                <span 
                onClick={() => navigate("/terms")}
                className="text-blue-600"> Terms and Conditions </span>
                and <span 
                onClick= {() => navigate("/privacy")}
                className="text-blue-600">Privacy Policy</span>
              </div>
            </div>
            <p className="text-red-500 text-sm min-h-5 ml-7">
              {formik.errors.termsAgreed}
            </p>
            <div className="flex gap-3">
              <input
                className="w-4"
                type="checkbox"
                name="newsletterUpdates"
                checked={formik.values.newsletterUpdates}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p>Get updates on Newsletter</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex w-full justify-between">
            <Button
              onClick={onBack}
              className="flex justify-center items-center"
              value="Back"
              chevronPosition="left"
              btnTheme="borderBlack"
            />
            <Button
              onClick={handleNext}
              className="flex justify-center items-center"
              value="Next"
              chevronPosition="right"
              btnTheme="blackBtn"
            />
          </div>
        </div>
      </section>

      <section className="hidden md:flex w-1/2 min-h-full h-screen bg-[#ffff] dark:bg-gradient-to-r dark:from-[#222] dark:via-[#111] dark:to-[#222] flex-col items-center mt-0 shadow-2xl">
        <div className="mt-10 flex flex-col gap-5 items-center">
          <img
            className="rounded-4xl shadow-md w-100"
            src="images/upload_instantly.svg"
            alt=""
          />

          <p className="text-4xl ">Publish your stories instantly.</p>
        </div>

        <div className="mt-2 flex flex-col gap-5 items-center">
          <p className="italic">With our 3 step pulish format</p>
        </div>
      </section>
    </div>
  );
};

export default Step2;
