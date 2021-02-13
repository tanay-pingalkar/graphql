import { FormikHelpers } from "formik/dist/types";

export const inputError = (
  values,
  actions: FormikHelpers<{
    name: string;
    password: string;
  }>
) => {
  let { name, password } = values;
  if (password.trim().length === 0 && name.trim().length === 0) {
    actions.setErrors({
      name: "please fill the form",
      password: `please fill the form`,
    });
    return null;
  } else if (name.trim().length === 0) {
    actions.setErrors({
      name: `please fill the form`,
    });
    return null;
  }
  if (password.trim().length === 0) {
    actions.setErrors({
      password: `please fill the form`,
    });
  } else return "ok";
};
