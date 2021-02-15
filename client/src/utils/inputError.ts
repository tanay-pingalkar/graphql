import { FormikHelpers } from "formik/dist/types";

export const inputError = (
  values: Object,
  actions: FormikHelpers<any>
): boolean => {
  let errors: object = {};
  for (let key of Object.keys(values)) {
    if (values[key].trim().length === 0) {
      errors[key] = "please fill the form";
    }
  }
  actions.setErrors(errors);
  if (JSON.stringify(errors) === "{}") {
    return true;
  } else {
    return false;
  }
};
