import React from "react";
import { Field, Form, Formik } from "formik";
import Wrapper from "../components/wrapper";
import MForm from "../components/form";
import { Button, useToast } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { inputError } from "../utils/inputError";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { qrql } from "../utils/urql";
import { responseError } from "../utils/responseError";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, Login] = useLoginMutation();
  const toast = useToast();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ nameOrEmail: "", password: "" }}
        onSubmit={async (values, actions) => {
          if (!inputError(values, actions)) {
            return null;
          }
          const registerRes = await Login(values);
          actions.setSubmitting(false);
          if (!responseError(registerRes.data.loginUser.ErrorMsg, actions)) {
            return null;
          } else if (registerRes.data.loginUser.user) {
            toast({
              title: "logged in ",
              description: "you had logged in successfully",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <MForm name="nameOrEmail"></MForm>
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
export default withUrqlClient(qrql)(Register);
