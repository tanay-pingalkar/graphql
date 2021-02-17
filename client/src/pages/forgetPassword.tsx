import { toast, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/next-server/lib/router/router";
import React from "react";
import Wrapper from "../components/wrapper";
import { inputError } from "../utils/inputError";
import MForm from "../components/form";
import { withUrqlClient } from "next-urql";
import { qrql } from "../utils/urql";

interface forgetPasswordProps {}

const forgetPassword: React.FC<forgetPasswordProps> = ({}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          alert(JSON.stringify(values));
        }}
      >
        {(props) => (
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
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(qrql)(forgetPassword);
