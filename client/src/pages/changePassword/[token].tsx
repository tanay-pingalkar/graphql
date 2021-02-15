import React from "react";
import { NextPage } from "next";
import { toast, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/next-server/lib/router/router";
import Wrapper from "../../components/wrapper";
import { inputError } from "../../utils/inputError";
import MForm from "../../components/form";

const changePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={async (values, actions) => {
          inputError(values, actions);
        }}
      >
        {(props) => (
          <Form>
            <MForm name="password" type="password"></MForm>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

changePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};
export default changePassword;
