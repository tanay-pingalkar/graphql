import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import MForm from "../components/form";
import Wrapper from "../components/wrapper";
import { useForgetPasswordMutation } from "../generated/graphql";
import { inputError } from "../utils/inputError";
import { qrql } from "../utils/urql";

interface forgetPasswordProps {}

const forgetPassword: React.FC<forgetPasswordProps> = ({}) => {
  const [, forgetPassword] = useForgetPasswordMutation();
  const [complete, setcomplete] = useState(false);
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          if (!inputError(values, actions)) {
            return null;
          }

          await forgetPassword(values);
          setcomplete(true);
        }}
      >
        {(props) =>
          complete ? (
            <h1>
              if any account with the given email exist, you will get a link on
              the given email, you can use to change password
            </h1>
          ) : (
            <Form>
              <MForm name="email"></MForm>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(qrql)(forgetPassword);
