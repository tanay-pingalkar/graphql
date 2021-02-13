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
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const toast = useToast();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={async (values, actions) => {
          if (inputError(values, actions) != "ok") {
            return null;
          }
          const registerRes = await register(values);
          actions.setSubmitting(false);
          if (registerRes.data.createUser.msg === "error") {
            actions.setErrors({
              name: `${values.name} username is already taken`,
            });
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
