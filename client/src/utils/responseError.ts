import { FormikHelpers } from "formik/dist/types";

export const responseError = (
  ErrorMsg,
  actions: FormikHelpers<any>
): Boolean => {
  if (ErrorMsg === null) {
    return true;
  } else {
    actions.setErrors({
      [ErrorMsg.field]: ErrorMsg.msg,
    });
    return false;
  }
};
