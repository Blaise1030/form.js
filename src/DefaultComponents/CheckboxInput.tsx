import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { FieldRenderProps } from "react-final-form";
import BaseField from "../BaseField";
import { IBaseComponent, IComponent } from "../types";

const CheckBoxInput = (payload: IComponent): IBaseComponent => ({
  ...BaseField(
    payload,
    (
      props: FieldRenderProps<any, HTMLElement, any>,
      payload: IComponent,
      name: string
    ) => (
      <FormControl isInvalid={Boolean(props.meta.error)} isRequired>
        <FormLabel htmlFor={name}>{payload.label}</FormLabel>
        <FormHelperText pb={2.5}>{payload.description}</FormHelperText>
        <HStack align={"center"}>
          <Checkbox
            onChange={props.input.onChange}
            value={props.input.value}
            name={name}
          />
          <FormHelperText>{payload.label}</FormHelperText>
        </HStack>
        {Boolean(props.meta.error) && (
          <FormErrorMessage>{props.meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )
  ),
});

export default CheckBoxInput;
