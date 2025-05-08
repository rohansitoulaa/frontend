import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"; // Assuming you’re using Formik
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginSchema } from "../../schema/login/loginSchema";
import { AuthApi } from "../../api/auth";
import { useAuthStore } from "../../stores/authStore";




const handleToken = async (token:string) => {
  try {
    localStorage.setItem("auth token", token);
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().fetchUser();
  } catch (error) {
    console.log("🚀 ~ handleToken ~ error:", error)
  }
}

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AuthApi.login(values);
        console.log("✅ Login successful:", response);
        handleToken(response.token)
        navigate("/"); // or wherever you want to redirect
      } catch (error) {
        console.log(values);
        
        console.error("❌ Login failed:", error);
        // Optional: show error to user
      } finally {
        setSubmitting(false);
      }
    }
  });
  const handleLogin = () => {
    formik.handleSubmit(); // Will trigger the onSubmit, which sends data to backend
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center md:items-start">
      {/* Login Form Section */}
      <section className="flex w-full md:w-1/2 justify-center items-center p-6 md:p-12 h-screen">
        <div className="flex flex-col gap-6 w-full max-w-md">
          {/* Cancel Button */}
          <Button
            value="Cancel"
            onClick={() => navigate("/")}
            btnTheme="noBg"
            chevronPosition="left"
            className="text-black self-start"
          />

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl text-left">
            Welcome Back
          </h1>

          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 w-full"
          >
            {/* Email Field */}
            <div>
              <Input
                placeholder="Enter your email"
                name="email"
                icon={<FaEnvelope />}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="min-h-6 text-red-600 mt-1 text-sm">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <Input
                placeholder="Enter your password"
                type="password"
                name="password"
                icon={<FaLock />}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="min-h-10 text-red-600 mt-1 text-sm">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-4"
              value="Login"
              btnTheme="blackBtn"
              chevronPosition="right"
              onClick={handleLogin}
            />
          </form>
        </div>
      </section>


      {/* Image Section */}
      <section className="hidden md:flex w-1/2  bg-white items-center justify-center shadow-2xl h-screen">
        <div className="flex flex-col items-center gap-4 p-6">
          <img
            className="rounded-2xl shadow-md w-130"
            src="images/login.svg"
            alt="Reach out"
          />
          {/* New User Prompt */}
        <div className="text-center mt-6">
          <p>
            New user?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/authorRegistration")}
            >
              Sign up
            </span>
          </p>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
