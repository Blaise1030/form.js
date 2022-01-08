import {
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  FormErrorMessage,
  Checkbox,
  Input,
  VStack,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FieldRenderProps } from "react-final-form";
import { IComponent, IFileInput, IRadioButton, ITextInput } from "./types";

export interface IBaseComponentOutput {
  type: string;
  render: (p: {
    props: FieldRenderProps<any>;
    payload: IComponent;
    id: string;
  }) => React.ReactNode;
}

export function B_Header(): IBaseComponentOutput {
  return {
    type: "header",
    render: ({
      payload,
    }: {
      props: FieldRenderProps<any>;
      payload: IComponent;
      id: string;
    }) => {
      return (
        <VStack align={"start"}>
          <Text fontWeight={"medium"}>{payload.label}</Text>
          <Text pb={2.5} color={"gray.500"} fontSize={"sm"}>
            {payload.description}
          </Text>
        </VStack>
      );
    },
  };
}

export function B_CheckboxComponent(): IBaseComponentOutput {
  return {
    type: "checkbox",
    render: ({
      props,
      payload,
      id,
    }: {
      props: FieldRenderProps<any>;
      payload: IComponent;
      id: string;
    }) => {
      const { error, touched } = props.meta;
      const { onChange, value } = props.input;
      const { label, description } = payload;
      const isInvalid = Boolean(error && touched);

      return (
        <FormControl
          isRequired={Boolean(payload?.validation?.required)}
          isInvalid={isInvalid}
        >
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormHelperText pb={2.5}>{description}</FormHelperText>
          <HStack align={"center"}>
            <Checkbox onChange={onChange} value={value} name={id} />
            <FormHelperText>{payload.label}</FormHelperText>
          </HStack>
          {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      );
    },
  };
}

export function B_FileInput(): IBaseComponentOutput {
  return {
    type: "file",
    render: ({
      props,
      payload,
      id,
    }: {
      props: FieldRenderProps<any>;
      payload: IComponent;
      id: string;
    }) => {
      const { error, touched } = props.meta;
      const { onChange, value } = props.input;
      const { label, description } = payload;
      const isInvalid = Boolean(error && touched);
      return (
        <FormControl
          isRequired={Boolean(payload?.validation?.required)}
          isInvalid={isInvalid}
        >
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
          <FormHelperText pb={2.5}>{description}</FormHelperText>
          <Input
            accept={(payload as IFileInput).acceptableFiles?.join(",")}
            onChange={onChange}
            value={value}
            type={"file"}
          />
          {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      );
    },
  };
}

export function B_RadioInput(): IBaseComponentOutput {
  return {
    type: "radio",
    render: ({
      props,
      payload,
      id,
    }: {
      props: FieldRenderProps<any>;
      payload: IComponent;
      id: string;
    }) => {
      const { error, touched } = props.meta;
      const { onChange, value } = props.input;
      const { label, description } = payload;
      const isInvalid = Boolean(error && touched);

      return (
        <FormControl
          isRequired={Boolean(payload?.validation?.required)}
          isInvalid={isInvalid}
        >
          {payload.label && <FormLabel htmlFor={id}>{label}</FormLabel>}
          <FormHelperText pb={2.5}>{description}</FormHelperText>
          <RadioGroup onChange={onChange} value={value}>
            <Stack direction={["column", "row"]}>
              {(payload as IRadioButton).selections.map(({ label, value }) => (
                <Radio value={value} key={label}>
                  {label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      );
    },
  };
}

export function B_TextInput() {
  return {
    type: "text",
    render: ({
      props,
      payload,
      id,
    }: {
      props: FieldRenderProps<any>;
      payload: IComponent;
      id: string;
    }) => {
      const { error, touched } = props.meta;
      const { onChange, value } = props.input;
      const { label, description, isTextArea } = payload as ITextInput;
      const isInvalid = Boolean(error && touched);

      return (
        <FormControl
          isRequired={Boolean(payload?.validation?.required)}
          isInvalid={isInvalid}
        >
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
          <FormHelperText pb={2.5}>{description}</FormHelperText>
          {!isTextArea && (
            <Input
              onChange={onChange}
              placeholder={label}
              value={value}
              name={id}
            />
          )}
          {(payload as ITextInput).isTextArea && (
            <Textarea
              onChange={onChange}
              placeholder={label}
              value={value}
              name={id}
            />
          )}
          {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      );
    },
  };
}

const createComponentMap = (
  validationPlugins: Array<IBaseComponentOutput> = []
): {
  [type: string]: (p: {
    props: FieldRenderProps<any>;
    payload: IComponent;
    id: string;
  }) => React.ReactNode;
} =>
  [
    B_Header(),
    B_CheckboxComponent(),
    B_FileInput(),
    B_RadioInput(),
    B_TextInput(),
    ...validationPlugins,
  ].reduce(
    (prev, curr) => ({
      [curr.type]: curr.render,
      ...prev,
    }),
    {}
  );

export default createComponentMap;