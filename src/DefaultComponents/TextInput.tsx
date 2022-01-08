import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FieldRenderProps } from "react-final-form";
import BaseField from "../BaseField";
import { IComponent, ITextInput } from "../types";

const TextInput = (payload: IComponent) => ({
  ...BaseField(
    payload,
    (
      props: FieldRenderProps<any, HTMLElement, any>,
      payload: IComponent,
      name: string
    ) => (
      <FormControl isInvalid={Boolean(props.meta.error)} isRequired>
        {payload.label && <FormLabel htmlFor={name}>{payload.label}</FormLabel>}
        <FormHelperText pb={2.5}>{payload.description}</FormHelperText>
        {!(payload as ITextInput).isTextArea && (
          <Input
            onChange={props.input.onChange}
            placeholder={payload.label}
            value={props.input.value}
            name={name}
          />
        )}
        {(payload as ITextInput).isTextArea && (
          <Textarea
            onChange={props.input.onChange}
            placeholder={payload.label}
            value={props.input.value}
            name={name}
          />
        )}

        {Boolean(props.meta.error) && (
          <FormErrorMessage>{props.meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )
  ),
});

export default TextInput;
