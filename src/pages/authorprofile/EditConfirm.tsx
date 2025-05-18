import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthApi } from "../../api/auth"; // adjust if needed

type EditConfirmProps = {
  email: string; // autofilled
  onCancel: () => void;
  onConfirm: () => void; // Called only if credentials are valid
};

const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
});

const EditConfirm: React.FC<EditConfirmProps> = ({
  email,
  onCancel,
  onConfirm,
}) => {
  const formik = useFormik({
    initialValues: {
      email,
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await AuthApi.login(values);
        onConfirm(); // Only call this if login is successful
      } catch (error) {
        setErrors({ password: "Invalid credentials. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Confirm Identity
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            readOnly
            className="w-full mt-1 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full mt-1 p-3 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-xl text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
          >
            {formik.isSubmitting ? "Checking..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditConfirm;
