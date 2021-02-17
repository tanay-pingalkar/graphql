import React from "react";
import { NextPage } from "next";
import { toast, Button, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/next-server/lib/router/router";
import Wrapper from "../../components/wrapper";
import { inputError } from "../../utils/inputError";
import MForm from "../../components/form";
import { useChangePasswordMutation } from "../../generated/graphql";
import { formatWithOptions } from "util";
import { withUrqlClient } from "next-urql";
import { qrql } from "../../utils/urql";
import { useRouter } from "next/router";
import Link from "next/link";

const changePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, change] = useChangePasswordMutation();
  const router = useRouter();
  const toast = useToast();
  return (
    <Wrapper>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={async (values, actions) => {
          inputError(values, actions);
          const res = await change({
            token: token,
            newPassword: values.password,
          });
          if (res.data.changePassword.ErrorMsg === null) {
            toast({
              title: "password changed",
              description: "you had logged successfully changed the password",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/");
          } else {
            toast({
              title: "oops",
              description: "the token or password may have problem",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
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
      <Link href="/forgetPassword">forget password</Link>
    </Wrapper>
  );
};

changePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};
export default withUrqlClient(qrql)(changePassword);
