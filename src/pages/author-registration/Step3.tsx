import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";
import Preferences from "../../components/features/authorPreferences/Preferences";
import AuthorBread from "../../components/features/breadCrumbs/AuthorBread";
import Dropdown from "../../components/features/dropdown/Dropdown";
import { Step3Schema } from "../../schema/authorSchema/registrationSchema/step3Schema";
import { AuthApi } from "../../api/auth";

interface Step3Props {
  onBack: () => void;
  onFinish: () => void;
}

const Step3 = ({ onBack , onFinish}: Step3Props) => {
  const breadValues: string[] = ["Introduction", "Professional Details", "Preferences"];
  const preferenceOptions: string[] = [
    "Technology", "Science", "Travel", "Fitness", "Music",
    "Movies", "Gaming", "Art", "Photography", "Business",
    "Politics", "Fashion", "Food", "Health", "Education",
    "History", "Nature", "Literature", "Finance", "Sports"
  ];
  const experienceLevels: string[] = ["beginner", "intermediate", "experienced"];

  const [initialData] = useState({
    preferences: [] as string[],
    experienceLevel: "",
  });

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema: Step3Schema,
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      try {
        // console.log("hello from try");
        
        const res = await AuthApi.preferences(values);
        await AuthApi.finalize(); 
        console.log("🚀 ~ Step3 Submit Result:", res);
        onFinish();
      } catch (error) {
        console.log("🚀 ~ Step3 Submit Error:", error);
      }
    },
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await AuthApi.getSessionData();
        console.log("🚀 ~ Step3 session:", res);
        if (res.step3Data) {
          formik.setValues({
            preferences: res.step3Data.preferences || [],
            experienceLevel: res.step3Data.experienceLevel || "",
          });
        }
      } catch (err) {
        console.log("🚀 ~ Step3 fetchSession error:", err);
      }
    };
    fetchSession();
  }, []);

  const handlePreferenceChange = (updatedPreferences: string[]) => {
    formik.setFieldValue("preferences", updatedPreferences);
    console.log(updatedPreferences);
    
  };

  // const handleExperienceChange = (level: string) => {
  //   formik.setFieldValue("experienceLevel", level);
  // };

  const handleFinish = () => {
    console.log("👉 Submitting Final Step");
    // console.log("Valid:", formik.isValid);
    formik.handleSubmit();
  };

  return (
    <div className="flex flex-col md:flex-row  min-h-screen ">
      <section className="flex flex-col  w-1/2 md:w-1/2 md:m-3">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl">Join us to Inspire Globally</h1>
          <Button value="Cancel" btnTheme="noBg" chevronPosition="left" className="text-sm" />
        </div>

        <div className="flex flex-col gap-10 items-center w-full md:w-[85%]">
          <AuthorBread crumbsValue={breadValues} currentCrumb={3} />

          <div className="flex flex-col gap-5 w-full max-w-max">
            <Preferences
            maxSelection={5}
              tags={preferenceOptions}
              selected={formik.values.preferences}
              onChange={handlePreferenceChange}
            />
            <div className="text-red-600 min-h-5">{formik.errors.preferences}</div>

            <Dropdown
            items={experienceLevels}
            value={formik.values.experienceLevel}
            onChange={(val) => formik.setFieldValue("experienceLevel", val)}
            />
            <div className="text-red-600 min-h-5">{formik.errors.experienceLevel}</div>
          </div>

          <div className="flex w-full justify-between">
            <Button
              onClick={onBack}
              className="flex justify-center items-center"
              value="Back"
              chevronPosition="left"
              btnTheme="borderBlack"
            />
            <Button
              onClick={handleFinish}
              className="flex justify-center items-center"
              value="Finish"
              chevronPosition="right"
              btnTheme="blackBtn"
            />
          </div>
        </div>
      </section>
       {/* Right: Placeholder/Visual Section */}
    <section className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10 shadow-2xl">
      <div className="flex flex-col gap-5 items-center text-center">
        <img
          className="rounded-3xl shadow-md w-4/5 max-w-md"
          src="images/youownyourcontent.jpg"
          alt="Preferences Visual"
        />
        <p className="text-3xl font-semibold">You own your content — always.</p>
        <p className="text-sm text-gray-600 mt-4">Customize your interests and writing expertise.</p>
      </div>
    </section>
    </div>
  );
};

export default Step3;
