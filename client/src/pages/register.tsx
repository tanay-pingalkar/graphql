import React from "react";
import { Field, Form, Formik } from "formik";
import Wrapper from "../components/wrapper";
import MForm from "../components/form";
import Sbutton from "../components/Sbutton";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { inputError } from "../utils/inputError";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { qrql } from "../utils/urql";
import { responseError } from "../utils/responseError";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const toast = useToast();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values, actions) => {
          values = {
            name: values.name.trimEnd(),
            email: values.email.trimEnd(),
            password: values.password.trimEnd(),
          };
          if (!inputError(values, actions)) {
            console.log(inputError(values, actions));
            return null;
          }
          const registerRes = await register(values);
          actions.setSubmitting(false);
          if (!responseError(registerRes.data.createUser.ErrorMsg, actions)) {
            return null;
          } else if (registerRes.data.createUser.user) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
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
            <MForm name="name"></MForm>
            <MForm name="email"></MForm>
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
