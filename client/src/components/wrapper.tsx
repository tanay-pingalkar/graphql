import { Box } from "@chakra-ui/react";
import React from "react";

interface wrapperProps {}

const Wrapper: React.FC<wrapperProps> = ({ children }) => {
  return (
    <Box maxW="250px" margin="auto" marginTop="100px" padding="20px">
      {children}
    </Box>
  );
};

export default Wrapper;
