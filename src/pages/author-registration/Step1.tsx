import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import AuthorBread from "../../components/features/breadCrumbs/AuthorBread";
import { Step1ValidationSchema } from "../../schema/authorSchema/registrationSchema/step1Schema";
import { AuthApi } from "../../api/auth";

interface Step1Props {
  onNext: () => void;
}

const Step1 = ({ onNext }: Step1Props) => {
  const breadValues: string[] = [
    "Introduction",
    "Professional Details",
    "Preferences",
  ];

  const [initialData, setInitialData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema: Step1ValidationSchema,
    onSubmit: async (values) => {
      // console.log("Form Submitted: ", values);
      // console.log(values.password);
      try {
        // console.log("Sending data to server:");
        const res = await AuthApi.signup({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        });
        // console.log("🚀 ~ onSubmit: ~ res:", res)

        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        onNext();
      } catch (err) {
        const msg = err?.response?.data?.message || "Something went wrong.";
        setServerError(msg);
        console.log("🚀 ~ onSubmit: ~ err:", err);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthApi.getSessionData();
        console.log("🚀 ~ fetchData ~ res:", res);
        if (res.step1Data) {
          formik.setValues({
            fullname: res.step1Data.fullname || "",
            email: res.step1Data.email || "",
            password: res.step1Data.password || "", // don’t pre-fill password for security
          });
        }
      } catch (err) {
        console.log("🚀 ~ fetchData ~ err:", err);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    formik.handleSubmit(); // Will trigger the onSubmit, which sends data to backend
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start  ">
      {/* Form Section */}
      <section className="flex flex-col gap-6 w-1/2 md:w-[45%] md:m-3">
        {/* Heading & Back Button */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl">Join us to Inspire Globally</h1>
          <Button
            onClick={() => navigate("/")}
            value="Cancel"
            btnTheme="noBg"
            chevronPosition="left"
            className="text-sm "
          />
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-5 items-center w-full md:w-[85%]">
          <AuthorBread crumbsValue={breadValues} currentCrumb={1} />
          {serverError && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded w-full">
              <span className="text-xl font-bold">!</span>
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          {/* Input Fields */}
          <div className="flex flex-col w-full max-w-max">
            <div>
              <Input
                placeholder="Enter your fullname"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="min-h-10 text-red-600 mt-2">
                {formik.touched.fullname && formik.errors.fullname}
              </div>
            </div>
            <div>
              <Input
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="min-h-10 text-red-600 mt-2">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <Input
                placeholder="Enter your password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="min-h-10 text-red-600 mt-2">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>
          </div>

          {/* Next Button Aligned Right */}
          <div className="flex w-full justify-end">
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

      <section className="w-1/2 min-h-[100vh] bg-white dark:bg-gradient-to-r dark:from-[#222] dark:via-[#111] dark:to-[#222] md:w-full flex flex-col items-center md:mt-0">
        {/* Image and Hero Text – hidden on small screens */}
        <div className="hidden md:flex flex-col gap-5 items-center mt-10">
          <img
            className="rounded-4xl shadow-md w-100"
            src="images/reachout.jpg"
            alt=""
          />
          <p className="text-4xl text-center px-4">
            Reach thousands of readers every day.
          </p>
        </div>

        {/* Always visible login section */}
        <div className="mt-10 flex flex-col gap-5 items-center">
          <p>Already have an account?</p>
          <Button
            className="dark:border-white"
            onClick={() => navigate("/login")}
            value="Login"
            btnTheme="borderBlack"
          />
        </div>
      </section>
    </div>
  );
};

export default Step1;
