import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface navProps {}

const Nav: React.FC<navProps> = ({}) => {
  let [body, setbody] = useState(<h1>fetching</h1>);
  let [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  console.log(data);
  const [, logout] = useLogoutMutation();
  useEffect(() => {
    if (fetching) {
    } else if (!data?.me) {
      setbody(
        <>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      );
    } else {
      setbody(
        <>
          <Text>{data.me.userName}</Text>
          <Button
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Button>
        </>
      );
    }
  }, [data]);

  return (
    <Box
      bgColor="teal"
      padding="5px"
      display="flex"
      color="white"
      justifyContent="space-around"
      fontSize="2xl"
    >
      <Text>Reddit</Text>
      {body}
    </Box>
  );
};

export default Nav;
