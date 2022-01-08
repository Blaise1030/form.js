import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FieldRenderProps } from "react-final-form";
import BaseField from "../BaseField";
import { IComponent, IRadioButton, ITextInput } from "../types";

const RadioInput = (payload: IComponent) => {
  const _component = (
    props: FieldRenderProps<any, HTMLElement, any>,
    payload: IComponent,
    name: string
  ) => (
    <FormControl isInvalid={Boolean(props.meta.error)} isRequired>
      {payload.label && <FormLabel htmlFor={name}>{payload.label}</FormLabel>}
      <FormHelperText pb={2.5}>{payload.description}</FormHelperText>
      <RadioGroup onChange={props.input.onChange} value={props.input.value}>
        <Stack direction={["column", "row"]}>
          {(payload as IRadioButton).selections.map(({ label, value }) => (
            <Radio value={value} key={label}>
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {Boolean(props.meta.error) && (
        <FormErrorMessage>{props.meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );

  return {
    ...BaseField(payload, _component),
  };
};

export default RadioInput;
