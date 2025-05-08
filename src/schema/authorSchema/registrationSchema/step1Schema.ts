// src/utils/formValidationSchema.ts
import * as Yup from "yup";

export const Step1ValidationSchema = Yup.object({
  fullname: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
