import * as Yup from "yup";

export const Step3Schema = Yup.object({
  preferences: Yup.array()
    .min(1, "Select at least one preference")
    .max(5, "You can select up to 5 preferences")
    .required("Preferences are required"),
  experienceLevel: Yup.string().required("Experience level is required"),
});
