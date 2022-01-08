import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldRenderProps } from "react-final-form";
import BaseField from "../BaseField";
import { IComponent, IFileInput } from "../types";

const FileInput = (payload: IComponent) => ({
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
        <Input
          accept={(payload as IFileInput).acceptableFiles?.join(",")}
          onChange={props.input.onChange}
          value={props.input.value}
          type={"file"}
        />
        {Boolean(props.meta.error) && (
          <FormErrorMessage>{props.meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )
  ),
});

export default FileInput;
