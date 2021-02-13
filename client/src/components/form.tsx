import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";

type formProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const Form: React.FC<formProps> = (props) => {
  const [field, { error }] = useField(props);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={!!error} marginTop="20px">
      <FormLabel htmlFor={field.name}>{field.name}</FormLabel>
      {props.type === "password" ? (
        <>
          <Input
            {...field}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder={field.name}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </>
      ) : (
        <Input {...field} id={field.name} placeholder={field.name} />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
export default Form;
