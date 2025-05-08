import * as Yup from "yup";

export const Step2Schema = Yup.object({
  bio: Yup.string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters"),
    portfolioURL: Yup.string()
  .nullable()
  .test("is-valid-url-or-domain", "Enter a valid URL or domain", value => {
    if (!value) return true; // allow null
    try {
      new URL(value.includes("://") ? value : `https://${value}`);
      return true;
    } catch {
      return false;
    }
  }),
    termsAgreed: Yup.boolean().oneOf([true], "You must agree to the terms and conditions").required(),
    newsletterUpdates: Yup.boolean().notRequired(),
});
